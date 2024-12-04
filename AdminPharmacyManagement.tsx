import { useState } from 'react';
import { Search, MapPin, Phone, Mail } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  orders: number;
  rating: number;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: 'PHARM-001',
    name: 'MediCare Pharmacy',
    address: '123 Health Street, Medical District',
    phone: '+1 234-567-8900',
    email: 'contact@medicare.com',
    status: 'active',
    orders: 1234,
    rating: 4.5,
  },
  {
    id: 'PHARM-002',
    name: 'HealthPlus Pharmacy',
    address: '456 Care Avenue, Wellness Center',
    phone: '+1 234-567-8901',
    email: 'info@healthplus.com',
    status: 'pending',
    orders: 890,
    rating: 4.2,
  },
  // Add more mock pharmacies as needed
];

export const AdminPharmacyManagement = () => {
  const [pharmacies] = useState<Pharmacy[]>(mockPharmacies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Pharmacy Management</h2>
        <button className="px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400">
          Add New Pharmacy
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search pharmacies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ID: {pharmacy.id}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${pharmacy.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                pharmacy.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                {pharmacy.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>{pharmacy.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>{pharmacy.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>{pharmacy.email}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Orders: </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{pharmacy.orders}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rating: </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{pharmacy.rating}/5</span>
              </div>
              <button className="px-4 py-2 text-sm bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};