import {
  Package,
  ShoppingCart,
  FileText,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Bell,
} from 'lucide-react';
import { Card } from '@tremor/react';

const QuickStats = () => {
  const stats = [
    { icon: ShoppingCart, label: 'New Orders', value: '12', trend: '+3 today' },
    { icon: FileText, label: 'Pending Prescriptions', value: '8', trend: 'Needs review' },
    { icon: Package, label: 'Low Stock Items', value: '15', trend: 'Need restock' },
    { icon: DollarSign, label: 'Today\'s Sales', value: '$1,234', trend: '+12.5%' },
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

const RecentActivities = () => {
  const activities = [
    { icon: ShoppingCart, text: 'New order #1234 received', time: '2 minutes ago' },
    { icon: FileText, text: 'Prescription needs verification', time: '15 minutes ago' },
    { icon: Package, text: 'Inventory alert: Paracetamol low stock', time: '1 hour ago' },
    { icon: Users, text: 'New customer registration', time: '2 hours ago' },
  ];

  return (
    <Card className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Activities</h2>
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
    </Card>
  );
};

const QuickActions = () => {
  const actions = [
    { icon: Package, label: 'Update Inventory', desc: 'Manage stock levels' },
    { icon: FileText, label: 'Review Prescriptions', desc: 'Verify pending requests' },
    { icon: ShoppingCart, label: 'Process Orders', desc: 'Handle pending orders' },
    { icon: Clock, label: 'Update Hours', desc: 'Modify business hours' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex flex-col items-center p-6 bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-center group"
        >
          <div className="p-4 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm group-hover:shadow-neu-pressed-sm dark:group-hover:shadow-dark-neu-pressed-sm transition-all mb-4">
            <action.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{action.label}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
        </button>
      ))}
    </div>
  );
};

export const PharmacyHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Pharmacy Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Monitor and manage your pharmacy operations
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all">
            <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <RecentActivities />
        </div>
        <div className="space-y-6">
          {/* Sales Trend Chart would go here */}
          <Card className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sales Trend</h2>
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Sales chart visualization would go here
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};