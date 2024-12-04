import { useState } from 'react';
import { PrescriptionUpload } from '../../components/prescription/PrescriptionUpload';
import { PrescriptionList } from '../../components/prescription/PrescriptionList';
import { Prescription } from '../../types/prescription';
import { Plus, Image, X } from 'lucide-react';
import toast from 'react-hot-toast';

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Smith',
    issueDate: '2024-02-15',
    expiryDate: '2024-05-15',
    status: 'verified',
    imageUrl: 'https://example.com/prescription1.jpg',
    verifiedAt: '2024-02-16',
    verifiedBy: 'Pharmacist Jane',
  },
  {
    id: '2',
    patientName: 'John Doe',
    doctorName: 'Dr. Michael Brown',
    issueDate: '2024-02-10',
    expiryDate: '2024-05-10',
    status: 'pending',
    imageUrl: 'https://example.com/prescription2.jpg',
  },
];

export const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const handleUpload = async (file: File) => {
    // In a real app, this would upload to a server
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      patientName: 'John Doe', // Would come from user profile
      doctorName: 'Pending Verification',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      imageUrl: URL.createObjectURL(file),
    };

    setPrescriptions(prev => [newPrescription, ...prev]);
    setShowUpload(false);
    toast.success('Prescription uploaded successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">My Prescriptions</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your prescriptions</p>
        </div>
        
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400"
        >
          <Plus size={20} />
          <span>Upload New</span>
        </button>
      </div>

      {showUpload ? (
        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Upload Prescription</h2>
            <button
              onClick={() => setShowUpload(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <PrescriptionUpload onUpload={handleUpload} />
        </div>
      ) : (
        <PrescriptionList
          prescriptions={prescriptions}
          onView={setSelectedPrescription}
        />
      )}

      {/* Prescription Viewer Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                View Prescription
              </h2>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
              {selectedPrescription.imageUrl ? (
                <img
                  src={selectedPrescription.imageUrl}
                  alt="Prescription"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <Image size={48} className="text-gray-400" />
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Patient:</strong> {selectedPrescription.patientName}</p>
              <p><strong>Doctor:</strong> {selectedPrescription.doctorName}</p>
              <p><strong>Issue Date:</strong> {selectedPrescription.issueDate}</p>
              <p><strong>Expiry Date:</strong> {selectedPrescription.expiryDate}</p>
              <p><strong>Status:</strong> {selectedPrescription.status}</p>
              {selectedPrescription.notes && (
                <p><strong>Notes:</strong> {selectedPrescription.notes}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};