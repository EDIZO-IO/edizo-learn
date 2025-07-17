import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock,  Heart, MessageCircle, Share, ArrowLeft,  Search, Tag } from 'lucide-react';
import { allBlogs, Blog } from '../data/blogData'; // Import allBlogs and Blog interface from the new blogData.tsx
import Navbar from '../components/Layout/Navbar'; // Import the new Navbar component
import { useThemeStore } from '../stores/themeStore'; // Import the actual useThemeStore

// Card and Button components remain the same
const Card = ({ children, className = '' }) => {
  const { isDark } = useThemeStore();
  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'md', disabled = false }) => {
  const baseStyle = 'flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-800 focus:ring-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-500',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${disabledStyle}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface BlogArticleProps {
  blog: Blog;
  isDark: boolean;
  onBack: () => void;
}

const BlogArticle = ({ blog, isDark, onBack }: BlogArticleProps) => {
  // Ensure content is joined for dangerouslySetInnerHTML if it's an array
  const articleContent = Array.isArray(blog.content) ? blog.content.join('<br/><br/>') : blog.content;
  const futureWorkContent = Array.isArray(blog.futureWork) ? blog.futureWork.join('<br/>') : '';

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Button>
          <Card>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-t-xl mb-6"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/cccccc/000000?text=Image+Error`; }}
            />
            <div className="p-6">
              <h1 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center space-x-4 text-sm mb-6">
                <div className="flex items-center">
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/50x50/cccccc/000000?text=Author`; }}
                  />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {blog.author}
                  </span>
                </div>
                <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(blog.publishDate).toLocaleDateString()}
                </span>
                <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  {blog.readTime}
                </span>
              </div>

              <div
                className={`prose prose-lg max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}`}
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              {blog.futureWork && blog.futureWork.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg shadow-inner mt-8">
                  <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">Future Work and Trends</h2>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {blog.futureWork.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} className="mb-2"></li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-6 mb-4">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full shadow-sm dark:bg-green-800 dark:text-green-100">
                    <Tag className="inline-block w-4 h-4 mr-1" />{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Heart className="w-4 h-4 mr-1" />
                    {blog.likes} Likes
                  </span>
                  <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {blog.comments} Comments
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

interface BlogCardProps {
  blog: Blog;
  onClick: (id: number) => void;
  isDark: boolean;
}

const BlogCard = ({ blog, onClick, isDark }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: isDark ? "0 10px 20px rgba(0,0,0,0.4)" : "0 10px 20px rgba(0,0,0,0.1)" }}
      onClick={() => onClick(blog.id)}
    >
      <Card className="mb-6 h-full flex flex-col">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-xl mb-4"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/cccccc/000000?text=Image+Error`; }}
        />
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
            }`}>
              {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {blog.readTime}
            </span>
          </div>

          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {blog.title}
          </h3>

          <p className={`text-sm mb-4 flex-grow ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/50x50/cccccc/000000?text=Author`; }}
              />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {blog.author}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Footer Component (remains the same)
const Footer = () => (
  <footer className="bg-gray-800 text-white text-center p-6 mt-10 rounded-t-xl shadow-inner">
    <p>&copy; {new Date().getFullYear()} DevBlog Central. All rights reserved.</p>
    <p className="text-sm text-gray-400 mt-2">Built with React & Tailwind CSS</p>
  </footer>
);


// Main App Component
export default function App() {
  const { isDark } = useThemeStore();
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleViewArticle = (blogId: number) => {
    setSelectedBlogId(blogId);
  };

  const handleBackToList = () => {
    setSelectedBlogId(null);
    setSearchTerm(''); // Clear search when going back to list
    setFilterCategory(''); // Clear category filter when going back to list
  };

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = searchTerm === '' ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === '' || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const currentBlog = allBlogs.find(blog => blog.id === selectedBlogId);
  const categories = [...new Set(allBlogs.map(blog => blog.category))];


  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar /> {/* Render the new Navbar component */}
      {/* Changed main section to span full width */}
      <main className="py-8 pt-24 w-full"> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Container for content within full width */}
          <AnimatePresence mode="wait">
            {selectedBlogId && currentBlog ? (
              <BlogArticle
                key="blog-detail"
                blog={currentBlog}
                isDark={isDark}
                onBack={handleBackToList}
              />
            ) : (
              <motion.div
                key="blog-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Latest Articles
                </h1>
                <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Explore our collection of insightful articles.
                </p>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative w-full md:w-1/2">
                    <input
                      type="text"
                      placeholder="Search articles by title or tags..."
                      className={`w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-1/2">
                    <button
                      onClick={() => setFilterCategory('')}
                      className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${filterCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`px-5 py-2 rounded-full font-medium capitalize transition-all duration-300 shadow-md ${filterCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        onClick={handleViewArticle}
                        isDark={isDark}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full text-center text-gray-600 text-xl py-10"
                    >
                      No blogs found matching your criteria.
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
