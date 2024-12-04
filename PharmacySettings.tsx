import { useState } from 'react';
import { Bell, Clock, Shield, Store } from 'lucide-react';

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  is24Hours: boolean;
  isClosed: boolean;
}

export const PharmacySettings = () => {
  const [notifications] = useState({
    newOrders: true,
    prescriptionAlerts: true,
    stockAlerts: false,
    marketingEmails: true
  });

  const [businessHours] = useState<BusinessHours[]>([
    { day: 'Monday', open: '09:00', close: '18:00', is24Hours: false, isClosed: false },
    { day: 'Tuesday', open: '09:00', close: '18:00', is24Hours: false, isClosed: false },
    { day: 'Wednesday', open: '09:00', close: '18:00', is24Hours: false, isClosed: false },
    { day: 'Thursday', open: '09:00', close: '18:00', is24Hours: false, isClosed: false },
    { day: 'Friday', open: '09:00', close: '18:00', is24Hours: false, isClosed: false },
    { day: 'Saturday', open: '10:00', close: '16:00', is24Hours: false, isClosed: false },
    { day: 'Sunday', open: '10:00', close: '14:00', is24Hours: false, isClosed: true },
  ]);

  const [delivery] = useState({
    radius: 5,
    minimumOrder: 20,
    freeDeliveryThreshold: 50
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your pharmacy settings</p>
      </div>

      {/* Notifications */}
      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
            <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notifications</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Business Hours</h2>
        </div>

        <div className="space-y-4">
          {businessHours.map((hours) => (
            <div key={hours.day} className="flex items-center justify-between py-2">
              <p className="font-medium text-gray-800 dark:text-gray-200 w-28">{hours.day}</p>
              {hours.isClosed ? (
                <span className="text-red-600 dark:text-red-400">Closed</span>
              ) : hours.is24Hours ? (
                <span className="text-green-600 dark:text-green-400">Open 24 Hours</span>
              ) : (
                <span className="text-gray-600 dark:text-gray-400">
                  {hours.open} - {hours.close}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
            <Store className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Delivery Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-600 dark:text-gray-400">Delivery Radius</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{delivery.radius} km</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-600 dark:text-gray-400">Minimum Order</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">${delivery.minimumOrder}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-600 dark:text-gray-400">Free Delivery Threshold</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">${delivery.freeDeliveryThreshold}</p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Security</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-gray-800 dark:text-gray-200">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-gray-800 dark:text-gray-200">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-gray-800 dark:text-gray-200">
            Login History
          </button>
        </div>
      </div>
    </div>
  );
};