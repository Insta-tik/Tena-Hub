import { useState } from 'react';
import { Bell, Moon, Layout, User, Languages, Globe, ChevronRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface AppPreference {
  id: string;
  label: string;
  description: string;
  value: string;
  options: string[];
}

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'order_updates',
      label: 'Order Updates',
      description: 'Get notified about your order status changes',
      enabled: true,
    },
    {
      id: 'promotions',
      label: 'Promotions & Offers',
      description: 'Receive notifications about deals and special offers',
      enabled: false,
    },
    {
      id: 'prescription_reminders',
      label: 'Prescription Reminders',
      description: 'Get reminded when it\'s time to refill your prescriptions',
      enabled: true,
    },
    {
      id: 'pharmacy_updates',
      label: 'Pharmacy Updates',
      description: 'Stay informed about your preferred pharmacies',
      enabled: true,
    },
  ]);

  const [preferences] = useState<AppPreference[]>([
    {
      id: 'language',
      label: 'Language',
      description: 'Choose your preferred language',
      value: 'English',
      options: ['English', 'Spanish', 'French', 'Arabic'],
    },
    {
      id: 'region',
      label: 'Region',
      description: 'Set your location for better recommendations',
      value: 'United States',
      options: ['United States', 'Canada', 'United Kingdom', 'Australia'],
    },
  ]);

  const handleNotificationToggle = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const SettingsSection = ({ title, icon: Icon, children }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
          <Icon className="text-indigo-600 dark:text-indigo-400" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your app preferences and notifications</p>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <SettingsSection title="Appearance" icon={Layout}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark mode appearance</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={Bell}>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{notification.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="Preferences" icon={User}>
          <div className="space-y-4">
            {preferences.map(preference => (
              <div
                key={preference.id}
                className="flex items-center justify-between p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed"
              >
                <div className="flex items-center gap-3">
                  {preference.id === 'language' ? (
                    <Languages size={20} className="text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Globe size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{preference.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{preference.description}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{preference.value}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};