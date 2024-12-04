import { DriverLayout } from '../../components/driver/DriverLayout';
import { DriverStats } from '../../components/driver/DriverStats';
import { DriverOrders } from '../../components/driver/DriverOrders';
import { DriverMap } from '../../components/driver/DriverMap';
import { Route, Routes } from 'react-router-dom';
import { DriverProfile } from './DriverProfile';
import { DriverEarnings } from './DriverEarnings';

export const DriverDashboard = () => {
  return (
    <DriverLayout>
      <Routes>
        <Route index element={<DriverHome />} />
        <Route path="profile" element={<DriverProfile />} />
        <Route path="orders" element={<DriverOrders />} />
        <Route path="earnings" element={<DriverEarnings />} />
      </Routes>
    </DriverLayout>
  );
};

const DriverHome = () => {
  return (
    <div className="space-y-6">
      <DriverStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <DriverMap />
        </div>
        <div className="lg:col-span-2">
          <DriverOrders />
        </div>
      </div>
    </div>
  );
};