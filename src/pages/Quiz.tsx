import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, CheckCircle, XCircle, RotateCcw, Play, Sun, Moon } from 'lucide-react'; // Added Sun and Moon for clarity, though the button will be removed
import { questions } from '../data/quizData';
import { useThemeStore } from '../stores/themeStore'; // Import the actual useThemeStore

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Hard';
}

interface Category {
  id: string;
  name: string;
}

const Quiz = () => {
  const { isDark, toggleTheme } = useThemeStore(); // Use isDark and toggleTheme from the external theme store
  const [selectedCategory, setSelectedCategory] = useState('javascript');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Hard'>('All');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  const categories: Category[] = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'python', name: 'Python' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'angular', name: 'Angular' },
    { id: 'vue', name: 'Vue.js' },
  ];

  useEffect(() => {
    const filtered = questions.filter(q => 
      q.category === selectedCategory && 
      (selectedLevel === 'All' || q.level === selectedLevel)
    );
    setFilteredQuestions(filtered);
  }, [selectedCategory, selectedLevel]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResults]);

  const startQuiz = () => {
    if (filteredQuestions.length === 0) {
      alert(`No questions available for ${categories.find(c => c.id === selectedCategory)?.name} - ${selectedLevel}`);
      return;
    }
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(filteredQuestions.length).fill(null));
    setSelectedAnswer(null);
    setShowResults(false);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmitQuiz = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correct
    ).length;
    return Math.round((correctAnswers / filteredQuestions.length) * 100);
  };

  if (!quizStarted) {
    return (
      <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Removed local theme toggle button as it's handled by Navbar */}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Programming Quiz
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Test your knowledge and earn points
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : isDark 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {questions.filter(q => q.category === category.id).length} questions
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['All', 'Beginner', 'Intermediate', 'Hard'].map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="mb-6 text-center">
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredQuestions.length} questions available for {categories.find(c => c.id === selectedCategory)?.name} {selectedLevel !== 'All' ? `(${selectedLevel})` : ''}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className={`p-6 rounded-xl shadow-lg max-w-md mx-auto ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quiz Rules
              </h3>
              <ul className={`text-left space-y-2 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• 5 minutes time limit</li>
                <li>• Multiple choice questions</li>
                <li>• Navigate between questions</li>
                <li>• See explanations after submission</li>
              </ul>
              <button
                onClick={startQuiz}
                disabled={filteredQuestions.length === 0}
                className={`w-full px-5 py-3 rounded-lg font-medium flex items-center justify-center ${
                  filteredQuestions.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </button>
              {filteredQuestions.length === 0 && (
                <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  No questions available for this selection
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correct
    ).length;

    return (
      <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className={`p-6 rounded-xl shadow-lg max-w-md mx-auto ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quiz Completed!
              </h2>
              <div className={`text-4xl font-bold mb-4 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                You got {correctAnswers} out of {filteredQuestions.length} questions correct
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  New Quiz
                </button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`p-6 rounded-xl shadow-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    answers[index] === question.correct
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {answers[index] === question.correct ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded-lg text-sm ${
                            optionIndex === question.correct
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : optionIndex === answers[index] && answers[index] !== question.correct
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : isDark
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = filteredQuestions[currentQuestion];

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {categories.find(c => c.id === selectedCategory)?.name} Quiz ({selectedLevel})
          </h1>
          <div className={`flex items-center space-x-4 text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {currentQuestion + 1} / {filteredQuestions.length}
            </div>
            <div className={`flex items-center ${timeLeft < 60 ? 'text-red-500' : ''}`}>
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        
        <div className={`w-full bg-gray-200 rounded-full h-2 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        } mb-8`}>
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          ></div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {currentQ?.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ?.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isDark
                      ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500'
                        : isDark
                        ? 'border-gray-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={currentQuestion === filteredQuestions.length - 1 ? handleSubmitQuiz : handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-4 py-2 rounded-lg ${
              selectedAnswer === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {currentQuestion === filteredQuestions.length - 1 ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
