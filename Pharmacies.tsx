import { MapPin, Star, Clock, Phone } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  status: 'open' | 'closed';
  hours: string;
  phone: string;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'MediCare Pharmacy',
    address: '123 Health Street, Medical District',
    distance: '0.5 km',
    rating: 4.8,
    status: 'open',
    hours: '8:00 AM - 10:00 PM',
    phone: '+1 234-567-8900'
  },
  {
    id: '2',
    name: 'HealthPlus Pharmacy',
    address: '456 Care Avenue, Wellness Center',
    distance: '1.2 km',
    rating: 4.5,
    status: 'open',
    hours: '24 Hours',
    phone: '+1 234-567-8901'
  },
  {
    id: '3',
    name: 'City Pharmacy',
    address: '789 Main Street, Downtown',
    distance: '2.0 km',
    rating: 4.6,
    status: 'closed',
    hours: '9:00 AM - 9:00 PM',
    phone: '+1 234-567-8902'
  }
];

export const Pharmacies = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Nearby Pharmacies</h1>
          <p className="text-gray-600 dark:text-gray-400">Find pharmacies near your location</p>
        </div>

        <div className="flex gap-3">
          <select className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200">
            <option>Sort by Distance</option>
            <option>Sort by Rating</option>
            <option>Sort by Name</option>
          </select>
          <select className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200">
            <option>All Pharmacies</option>
            <option>Open Now</option>
            <option>24/7 Pharmacies</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{pharmacy.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                pharmacy.status === 'open'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {pharmacy.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>{pharmacy.address}</span>
                <span className="ml-auto text-indigo-600 dark:text-indigo-400">{pharmacy.distance}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Star size={16} className="text-yellow-500" />
                <span>{pharmacy.rating}/5.0</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} />
                <span>{pharmacy.hours}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>{pharmacy.phone}</span>
              </div>
            </div>

            <button className="mt-4 w-full px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-indigo-600 dark:text-indigo-400">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};