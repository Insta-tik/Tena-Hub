import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed transition-all">
            TenaHub
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-4 py-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};