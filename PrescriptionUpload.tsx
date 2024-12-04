import { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle, Image } from 'lucide-react';
import toast from 'react-hot-toast';

interface PrescriptionUploadProps {
  onUpload: (file: File) => Promise<void>;
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export const PrescriptionUpload = ({
  onUpload,
  maxSize = 5, // 5MB default
  allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
}: PrescriptionUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a PDF or image file.');
      return false;
    }
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxSize}MB.`);
      return false;
    }
    return true;
  };

  const createPreview = (file: File) => {
    setPreviewError(false);
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (typeof e.target?.result === 'string') {
            setPreview(e.target.result);
          } else {
            throw new Error('Invalid preview data');
          }
        } catch (error) {
          console.error('Preview creation error:', error);
          setPreviewError(true);
          toast.error('Failed to create preview');
        }
      };
      reader.onerror = () => {
        setPreviewError(true);
        toast.error('Failed to read file');
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      // For PDFs, we'll show an icon instead of a preview
      setPreview('pdf');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    createPreview(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        setUploading(true);
        await onUpload(selectedFile);
        setSelectedFile(null);
        setPreview(null);
        toast.success('Prescription uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload prescription');
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setPreviewError(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const renderPreview = () => {
    if (previewError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
      );
    }

    if (preview === 'pdf') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <File className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">PDF Document</span>
        </div>
      );
    }

    if (preview) {
      return (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-contain rounded-lg"
          onError={() => {
            setPreviewError(true);
            toast.error('Failed to load preview');
          }}
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Image className="w-8 h-8 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={allowedTypes.join(',')}
            onChange={handleChange}
            id="prescription-upload"
          />
          
          <div className="flex flex-col items-center cursor-pointer p-6">
            <Upload
              size={32}
              className={`mb-4 ${
                dragActive ? 'text-indigo-500' : 'text-gray-400'
              }`}
            />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Drop your prescription here, or click to select
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Supported formats: PDF, JPEG, PNG (up to {maxSize}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {renderPreview()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={uploading || previewError}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400 ${
              (uploading || previewError) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Prescription'}
          </button>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-yellow-600 dark:text-yellow-400">
        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
        <p>
          Make sure your prescription is clearly visible and includes all necessary details.
          Our pharmacists will verify your prescription before processing your order.
        </p>
      </div>
    </div>
  );
};