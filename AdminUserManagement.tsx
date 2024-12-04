import { useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, MoreVertical, Filter, Download } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@pharmacy.com',
    role: 'pharmacy',
    status: 'active',
    joinDate: '2024-01-10',
  },
  // Add more mock users as needed
];

export const AdminUserManagement = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neu-base/80 dark:bg-dark-neu-base/80 backdrop-blur-sm rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-neu-base/80 dark:bg-dark-neu-base/80 backdrop-blur-sm rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-gray-600 dark:text-gray-400">
            <Filter size={20} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neu-base/80 dark:bg-dark-neu-base/80 backdrop-blur-sm rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-gray-600 dark:text-gray-400">
            <Download size={20} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <UserPlus size={20} />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl bg-neu-base/80 dark:bg-dark-neu-base/80 backdrop-blur-sm shadow-neu-flat dark:shadow-dark-neu-flat">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neu-dark/10 dark:border-dark-neu-light/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Join Date</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-neu-dark/10 dark:border-dark-neu-light/10 hover:bg-neu-light/50 dark:hover:bg-dark-neu-light/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    user.status === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-neu-light/50 dark:hover:bg-dark-neu-light/50 rounded-lg transition-colors">
                      <Edit2 size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                    <button className="p-2 hover:bg-neu-light/50 dark:hover:bg-dark-neu-light/50 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};