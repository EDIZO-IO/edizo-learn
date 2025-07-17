import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building, Clock, Star, Filter, Search, ChevronRight, Target, Award, Code, Cpu, Database, Layers, Smartphone, Server, Cloud, Shield, GitBranch } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore'; // Import the actual useThemeStore

// Mock definitions for demonstration purposes (Card and Button will be updated to use isDark from store)
const Card = ({ children, className = '' }) => {
  const { isDark } = useThemeStore(); // Use isDark from the external theme store
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, size = 'md', variant = 'primary', className = '', ...props }) => {
  const { isDark } = useThemeStore(); // Use isDark from the external theme store
  let baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  let sizeStyle = '';
  let variantStyle = '';

  switch (size) {
    case 'sm': sizeStyle = 'px-3 py-1.5 text-sm'; break;
    case 'md': sizeStyle = 'px-4 py-2 text-base'; break;
    case 'lg': sizeStyle = 'px-5 py-2.5 text-lg'; break;
    default: sizeStyle = 'px-4 py-2 text-base';
  }

  switch (variant) {
    case 'primary': variantStyle = 'bg-blue-600 text-white hover:bg-blue-700'; break;
    case 'outline': variantStyle = `border ${isDark ? 'border-blue-400 text-blue-400 hover:bg-gray-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`; break;
    default: variantStyle = 'bg-blue-600 text-white hover:bg-blue-700';
  }

  return (
    <button className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

const problems = []; // Mock problems data
const interviewQuestions = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    company: 'google',
    category: 'algorithms',
    tags: ['array', 'hash table'],
    frequency: 95,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    company: 'amazon',
    category: 'algorithms',
    tags: ['string', 'sliding window'],
    frequency: 88,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))',
  },
  {
    id: '3',
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.',
    difficulty: 'easy',
    company: 'microsoft',
    category: 'dsa',
    tags: ['linked list'],
    frequency: 70,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
  },
  {
    id: '4',
    title: 'System Design: Design TinyURL',
    description: 'Design a URL shortening service like TinyURL.',
    difficulty: 'hard',
    company: 'google',
    category: 'system',
    tags: ['system design', 'distributed systems'],
    frequency: 80,
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
  },
  {
    id: '5',
    title: 'SQL: Second Highest Salary',
    description: 'Write a SQL query to get the second highest salary from the Employee table.',
    difficulty: 'medium',
    company: 'microsoft',
    category: 'db',
    tags: ['sql', 'database'],
    frequency: 65,
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
  },
  {
    id: '6',
    title: 'Implement Debounce Function',
    description: 'Implement a debounce function in JavaScript.',
    difficulty: 'medium',
    company: 'facebook',
    category: 'frontend',
    tags: ['javascript', 'frontend', 'hoisting'],
    frequency: 75,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
  {
    id: '7',
    title: 'Reverse a Linked List',
    description: 'Reverse a singly linked list.',
    difficulty: 'easy',
    company: 'apple',
    category: 'dsa',
    tags: ['linked list'],
    frequency: 90,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: '8',
    title: 'Find the Missing Number',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    difficulty: 'easy',
    company: 'netflix',
    category: 'algorithms',
    tags: ['array', 'math'],
    frequency: 85,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: '9',
    title: 'Validate Binary Search Tree',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    difficulty: 'medium',
    company: 'google',
    category: 'dsa',
    tags: ['tree', 'binary search tree'],
    frequency: 78,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)', // h is height of tree
  },
  {
    id: '10',
    title: 'Rate Limiter Design',
    description: 'Design a rate limiter.',
    difficulty: 'hard',
    company: 'uber',
    category: 'system',
    tags: ['system design', 'distributed systems'],
    frequency: 72,
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
  },
];


const Interview = () => {
  const { isDark } = useThemeStore(); // Use isDark from the external theme store
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
                      {/* Note: React components cannot be directly rendered inside <option> tags. */}
                      {/* For icons, you might need to use emojis or a different approach if not already handled by your select styling. */}
                      {category.name}
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
                        {/* Render category icon directly if it's a React component, otherwise handle as text/emoji */}
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
                    {/* Removed the "View Solution" button */}
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
