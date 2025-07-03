import React from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../../stores/themeStore';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;