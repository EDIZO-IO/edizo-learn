import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './stores/authStore';
import { useThemeStore } from './stores/themeStore';
import Layout from './components/Layout/Layout';
import AuthGuard from './components/Auth/AuthGuard';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import Tutorials from './pages/Tutorials';
import Quiz from './pages/Quiz';
import Blogs from './pages/Blogs';
import Interview from './pages/Interview';
import ProblemPage from './pages/problempage';

function App() {
  const { setUser, setLoading } = useAuthStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // If Firebase is not initialized, set loading to false
      setLoading(false);
    }
  }, [setUser, setLoading]);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className={isDark ? 'dark' : ''}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="playground" element={<Playground />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="interview" element={<Interview />} />
            <Route path="dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: isDark ? '#374151' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;