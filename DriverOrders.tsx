import { useState } from 'react';
import { Package, MapPin, Clock, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface DeliveryOrder {
  id: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  customerName: string;
  customerAddress: string;
  pharmacyName: string;
  pharmacyAddress: string;
  distance: string;
  estimatedTime: string;
  amount: number;
  createdAt: string;
}

const mockOrders: DeliveryOrder[] = [
  {
    id: 'ORD-001',
    status: 'pending',
    customerName: 'John Doe',
    customerAddress: '123 Main St, Apt 4B',
    pharmacyName: 'MediCare Pharmacy',
    pharmacyAddress: '456 Health Ave',
    distance: '2.5 km',
    estimatedTime: '15 mins',
    amount: 12.50,
    createdAt: '2024-02-15 14:30'
  },
  {
    id: 'ORD-002',
    status: 'picked_up',
    customerName: 'Jane Smith',
    customerAddress: '789 Oak Rd',
    pharmacyName: 'HealthPlus',
    pharmacyAddress: '321 Care Blvd',
    distance: '3.2 km',
    estimatedTime: '20 mins',
    amount: 15.75,
    createdAt: '2024-02-15 14:15'
  }
];

export const DriverOrders = () => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockOrders);

  const getStatusColor = (status: DeliveryOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'picked_up':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'accepted' }
          : order
      )
    );
    toast.success('Order accepted successfully');
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled' }
          : order
      )
    );
    toast.success('Order rejected');
  };

  const handleUpdateStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Active Deliveries</h2>
        <select className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200">
          <option>All Orders</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-xl p-4 shadow-neu-pressed dark:shadow-dark-neu-pressed"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{order.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Customer: {order.customerName}
                </p>
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                ${order.amount.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Pickup: {order.pharmacyName}</p>
                  <p className="text-gray-500">{order.pharmacyAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Delivery: {order.customerAddress}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-500">{order.distance}</span>
                    <span className="text-gray-500">~{order.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {order.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptOrder(order.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-green-600 dark:text-green-400"
                >
                  <CheckCircle size={18} />
                  Accept
                </button>
                <button
                  onClick={() => handleRejectOrder(order.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-red-600 dark:text-red-400"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            )}

            {order.status === 'accepted' && (
              <button
                onClick={() => handleUpdateStatus(order.id, 'picked_up')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-indigo-600 dark:text-indigo-400"
              >
                <Package size={18} />
                Mark as Picked Up
              </button>
            )}

            {order.status === 'picked_up' && (
              <button
                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-indigo-600 dark:text-indigo-400"
              >
                <CheckCircle size={18} />
                Mark as Delivered
              </button>
            )}

            {(order.status === 'delivered' || order.status === 'cancelled') && (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-gray-600 dark:text-gray-400">
                <ChevronRight size={18} />
                View Details
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};