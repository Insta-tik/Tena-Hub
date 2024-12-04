import { BarChart2, TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <span className="text-sm text-green-600 dark:text-green-400">{change}</span>
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">{value}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
  </div>
);

export const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Analytics Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$124,563"
            change="+12.5%"
            icon={DollarSign}
          />
          <StatCard
            title="Active Users"
            value="2,345"
            change="+8.1%"
            icon={Users}
          />
          <StatCard
            title="Orders"
            value="1,234"
            change="+15.3%"
            icon={Package}
          />
          <StatCard
            title="Growth Rate"
            value="23.5%"
            change="+4.2%"
            icon={TrendingUp}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <BarChart2 size={48} />
              <p className="mt-2">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">User Growth</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <TrendingUp size={48} />
              <p className="mt-2">Chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Monthly Trends</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <BarChart2 size={48} />
            <p className="mt-2">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};