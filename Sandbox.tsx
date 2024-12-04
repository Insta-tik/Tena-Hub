import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { PlusCircle, MinusCircle, Moon, Sun, Package, Bell, Search } from 'lucide-react';
import { Card, Title } from '@tremor/react';

export const Sandbox = () => {
  const { theme, toggleTheme } = useTheme();
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-neu-base dark:bg-dark-neu-base p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            UI Component Sandbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A testing environment for components, themes, and features.
          </p>
        </div>

        {/* Theme Toggle Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Theme Toggle</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current theme: {theme}
            </div>
          </div>
        </section>

        {/* Counter Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Counter Component</h2>
          <div className="flex flex-col items-center gap-4 p-6 bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat">
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              {count}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setCount(prev => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-red-600 dark:text-red-400"
              >
                <MinusCircle size={20} />
                <span>Decrease</span>
              </button>
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-green-600 dark:text-green-400"
              >
                <PlusCircle size={20} />
                <span>Increase</span>
              </button>
            </div>
          </div>
        </section>

        {/* Button Styles */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all">
              Default Button
            </button>
            <button className="px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed transition-all">
              Pressed Button
            </button>
          </div>
        </section>

        {/* Input Fields */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Default input"
                className="w-full px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search input"
                className="w-full pl-10 pr-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Card */}
            <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
              <Title>Basic Card</Title>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                A simple card with basic styling
              </p>
            </Card>

            {/* Icon Card */}
            <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm">
                  <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Title>Icon Card</Title>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Card with an icon and title
              </p>
            </Card>

            {/* Action Card */}
            <Card className="bg-neu-base dark:bg-dark-neu-base shadow-neu-flat dark:shadow-dark-neu-flat">
              <div className="flex justify-between items-start mb-4">
                <Title>Action Card</Title>
                <button className="p-2 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all">
                  <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Card with an action button
              </p>
            </Card>
          </div>
        </section>

        {/* Shadows Showcase */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Shadow Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-24 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat flex items-center justify-center">
              Flat Shadow
            </div>
            <div className="h-24 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed dark:shadow-dark-neu-pressed flex items-center justify-center">
              Pressed Shadow
            </div>
            <div className="h-24 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm flex items-center justify-center">
              Small Flat
            </div>
            <div className="h-24 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-pressed-sm dark:shadow-dark-neu-pressed-sm flex items-center justify-center">
              Small Pressed
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};