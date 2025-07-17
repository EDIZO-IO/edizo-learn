import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code,
  Brain,
  FileText,
  Trophy,
  GraduationCap,
  Menu,
  X,
  Sun, // Import Sun icon
  Moon, // Import Moon icon
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore(); // Destructure toggleTheme
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Tutorials', href: '/tutorials', icon: Code },
    { name: 'Playground', href: '/playground', icon: Brain },
    { name: 'Quiz', href: '/quiz', icon: Trophy },
    { name: 'Blogs', href: '/blogs', icon: FileText },
    { name: 'Interview', href: '/interview', icon: GraduationCap },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch {
      toast.error('Sign out failed');
    }
  };

  const activeClass = isDark
    ? 'bg-blue-600 text-white'
    : 'bg-blue-100 text-blue-700';

  const inactiveClass = isDark
    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
        isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Learn with Edizo
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isDark
                  ? 'text-yellow-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user.displayName?.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm px-3 py-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <button className="hidden md:block px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-6 space-y-2"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-2 px-4">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2">
                      <img
                        src={user.photoURL || '/default-avatar.png'}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.displayName?.split(' ')[0]}
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      className="text-left w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-800/30 text-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/auth">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
                {/* Theme Toggle for Mobile */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false); // Close menu after toggling theme
                  }}
                  className={`text-left w-full px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                    isDark
                      ? 'text-yellow-400 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" /> Dark Mode
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;