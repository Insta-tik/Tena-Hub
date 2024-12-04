import { BarChart, Title, Card } from '@tremor/react';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';

const mockData = [
  {
    date: '2024-01',
    Sales: 3200,
    Prescriptions: 156,
    Orders: 245,
  },
  {
    date: '2024-02',
    Sales: 3800,
    Prescriptions: 189,
    Orders: 312,
  },
  // Add more mock data as needed
];

export const PharmacyAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your pharmacy's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
              <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <Title>Monthly Sales</Title>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">$3,800</p>
            </div>
          </div>
          <div className="h-24">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="text-sm text-green-500">+12.5% from last month</span>
          </div>
        </Card>

        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
              <BarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <Title>Total Orders</Title>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">312</p>
            </div>
          </div>
          <div className="h-24">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="text-sm text-green-500">+27.3% from last month</span>
          </div>
        </Card>

        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
              <BarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <Title>Prescriptions</Title>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">189</p>
            </div>
          </div>
          <div className="h-24">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="text-sm text-green-500">+21.2% from last month</span>
          </div>
        </Card>
      </div>

      <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
        <Title>Performance Overview</Title>
        <BarChart
          data={mockData}
          index="date"
          categories={["Sales", "Orders", "Prescriptions"]}
          colors={["blue", "green", "red"]}
          className="h-80 mt-4"
        />
      </Card>
    </div>
  );
};