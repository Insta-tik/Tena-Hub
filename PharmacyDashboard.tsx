import { Route, Routes } from 'react-router-dom';
import { PharmacyLayout } from '../../components/pharmacy/PharmacyLayout';
import { PharmacyHome } from './PharmacyHome';
import { PharmacyProfile } from './PharmacyProfile';
import { PharmacyInventory } from './PharmacyInventory';
import { PharmacyOrders } from './PharmacyOrders';
import { PharmacyPrescriptions } from './PharmacyPrescriptions';
import { PharmacyAnalytics } from './PharmacyAnalytics';
import { PharmacySettings } from './PharmacySettings';

export const PharmacyDashboard = () => {
  return (
    <PharmacyLayout>
      <Routes>
        <Route index element={<PharmacyHome />} />
        <Route path="profile" element={<PharmacyProfile />} />
        <Route path="inventory" element={<PharmacyInventory />} />
        <Route path="orders" element={<PharmacyOrders />} />
        <Route path="prescriptions" element={<PharmacyPrescriptions />} />
        <Route path="analytics" element={<PharmacyAnalytics />} />
        <Route path="settings" element={<PharmacySettings />} />
      </Routes>
    </PharmacyLayout>
  );
};