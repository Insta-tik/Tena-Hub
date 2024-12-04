import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { PasswordInput } from '../components/PasswordInput';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for specific credentials
    if (email === 'sisayabenezer08@gmail.com' && password === 'admin1234509876') {
      login({
        id: '1',
        email,
        role: 'admin',
        name: 'Boss',
      });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-neu-base dark:bg-dark-neu-base p-8 rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-700 dark:text-gray-200">Login to TenaHub</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>

        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
        />

        <button
          type="submit"
          className="w-full bg-neu-base dark:bg-dark-neu-base text-indigo-600 dark:text-indigo-400 rounded-xl px-4 py-3 shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neu-base dark:bg-dark-neu-base text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleSignInButton />
      </form>
    </div>
  );
};