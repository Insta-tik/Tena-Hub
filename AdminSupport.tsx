import { useState } from 'react';
import { Search, MessageSquare, AlertCircle, CheckCircle, Clock, MoreVertical } from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
  messages: number;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TCKT-001',
    subject: 'Payment not processed',
    customer: 'John Doe',
    status: 'open',
    priority: 'high',
    createdAt: '2024-02-15 14:30',
    lastUpdated: '2024-02-15 15:45',
    messages: 3,
  },
  {
    id: 'TCKT-002',
    subject: 'Delivery delay',
    customer: 'Jane Smith',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-02-15 12:20',
    lastUpdated: '2024-02-15 14:15',
    messages: 2,
  },
  // Add more mock tickets as needed
];

export const AdminSupport = () => {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Support Management</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-gray-600 dark:text-gray-400">
            <Clock size={20} />
            <span>View History</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400">
            <MessageSquare size={20} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat p-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{ticket.subject}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ticket ID: {ticket.id}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customer: {ticket.customer}</p>
              </div>
              <button className="p-2 bg-neu-base dark:bg-dark-neu-base rounded-lg shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all">
                <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle size={16} className={getPriorityColor(ticket.priority)} />
                <span className="capitalize text-gray-600 dark:text-gray-400">
                  {ticket.priority} Priority
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare size={16} className="text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {ticket.messages} messages
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Last updated: {ticket.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};