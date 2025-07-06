import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../../stores/themeStore';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content Scrollable Area */}
      <main
        className="flex-1 mt-16 overflow-y-auto px-4 sm:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
      >
        <Outlet />
      </main>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
