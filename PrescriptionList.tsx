import { FileText, Clock, CheckCircle, XCircle, Eye, Image as ImageIcon } from 'lucide-react';
import { Prescription } from '../../types/prescription';
import { useState } from 'react';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  onView: (prescription: Prescription) => void;
}

export const PrescriptionList = ({ prescriptions, onView }: PrescriptionListProps) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const getStatusColor = (status: Prescription['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusIcon = (status: Prescription['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600 dark:text-red-400" />;
      default:
        return <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />;
    }
  };

  const handleImageError = (prescriptionId: string) => {
    setImgErrors(prev => ({ ...prev, [prescriptionId]: true }));
  };

  return (
    <div className="space-y-4">
      {prescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="bg-neu-base dark:bg-dark-neu-base rounded-xl p-4 shadow-neu-flat dark:shadow-dark-neu-flat"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
                {prescription.imageUrl && !imgErrors[prescription.id] ? (
                  <img
                    src={prescription.imageUrl}
                    alt="Prescription thumbnail"
                    className="w-8 h-8 object-cover rounded"
                    onError={() => handleImageError(prescription.id)}
                  />
                ) : (
                  <FileText className="text-indigo-600 dark:text-indigo-400" size={20} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {prescription.doctorName}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {prescription.patientName}
                </p>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <span>Issued: {prescription.issueDate}</span>
                  <span>Expires: {prescription.expiryDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusIcon(prescription.status)}
              <button
                onClick={() => onView(prescription)}
                className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all"
              >
                <Eye size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {prescription.notes && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
              {prescription.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};