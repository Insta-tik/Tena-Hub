import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface GoogleSignInButtonProps {
  onGoogleData?: (data: {
    email: string;
    name: string;
  }) => void;
}

export const GoogleSignInButton = ({ onGoogleData }: GoogleSignInButtonProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = async () => {
    // Simulate Google sign in with mock data
    const mockGoogleUser = {
      email: 'demo@example.com',
      name: 'Demo User',
      id: 'google-' + Math.random().toString(36).substr(2, 9),
    };

    // If we're on the registration page, just fill the form
    if (location.pathname === '/register' && onGoogleData) {
      onGoogleData({
        email: mockGoogleUser.email,
        name: mockGoogleUser.name,
      });
      return;
    }

    // Otherwise, proceed with login
    login({
      id: mockGoogleUser.id,
      email: mockGoogleUser.email,
      name: mockGoogleUser.name,
      role: 'customer',
    });
    
    navigate('/dashboard');
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 bg-neu-base dark:bg-dark-neu-base text-gray-700 dark:text-gray-200 rounded-xl px-4 py-3 shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-shadow"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continue with Google
    </button>
  );
};