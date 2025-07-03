import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code, ChevronLeft, Check, X, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const ProblemPage = () => {
  const { isDark } = useThemeStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [testCases, setTestCases] = useState([
    { input: '', output: '', result: '', expanded: false }
  ]);

  // Sample problem data - in a real app, this would come from an API
  const problems = {
    '1': {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      frequency: '95%',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      explanation: `We use a hash table to store the value and its index as we iterate through the array. For each element, we calculate the complement (target - current element) and check if it exists in the hash table. If it does, we return the indices of the current element and its complement. This approach has a time complexity of O(n) and space complexity of O(n).`
    },
    '2': {
      id: '2',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      frequency: '88%',
      description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: 'The list is reversed'
        }
      ],
      constraints: [
        'The number of nodes in the list is the range [0, 5000]',
        '-5000 <= Node.val <= 5000'
      ],
      solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
      explanation: `We use three pointers: prev, current, and next. We iterate through the list, reversing the links between nodes. The time complexity is O(n) and space complexity is O(1).`
    }
  };

  const problem = problems[id];

  if (!problem) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Card className="text-center p-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Problem Not Found
          </h2>
          <Button onClick={() => navigate('/interview')}>
            Back to Problems
          </Button>
        </Card>
      </div>
    );
  }

  const handleRunCode = () => {
    // In a real app, this would execute the code against test cases
    setConsoleOutput([
      { type: 'info', message: 'Running test cases...' },
      { type: 'success', message: 'Test case 1 passed' },
      { type: 'success', message: 'Test case 2 passed' }
    ]);
    setShowConsole(true);
  };

  const handleSubmitCode = () => {
    // In a real app, this would submit to a judge system
    setConsoleOutput([
      { type: 'info', message: 'Submitting solution...' },
      { type: 'success', message: 'All test cases passed!' }
    ]);
    setShowConsole(true);
  };

  const toggleTestCase = (index) => {
    const newTestCases = [...testCases];
    newTestCases[index].expanded = !newTestCases[index].expanded;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '', result: '', expanded: true }]);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => navigate('/interview')} 
            variant="outline" 
            size="sm"
            className="mr-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {problem.title}
          </h1>
          <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
            problem.difficulty === 'Easy' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : problem.difficulty === 'Medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {problem.difficulty}
          </span>
          <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Frequency: {problem.frequency}
          </span>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Problem statement area */}
          <div className={`lg:w-1/2 ${activeTab === 'problem' ? 'block' : 'hidden lg:block'}`}>
            <Card className="h-full">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Description
                  </h2>
                  <p className={`whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {problem.description}
                  </p>
                </div>

                {problem.examples.length > 0 && (
                  <div className="mb-6">
                    <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Examples
                    </h2>
                    {problem.examples.map((example, index) => (
                      <div key={index} className="mb-4">
                        <div className={`p-4 rounded-lg mb-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <div className="font-medium mb-1">Input: {example.input}</div>
                          <div className="font-medium">Output: {example.output}</div>
                        </div>
                        {example.explanation && (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="font-medium">Explanation: </span>
                            {example.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && problem.constraints.length > 0 && (
                  <div>
                    <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Constraints
                    </h2>
                    <ul className={`list-disc pl-5 space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Code editor and console area */}
          <div className={`lg:w-1/2 ${activeTab === 'solution' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex mb-2">
              <Button
                variant={activeTab === 'problem' ? 'primary' : 'outline'}
                size="sm"
                className="mr-2"
                onClick={() => setActiveTab('problem')}
              >
                Problem
              </Button>
              <Button
                variant={activeTab === 'solution' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('solution')}
              >
                Solution
              </Button>
            </div>

            {activeTab === 'solution' ? (
              <Card className="mb-4">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Solution Code
                    </h3>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <pre className={`p-4 rounded-lg overflow-auto ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                    <code>{problem.solution}</code>
                  </pre>
                  <div className="mt-4">
                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Explanation
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {problem.explanation}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <>
                <Card className="mb-4">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`px-3 py-1 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c++">C++</option>
                      </select>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`w-full h-64 p-4 rounded-lg font-mono text-sm ${isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-300'} border`}
                      placeholder={`// Write your ${language} code here`}
                    />
                  </div>
                </Card>

                <Card className="mb-4">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Test Cases
                      </h3>
                      <Button size="sm" onClick={addTestCase}>
                        Add Test Case
                      </Button>
                    </div>
                    {testCases.map((testCase, index) => (
                      <div key={index} className={`mb-3 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div 
                          className={`p-3 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                          onClick={() => toggleTestCase(index)}
                        >
                          <span>Test Case {index + 1}</span>
                          {testCase.expanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                        {testCase.expanded && (
                          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="mb-2">
                              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Input
                              </label>
                              <input
                                type="text"
                                value={testCase.input}
                                onChange={(e) => {
                                  const newTestCases = [...testCases];
                                  newTestCases[index].input = e.target.value;
                                  setTestCases(newTestCases);
                                }}
                                className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>
                            <div className="mb-2">
                              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Expected Output
                              </label>
                              <input
                                type="text"
                                value={testCase.output}
                                onChange={(e) => {
                                  const newTestCases = [...testCases];
                                  newTestCases[index].output = e.target.value;
                                  setTestCases(newTestCases);
                                }}
                                className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex space-x-3 mb-4">
                  <Button onClick={handleRunCode}>
                    Run Code
                  </Button>
                  <Button variant="primary" onClick={handleSubmitCode}>
                    Submit
                  </Button>
                </div>

                {showConsole && (
                  <Card>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Console
                        </h3>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowConsole(false)}
                        >
                          Hide
                        </Button>
                      </div>
                      <div className={`p-3 rounded-lg font-mono text-sm max-h-40 overflow-y-auto ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                        {consoleOutput.length === 0 ? (
                          <p className="text-gray-500">No output yet</p>
                        ) : (
                          consoleOutput.map((item, index) => (
                            <div 
                              key={index} 
                              className={`flex items-start ${item.type === 'error' ? 'text-red-500' : item.type === 'success' ? 'text-green-500' : ''}`}
                            >
                              {item.type === 'success' ? (
                                <Check className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                              ) : item.type === 'error' ? (
                                <X className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                              ) : (
                                <Code className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                              )}
                              <span>{item.message}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;