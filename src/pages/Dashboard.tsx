// src/pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Trophy, Target, Calendar, TrendingUp,
  Award, Clock, ChevronRight, Flame
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { useThemeStore } from '../stores/themeStore';
import { getUserData } from '../lib/firebaseService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { stats, recentActivities, recommendedContent, updateStats, setActivities, setRecommendations } = useUserStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const data = await getUserData(currentUser.uid);
          updateStats(data.stats);
          setActivities(data.recentActivities || []);
          setRecommendations(data.recommendations || []);
        } catch (err) {
          console.error('Failed to fetch user dashboard data:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const quickStats = [
    {
      icon: Trophy,
      label: 'Total Points',
      value: stats.totalPoints.toLocaleString(),
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BookOpen,
      label: 'Articles Read',
      value: stats.totalArticlesRead,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      label: 'Quizzes Taken',
      value: stats.totalQuizzesTaken,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: stats.currentStreak,
      color: 'from-red-500 to-pink-500'
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.displayName?.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Continue your learning journey and reach new milestones
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
              </Card>
            );
          })}
        </motion.div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
                <Link to="/progress">
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.type === 'quiz' ? Trophy : activity.type === 'tutorial' ? BookOpen : Target;
                  return (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.type === 'quiz' && `Score: ${activity.score}%`}
                          {activity.type === 'tutorial' && `Progress: ${activity.progress}%`}
                          {activity.type === 'playground' && 'Completed'}
                        </p>
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Level Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Level Progress</h2>
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Level {stats.level}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Intermediate Developer</div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress to Level {stats.level + 1}</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>75%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedContent.map((content, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    content.type === 'tutorial'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : content.type === 'quiz'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}</span>
                  </div>
                </div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{content.title}</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{content.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm px-2 py-1 rounded ${
                    content.difficulty === 'Advanced'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : content.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {content.difficulty}
                  </span>
                  <Link to={content.link}>
                    <Button size="sm">Start <ChevronRight className="ml-1 w-4 h-4" /></Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
