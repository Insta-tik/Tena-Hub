import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PharmacyDashboard } from './pages/pharmacy/PharmacyDashboard';
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { Profile } from './pages/customer/Profile';
import { Products } from './pages/customer/Products';
import { Pharmacies } from './pages/customer/Pharmacies';
import { Settings } from './pages/customer/Settings';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { Cart } from './pages/customer/Cart';
import { PrivateRoute } from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import { Sandbox } from './pages/Sandbox';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="sandbox" element={<Sandbox />} />
                  <Route
                    path="dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<CustomerDashboard />} />
                    <Route path="home" element={<CustomerDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="products" element={<Products />} />
                    <Route path="pharmacies" element={<Pharmacies />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="cart" element={<Cart />} />
                  </Route>
                  <Route
                    path="admin/*"
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="pharmacy/*"
                    element={
                      <PrivateRoute allowedRoles={['pharmacy']}>
                        <PharmacyDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="driver/*"
                    element={
                      <PrivateRoute allowedRoles={['driver']}>
                        <DriverDashboard />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;