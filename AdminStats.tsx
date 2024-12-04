import { useState } from 'react';
import {
  Card,
  Title,
  AreaChart,
  DonutChart,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  BarChart,
} from '@tremor/react';
import { Users, Package, Store, TruckDelivery, ArrowUp, ArrowDown } from 'lucide-react';

const mockChartData = [
  {
    date: '2024-01',
    Orders: 2890,
    Revenue: 23400,
    Customers: 1234,
  },
  {
    date: '2024-02',
    Orders: 3240,
    Revenue: 26800,
    Customers: 1456,
  },
];

const salesByCategory = [
  { name: 'Prescription Drugs', sales: 45 },
  { name: 'OTC Medicines', sales: 30 },
  { name: 'Health Supplies', sales: 15 },
  { name: 'Personal Care', sales: 10 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <div className="bg-neu-base dark:bg-dark-neu-base rounded-xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/50">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <span className={`flex items-center text-sm ${
        change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {Math.abs(change)}%
      </span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
  </div>
);

export const AdminStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="12,345"
          change={12.5}
          icon={Users}
        />
        <StatCard
          title="Total Orders"
          value="3,240"
          change={8.2}
          icon={Package}
        />
        <StatCard
          title="Active Pharmacies"
          value="156"
          change={-2.4}
          icon={Store}
        />
        <StatCard
          title="Active Drivers"
          value="89"
          change={15.3}
          icon={TruckDelivery}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <Title className="text-gray-800 dark:text-gray-200 mb-4">Growth Trends</Title>
          <TabGroup index={selectedPeriod} onIndexChange={setSelectedPeriod}>
            <TabList className="mt-4">
              <Tab>Last 7 days</Tab>
              <Tab>Last 30 days</Tab>
              <Tab>Last 90 days</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AreaChart
                  className="h-72 mt-4"
                  data={mockChartData}
                  index="date"
                  categories={["Orders", "Revenue", "Customers"]}
                  colors={["blue", "green", "purple"]}
                />
              </TabPanel>
              <TabPanel>
                <AreaChart
                  className="h-72 mt-4"
                  data={mockChartData}
                  index="date"
                  categories={["Orders", "Revenue", "Customers"]}
                  colors={["blue", "green", "purple"]}
                />
              </TabPanel>
              <TabPanel>
                <AreaChart
                  className="h-72 mt-4"
                  data={mockChartData}
                  index="date"
                  categories={["Orders", "Revenue", "Customers"]}
                  colors={["blue", "green", "purple"]}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <Title className="text-gray-800 dark:text-gray-200 mb-4">Sales by Category</Title>
          <DonutChart
            className="h-72 mt-4"
            data={salesByCategory}
            category="sales"
            index="name"
            colors={["blue", "green", "yellow", "purple"]}
          />
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
          <Title className="text-gray-800 dark:text-gray-200 mb-4">Monthly Performance</Title>
          <BarChart
            className="h-72 mt-4"
            data={mockChartData}
            index="date"
            categories={["Orders", "Revenue"]}
            colors={["blue", "green"]}
          />
        </Card>
      </div>
    </div>
  );
};