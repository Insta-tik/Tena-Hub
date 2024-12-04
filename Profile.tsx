import { useState } from 'react';
import { User, MapPin, Phone, Mail, Plus, Edit2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AddressCard } from '../../components/customer/AddressCard';
import { EditProfileModal } from '../../components/customer/EditProfileModal';
import { AddressModal } from '../../components/customer/AddressModal';

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface ExtendedUserProfile {
  phone?: string;
  addresses: Address[];
}

export const Profile = () => {
  const { user } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Mock user profile data (in a real app, this would come from an API)
  const [userProfile] = useState<ExtendedUserProfile>({
    phone: '+1 234-567-8900',
    addresses: [
      {
        id: '1',
        type: 'Home',
        street: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        isDefault: true,
      },
      {
        id: '2',
        type: 'Work',
        street: '456 Office Plaza',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62702',
        isDefault: false,
      },
    ],
  });

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and addresses</p>
        </div>
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400"
        >
          <Edit2 size={18} />
          Edit Profile
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.role}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={18} />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={18} />
                <span>{userProfile.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Saved Addresses</h2>
          <button
            onClick={handleAddAddress}
            className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400"
          >
            <Plus size={18} />
            Add Address
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProfile.addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEditAddress(address)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        initialData={{
          name: user?.name || '',
          email: user?.email || '',
          phone: userProfile.phone || '',
        }}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        address={editingAddress}
      />
    </div>
  );
};