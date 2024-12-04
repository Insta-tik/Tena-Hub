import { useAuth } from '../../hooks/useAuth';
import {
  Package,
  Store,
  Clock,
  TrendingUp,
  Bell,
  Star,
  MapPin,
  ExternalLink,
  ChevronRight,
  CircleDollarSign,
  FileText,
  ChartBar
} from 'lucide-react';

const QuickStats = () => {
  const stats = [
    { icon: Package, label: 'Active Orders', value: '3', trend: '+2 this week' },
    { icon: CircleDollarSign, label: 'Total Spent', value: '$245.50', trend: 'Last 30 days' },
    { icon: Store, label: 'Saved Pharmacies', value: '5', trend: 'In your area' },
    { icon: FileText, label: 'Prescriptions', value: '2', trend: 'Active now' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
              <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{stat.trend}</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

const ActivityFeed = () => {
  const activities = [
    { icon: Package, text: 'Your order #ORD-001 has been delivered', time: '2 hours ago' },
    { icon: Bell, text: 'Reminder: Time to refill your prescription', time: '5 hours ago' },
    { icon: Store, text: 'New pharmacy added in your area', time: '1 day ago' },
    { icon: Star, text: 'You received a new reward point', time: '2 days ago' },
  ];

  return (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
              <activity.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-200">{activity.text}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NearbyPharmacies = () => {
  const pharmacies = [
    { name: 'MediCare Pharmacy', distance: '0.5 km', status: 'Open' },
    { name: 'HealthPlus', distance: '1.2 km', status: 'Open' },
    { name: 'City Pharmacy', distance: '2.0 km', status: 'Closed' },
  ];

  return (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Nearby Pharmacies</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400">View Map</button>
      </div>
      <div className="space-y-4">
        {pharmacies.map((pharmacy, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pharmacy.distance}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              pharmacy.status === 'Open' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {pharmacy.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's what's happening with your health care
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all">
            <ExternalLink className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityFeed />
        <NearbyPharmacies />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Package, label: 'Order Medicine', desc: 'Browse our catalog' },
          { icon: Store, label: 'Find Pharmacy', desc: 'Locate nearby stores' },
          { icon: Clock, label: 'Reminders', desc: 'Set medication alerts' },
          { icon: TrendingUp, label: 'Health Tracking', desc: 'Monitor your progress' },
        ].map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-between p-6 bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm group-hover:shadow-neu-pressed-sm dark:group-hover:shadow-dark-neu-pressed-sm transition-all">
                <action.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{action.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};