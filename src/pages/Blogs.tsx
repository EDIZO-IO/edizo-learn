import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Heart, MessageCircle, Share, ArrowLeft } from 'lucide-react';
import { allBlogs, Blog } from '../data/blogData'; // Import allBlogs and Blog interface from blogData.tsx

// Mocking external dependencies for a self-contained example
// In a real application, useThemeStore, Card, and Button would be imported from your UI library
const useThemeStore = () => {
  const [isDark, setIsDark] = useState(false); // Simplified for this example
  return { isDark };
};

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
  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Button>
          <Card>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-t-xl mb-6"
            />
            <div className="p-6">
              <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {blog.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm mb-6">
                <div className="flex items-center">
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full mr-2"
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

              {/* Render content using dangerouslySetInnerHTML for rich text from Markdown */}
              <div 
                className={`prose max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}`}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

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
    >
      <Card className="mb-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-xl mb-4"
        />
        <div className="p-4">
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
          
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-6 h-6 rounded-full"
              />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {blog.author}
              </span>
            </div>
            <Button 
              onClick={() => onClick(blog.id)} 
              size="sm" 
              variant="outline"
            >
              Read More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Blogs = () => {
  const { isDark } = useThemeStore();
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  
  const handleViewArticle = (blogId: number) => {
    setSelectedBlogId(blogId);
  };

  const handleBackToList = () => {
    setSelectedBlogId(null);
  };

  const currentBlog = allBlogs.find(blog => blog.id === selectedBlogId);

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedBlogId && currentBlog ? ( // Ensure currentBlog is not null before rendering BlogArticle
          <BlogArticle 
            blog={currentBlog} 
            isDark={isDark}
            onBack={handleBackToList}
          />
        ) : (
          <div>
            <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Latest Articles
            </h1>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Click "Read More" to view any article in full
            </p>
            <div className="grid grid-cols-1 gap-6">
              {allBlogs.map(blog => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={handleViewArticle}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
