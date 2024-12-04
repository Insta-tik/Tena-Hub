import { useState } from 'react';
import { Search, Download, DollarSign, Calendar, User, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'order' | 'refund' | 'payout';
  customer: string;
  method: string;
}

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    date: '2024-02-15 14:30',
    amount: 89.99,
    status: 'completed',
    type: 'order',
    customer: 'John Doe',
    method: 'Credit Card',
  },
  {
    id: 'PAY-002',
    date: '2024-02-15 13:15',
    amount: 45.50,
    status: 'pending',
    type: 'payout',
    customer: 'MediCare Pharmacy',
    method: 'Bank Transfer',
  },
  // Add more mock payments as needed
];

export const AdminPaymentManagement = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment =>
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Payment Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400">
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Payment ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{payment.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    {payment.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    {payment.customer}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    {payment.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-400" />
                    {payment.method}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize text-sm text-gray-600 dark:text-gray-400">
                    {payment.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};