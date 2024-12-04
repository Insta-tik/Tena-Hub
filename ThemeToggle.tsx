import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg shadow-neu-flat-sm dark:shadow-dark-neu-flat hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun size={20} className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};