import { useState } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  pharmacy: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    pharmacy: 'MediCare Pharmacy',
    items: 3,
    total: 89.99,
    status: 'pending',
    date: '2024-02-15 14:30',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    pharmacy: 'HealthPlus',
    items: 2,
    total: 45.50,
    status: 'processing',
    date: '2024-02-15 13:15',
  },
  // Add more mock orders as needed
];

export const AdminOrderManagement = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Order Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-gray-600 dark:text-gray-400">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Pharmacy</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Items</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{order.pharmacy}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{order.items}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 bg-neu-base dark:bg-dark-neu-base rounded-lg shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all">
                    <ExternalLink size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};