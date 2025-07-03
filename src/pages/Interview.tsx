import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building, Clock, Star, Filter, Search, ChevronRight, Target, Award, Code, Cpu, Database, Layers, Smartphone, Server, Cloud, Shield, GitBranch } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { problems, interviewQuestions } from '../data/problemData';

const Interview = () => {
  const { isDark } = useThemeStore();
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  // Load solved problems from localStorage
  useEffect(() => {
    const savedSolvedProblems = localStorage.getItem('solvedProblems');
    if (savedSolvedProblems) {
      setSolvedProblems(JSON.parse(savedSolvedProblems));
    }
  }, []);

  const companies = [
    { id: 'all', name: 'All Companies', logo: '🏢' },
    { id: 'google', name: 'Google', logo: '🔍' },
    { id: 'microsoft', name: 'Microsoft', logo: '🪟' },
    { id: 'amazon', name: 'Amazon', logo: '📦' },
    { id: 'facebook', name: 'Meta', logo: '👥' },
    { id: 'apple', name: 'Apple', logo: '🍎' },
    { id: 'netflix', name: 'Netflix', logo: '🎬' },
    { id: 'tesla', name: 'Tesla', logo: '⚡' },
    { id: 'twitter', name: 'Twitter', logo: '🐦' },
    { id: 'uber', name: 'Uber', logo: '🚗' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Layers className="w-4 h-4" /> },
    { id: 'dsa', name: 'Data Structures', icon: <Code className="w-4 h-4" /> },
    { id: 'algorithms', name: 'Algorithms', icon: <Cpu className="w-4 h-4" /> },
    { id: 'db', name: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'system', name: 'System Design', icon: <Server className="w-4 h-4" /> },
    { id: 'frontend', name: 'Frontend', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend', icon: <Cloud className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'os', name: 'OS Concepts', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'aptitude', name: 'Aptitude', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const filteredQuestions = interviewQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompany = selectedCompany === 'all' || question.company === selectedCompany;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    
    return matchesSearch && matchesCompany && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 90) return 'text-red-600 dark:text-red-400';
    if (frequency >= 70) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  const progressPercentage = Math.round((solvedProblems.length / interviewQuestions.length) * 100);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Interview Preparation Hub
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Master technical and aptitude questions from top tech companies
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Progress:
                </span>
                <span className="ml-2 font-semibold">
                  {solvedProblems.length}/{interviewQuestions.length} problems solved
                </span>
              </div>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Target, label: 'Total Questions', value: interviewQuestions.length, color: 'from-blue-500 to-blue-600' },
            { icon: Building, label: 'Companies', value: companies.length - 1, color: 'from-green-500 to-green-600' },
            { icon: Code, label: 'Categories', value: categories.length - 1, color: 'from-purple-500 to-purple-600' },
            { icon: Star, label: 'Your Solved', value: solvedProblems.length, color: 'from-orange-500 to-orange-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Company Filter */}
              <div>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.logo} {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`hover:shadow-lg transition-shadow duration-200 ${
                solvedProblems.includes(question.id) ? 'border-l-4 border-green-500' : ''
              }`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {question.title}
                        {solvedProblems.includes(question.id) && (
                          <span className="ml-2 text-green-500">✓</span>
                        )}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                      {question.frequency && (
                        <span className={`text-sm font-medium ${getFrequencyColor(question.frequency)}`}>
                          {question.frequency}% frequency
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {question.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                      <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Building className="w-4 h-4 mr-1" />
                        {companies.find(c => c.id === question.company)?.name}
                      </div>
                      <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {categories.find(c => c.id === question.category)?.icon}
                        <span className="ml-1">{categories.find(c => c.id === question.category)?.name}</span>
                      </div>
                      {question.timeComplexity && (
                        <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          Time: {question.timeComplexity}
                        </div>
                      )}
                      {question.spaceComplexity && (
                        <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Database className="w-4 h-4 mr-1" />
                          Space: {question.spaceComplexity}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-6">
                    <Link to={`/interview/problems/${question.id}`}>
                      <Button size="sm" className="w-full">
                        {solvedProblems.includes(question.id) ? 'View Again' : 'Solve Problem'}
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/interview/problems/${question.id}?tab=solution`}>
                      <Button size="sm" variant="outline" className="w-full">
                        View Solution
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GraduationCap className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No questions found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Interview;