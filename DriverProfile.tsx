import { useState } from 'react';
import { User, MapPin, Phone, Mail, Star, Clock, Truck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDriverStatus } from '../../hooks/useDriverStatus';

export const DriverProfile = () => {
  const { user } = useAuth();
  const { isAvailable } = useDriverStatus();
  const [driverInfo] = useState({
    rating: 4.8,
    totalDeliveries: 156,
    joinDate: '2024-01-15',
    phone: '+1 234-567-8900',
    vehicle: {
      type: 'motor',
      plateNumber: 'ABC 123',
    },
    verificationStatus: 'verified',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Driver Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your profile information</p>
      </div>

      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user?.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">Driver</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAvailable 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {isAvailable ? 'Available' : 'Offline'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={18} />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={18} />
                <span>{driverInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Star size={18} className="text-yellow-500" />
                <span>{driverInfo.rating} Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock size={18} />
                <span>Joined {driverInfo.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Vehicle Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Truck size={18} />
              <span>Vehicle Type: {driverInfo.vehicle.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin size={18} />
              <span>Plate Number: {driverInfo.vehicle.plateNumber}</span>
            </div>
          </div>
        </div>

        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Performance Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Deliveries</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{driverInfo.totalDeliveries}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Verification Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {driverInfo.verificationStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};