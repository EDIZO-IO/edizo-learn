import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Filter, Search, ChevronRight, Play, Bookmark } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const { isDark } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 156 },
    { id: 'javascript', name: 'JavaScript', count: 45 },
    { id: 'react', name: 'React', count: 32 },
    { id: 'python', name: 'Python', count: 28 },
    { id: 'dsa', name: 'Data Structures', count: 25 },
    { id: 'algorithms', name: 'Algorithms', count: 26 },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Complete JavaScript Fundamentals',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, async/await, and more.',
      category: 'javascript',
      difficulty: 'beginner',
      duration: '4 hours',
      rating: 4.8,
      students: 1250,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'John Doe',
      isBookmarked: false,
      progress: 0
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      description: 'Learn all React hooks with practical examples and build real-world applications.',
      category: 'react',
      difficulty: 'intermediate',
      duration: '3.5 hours',
      rating: 4.9,
      students: 890,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Jane Smith',
      isBookmarked: true,
      progress: 60
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Complete guide to Python programming for data analysis and machine learning.',
      category: 'python',
      difficulty: 'intermediate',
      duration: '6 hours',
      rating: 4.7,
      students: 2100,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Mike Johnson',
      isBookmarked: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Binary Trees and Traversals',
      description: 'Master binary trees, BST, and various traversal algorithms with visual examples.',
      category: 'dsa',
      difficulty: 'advanced',
      duration: '2.5 hours',
      rating: 4.6,
      students: 650,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Sarah Wilson',
      isBookmarked: true,
      progress: 25
    },
    {
      id: 5,
      title: 'Sorting Algorithms Explained',
      description: 'Comprehensive guide to sorting algorithms with time complexity analysis.',
      category: 'algorithms',
      difficulty: 'intermediate',
      duration: '3 hours',
      rating: 4.8,
      students: 980,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'David Brown',
      isBookmarked: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Advanced React Patterns',
      description: 'Learn render props, HOCs, compound components, and other advanced React patterns.',
      category: 'react',
      difficulty: 'advanced',
      duration: '4.5 hours',
      rating: 4.9,
      students: 720,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Emily Davis',
      isBookmarked: false,
      progress: 0
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
            Programming Tutorials
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn programming concepts with our comprehensive tutorials
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                    placeholder="Search tutorials..."
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
                      {category.name} ({category.count})
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
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tutorials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className={`p-2 rounded-full ${
                      tutorial.isBookmarked
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    } transition-colors`}>
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tutorial.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tutorial.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {tutorial.rating}
                      </div>
                    </div>
                    <span>{tutorial.students} students</span>
                  </div>

                  {tutorial.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Progress</span>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{tutorial.progress}%</span>
                      </div>
                      <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${tutorial.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      by {tutorial.author}
                    </span>
                    <Link to={`/tutorials/${tutorial.id}`}>
                      <Button size="sm">
                        {tutorial.progress > 0 ? 'Continue' : 'Start'}
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTutorials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No tutorials found
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

export default Tutorials;