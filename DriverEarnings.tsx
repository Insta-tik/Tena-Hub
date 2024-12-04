import { DollarSign, Calendar, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface EarningsPeriod {
  period: string;
  amount: number;
  deliveries: number;
  change: number;
}

const mockEarnings: EarningsPeriod[] = [
  { period: 'Today', amount: 85.50, deliveries: 7, change: 12.5 },
  { period: 'This Week', amount: 435.75, deliveries: 32, change: -5.2 },
  { period: 'This Month', amount: 1850.25, deliveries: 145, change: 8.7 },
];

export const DriverEarnings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Earnings</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your earnings and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockEarnings.map((earning) => (
          <div
            key={earning.period}
            className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
                {earning.period === 'Today' ? (
                  <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm">
                {earning.change >= 0 ? (
                  <>
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">+{earning.change}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">{earning.change}%</span>
                  </>
                )}
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
              ${earning.amount.toFixed(2)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{earning.period}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {earning.deliveries} deliveries
            </p>
          </div>
        ))}
      </div>

      <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Earnings Breakdown</h2>
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Earnings chart visualization would go here
        </div>
      </div>
    </div>
  );
};