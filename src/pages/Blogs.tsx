import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Heart, MessageCircle, Share, ArrowLeft } from 'lucide-react';

// Mocking external dependencies for a self-contained example
const useThemeStore = () => {
  const [isDark, setIsDark] = useState(false);
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

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
  tags: string[];
}

const BlogArticle = ({ blog, isDark, onBack }) => {
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

              <div className={`prose max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}`}>
                <p className="mb-4">{blog.content}</p>
                <h3 className={`text-xl font-semibold mt-8 mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Key Takeaways:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand the core concepts of {blog.category}.</li>
                  <li>Practice with hands-on examples.</li>
                  <li>Stay updated with the latest trends.</li>
                </ul>
                <p className="mt-6">
                  We hope you found this article insightful. Feel free to share your thoughts in the comments below!
                </p>
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

const BlogCard = ({ blog, onClick, isDark }) => {
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

const App = () => {
  const { isDark } = useThemeStore();
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  
  const allBlogs = [
    {
      id: 1,
      title: 'The Complete Guide to React Hooks in 2024',
      excerpt: 'Learn everything about React Hooks with practical examples and best practices for modern React development.',
      content: `React Hooks have revolutionized how we write React components...`, // (full content as before)
      author: 'Sarah Johnson',
      authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      category: 'react',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 245,
      comments: 32,
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Mastering Async/Await in JavaScript',
      excerpt: 'Deep dive into asynchronous JavaScript programming with async/await and learn how to handle promises effectively.',
      content: `Asynchronous programming is crucial for modern web development...`, // (full content as before)
      author: 'Mike Chen',
      authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-12',
      readTime: '6 min read',
      category: 'javascript',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 189,
      comments: 24,
      tags: ['JavaScript', 'Async', 'Promises', 'ES6']
    },
    {
      id: 3,
      title: 'Python Data Science: From Beginner to Pro',
      excerpt: 'Complete roadmap for learning data science with Python, including essential libraries and practical projects.',
      content: `Data science with Python has become increasingly popular...`, // (full content as before)
      author: 'Emily Rodriguez',
      authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      publishDate: '2024-01-10',
      readTime: '12 min read',
      category: 'python',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 312,
      comments: 45,
      tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics']
    }
  ];

  const handleViewArticle = (blogId) => {
    setSelectedBlogId(blogId);
  };

  const handleBackToList = () => {
    setSelectedBlogId(null);
  };

  const currentBlog = allBlogs.find(blog => blog.id === selectedBlogId);

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedBlogId ? (
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

export default App;