import { MapPin, Edit2, Star } from 'lucide-react';

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
}

export const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  return (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
            <MapPin size={18} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">{address.type}</h3>
            {address.isDefault && (
              <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                <Star size={12} />
                <span>Default Address</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all"
        >
          <Edit2 size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-1 text-gray-600 dark:text-gray-400">
        <p>{address.street}</p>
        <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
      </div>
    </div>
  );
};