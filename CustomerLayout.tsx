import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Store, 
  Package, 
  ShoppingCart, 
  User, 
  MapPin, 
  HelpCircle, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/dashboard/pharmacies', label: 'Pharmacies', icon: Store },
  { path: '/dashboard/products', label: 'Products', icon: Package },
  { path: '/dashboard/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
  { path: '/dashboard/addresses', label: 'Addresses', icon: MapPin },
  { path: '/dashboard/support', label: 'Support', icon: HelpCircle },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: '/' + paths.slice(0, index + 1).join('/'),
      isLast: index === paths.length - 1
    }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neu-light via-neu-base to-neu-light dark:from-dark-neu-base dark:via-dark-neu-light dark:to-dark-neu-base">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-neu-base/95 dark:bg-dark-neu-base/95 backdrop-blur-lg border-r border-neu-dark/10 dark:border-dark-neu-light/10">
        <div className="p-6 border-b border-neu-dark/10 dark:border-dark-neu-light/10">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">TenaHub</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'shadow-neu-pressed dark:shadow-dark-neu-pressed text-indigo-600 dark:text-indigo-400 bg-neu-light/50 dark:bg-dark-neu-light/50'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-neu-light/30 dark:hover:bg-dark-neu-light/30'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 m-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <User size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Customer Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-neu-base/95 dark:bg-dark-neu-base/95 backdrop-blur-lg">
          <div className="p-6 border-b border-neu-dark/10 dark:border-dark-neu-light/10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">TenaHub</span>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'shadow-neu-pressed dark:shadow-dark-neu-pressed text-indigo-600 dark:text-indigo-400 bg-neu-light/50 dark:bg-dark-neu-light/50'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-neu-light/30 dark:hover:bg-dark-neu-light/30'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-neu-base/95 dark:bg-dark-neu-base/95 backdrop-blur-lg border-b border-neu-dark/10 dark:border-dark-neu-light/10">
          <div className="px-6 py-4">
            {/* Search and Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, pharmacies..."
                  className="w-full pl-12 pr-4 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all relative">
                  <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
                </button>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              {getBreadcrumbs().map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">/</span>}
                  {crumb.isLast ? (
                    <span className="text-gray-600 dark:text-gray-400">{crumb.label}</span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};