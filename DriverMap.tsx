import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Coordinates {
  lat: number;
  lng: number;
}

export const DriverMap = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    // In a real app, this would use the Geolocation API
    // For demo purposes, we'll use a mock location
    setCurrentLocation({
      lat: 40.7128,
      lng: -74.0060
    });

    // Mock location updates
    const interval = setInterval(() => {
      setCurrentLocation(prev => {
        if (!prev) return prev;
        return {
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Live Map</h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Navigation size={16} className="text-indigo-600 dark:text-indigo-400" />
            {currentLocation ? (
              `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
            ) : (
              'Locating...'
            )}
          </span>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        {/* This is a placeholder for the actual map implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Map integration would go here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Using Google Maps or similar service
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed">
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Zone</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">Downtown Area</p>
        </div>
        <div className="p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed">
          <p className="text-sm text-gray-600 dark:text-gray-400">Next Delivery</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">2.5 km away</p>
        </div>
      </div>
    </div>
  );
};