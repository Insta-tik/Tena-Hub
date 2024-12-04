import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminStats } from '../../components/admin/AdminStats';
import { AdminAnalytics } from '../../components/admin/AdminAnalytics';
import { AdminUserManagement } from '../../components/admin/AdminUserManagement';
import { AdminPharmacyManagement } from '../../components/admin/AdminPharmacyManagement';
import { AdminOrderManagement } from '../../components/admin/AdminOrderManagement';
import { AdminDriverManagement } from '../../components/admin/AdminDriverManagement';
import { AdminPaymentManagement } from '../../components/admin/AdminPaymentManagement';
import { AdminSupport } from '../../components/admin/AdminSupport';
import { Route, Routes } from 'react-router-dom';

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminStats />} />
        <Route path="dashboard" element={<AdminStats />} />
        <Route path="users" element={<AdminUserManagement />} />
        <Route path="pharmacies" element={<AdminPharmacyManagement />} />
        <Route path="orders" element={<AdminOrderManagement />} />
        <Route path="delivery" element={<AdminDriverManagement />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="payments" element={<AdminPaymentManagement />} />
        <Route path="support" element={<AdminSupport />} />
      </Routes>
    </AdminLayout>
  );
};