import { useAuth } from '../hooks/useAuth';
import { CustomerLayout } from '../components/customer/CustomerLayout';
import { AdminLayout } from '../components/admin/AdminLayout';
import { PharmacyLayout } from '../components/pharmacy/PharmacyLayout';
import { DriverLayout } from '../components/driver/DriverLayout';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'customer':
      return (
        <CustomerLayout>
          <Outlet />
        </CustomerLayout>
      );
    case 'admin':
      return (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      );
    case 'pharmacy':
      return (
        <PharmacyLayout>
          <Outlet />
        </PharmacyLayout>
      );
    case 'driver':
      return (
        <DriverLayout>
          <Outlet />
        </DriverLayout>
      );
    default:
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user.name}!
            </p>
          </div>
        </div>
      );
  }
};