import { useState } from 'react';
import { Search, FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Prescription } from '../../types/prescription';

interface PrescriptionVerificationProps {
  prescriptions: Prescription[];
  onVerify: (id: string, approved: boolean, notes?: string) => Promise<void>;
  onView: (prescription: Prescription) => void;
}

export const PrescriptionVerification = ({
  prescriptions,
  onVerify,
  onView
}: PrescriptionVerificationProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationNote, setVerificationNote] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerification = async (prescriptionId: string, approved: boolean) => {
    setProcessing(prescriptionId);
    try {
      await onVerify(prescriptionId, approved, verificationNote);
      setVerificationNote('');
    } catch (error) {
      console.error('Verification failed:', error);
    }
    setProcessing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
                  <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {prescription.patientName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. {prescription.doctorName}
                  </p>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                    <span>Issued: {prescription.issueDate}</span>
                    <span>Expires: {prescription.expiryDate}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onView(prescription)}
                className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all"
              >
                <Eye size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {prescription.status === 'pending' && (
              <div className="mt-4 space-y-4">
                <textarea
                  placeholder="Add verification notes..."
                  value={verificationNote}
                  onChange={(e) => setVerificationNote(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200 resize-none"
                  rows={2}
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVerification(prescription.id, true)}
                    disabled={!!processing}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-green-600 dark:text-green-400"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleVerification(prescription.id, false)}
                    disabled={!!processing}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-red-600 dark:text-red-400"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              </div>
            )}

            {prescription.verifiedAt && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p>
                  Verified by {prescription.verifiedBy} on {prescription.verifiedAt}
                </p>
                {prescription.notes && (
                  <p className="mt-2">{prescription.notes}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};