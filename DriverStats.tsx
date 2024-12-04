import { DollarSign, MapPin, Package, Clock, TrendingUp } from 'lucide-react';

export const DriverStats = () => {
  const stats = [
    {
      title: "Today's Earnings",
      value: "$128.50",
      change: "+12.5%",
      icon: DollarSign,
      description: "Including tips"
    },
    {
      title: "Deliveries",
      value: "8",
      change: "+2",
      icon: Package,
      description: "Completed today"
    },
    {
      title: "Distance",
      value: "45.2 km",
      change: "",
      icon: MapPin,
      description: "Total distance"
    },
    {
      title: "Active Time",
      value: "5h 23m",
      change: "",
      icon: Clock,
      description: "Online duration"
    }
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
            {stat.change && (
              <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                <TrendingUp size={16} className="mr-1" />
                {stat.change}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};