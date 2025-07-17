import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code, ChevronLeft, Check, X, Copy, ChevronDown, ChevronUp, Loader2, Bookmark, Save, RotateCcw } from 'lucide-react'; // Added Bookmark, Save, RotateCcw icons
import { useThemeStore } from '../stores/themeStore'; // Import the actual useThemeStore

// Card component updated to use external theme
const Card = ({ children, className = '' }) => {
  const { isDark } = useThemeStore();
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} ${className}`}>
      {children}
    </div>
  );
};

// Button component updated to use external theme
const Button = ({ children, size = 'md', variant = 'primary', className = '', ...props }) => {
  const { isDark } = useThemeStore();
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

// Tabs component updated to use external theme
const Tabs = ({ activeTab, onTabChange, tabs, className = '' }) => {
  const { isDark } = useThemeStore();
  return (
    <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : `text-gray-500 hover:text-gray-700 ${isDark ? 'dark:text-gray-400 dark:hover:text-gray-200' : ''}`
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Editor component (mocked)
const Editor = ({ height, language, value, onChange, theme, options }) => (
  <div style={{ height: height, width: '100%' }}>
    {/* Placeholder for Monaco Editor */}
    <textarea
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme === 'vs-dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'vs-dark' ? '#d4d4d4' : '#000000',
        border: '1px solid #ccc',
        borderRadius: '0.5rem',
        padding: '1rem',
        fontFamily: 'monospace',
        fontSize: options.fontSize,
        whiteSpace: options.wordWrap === 'on' ? 'pre-wrap' : 'pre',
        overflow: 'auto',
      }}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      readOnly={options.readOnly}
    />
  </div>
);


const problems = {
  '1': {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: 'easy',
    company: 'google',
    category: 'algorithms',
    tags: ['array', 'hash table'],
    frequency: 95,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'A hash map can be used to store the numbers and their indices.',
      'Iterate through the array, and for each number, check if `target - current_number` exists in the hash map.',
    ],
    solution: `function twoSum(nums, target) {
  const numMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }
  return []; // Should not reach here based on problem constraints
}`,
    explanation: `The Two Sum problem can be efficiently solved using a hash map (or dictionary in Python).

**Algorithm:**
1. Initialize an empty hash map, \`numMap\`, to store numbers and their indices.
2. Iterate through the \`nums\` array with an index \`i\`.
3. For each number \`nums[i]\`, calculate its \`complement\` (i.e., \`target - nums[i]\`).
4. Check if the \`complement\` exists as a key in \`numMap\`.
   - If it does, it means we have found two numbers that sum up to the target. Return the index of the \`complement\` (retrieved from \`numMap\`) and the current index \`i\`.
   - If it does not, add the current number \`nums[i]\` and its index \`i\` to the \`numMap\`.
5. If the loop finishes without finding a solution (which should not happen based on the problem constraints), return an empty array or handle as an error.

**Time Complexity:** O(n) - We iterate through the array once. Hash map operations (insertion and lookup) take average O(1) time.
**Space Complexity:** O(n) - In the worst case, we might store all numbers in the hash map if no two numbers sum up to the target until the very end.`,
  },
  '2': {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    company: 'amazon',
    category: 'algorithms',
    tags: ['string', 'sliding window'],
    frequency: 88,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))', // m is the size of the character set
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.' },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    hints: [
      'Use a sliding window approach.',
      'A hash set can be used to keep track of characters in the current window.',
      'When a repeating character is found, shrink the window from the left.',
    ],
    solution: `function lengthOfLongestSubstring(s) {
  let charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
    explanation: `This problem can be solved using the sliding window technique.

**Algorithm:**
1. Initialize a \`charSet\` (a Set in JavaScript) to store characters in the current window.
2. Initialize \`left\` pointer to 0 and \`maxLength\` to 0.
3. Iterate with a \`right\` pointer from 0 to the end of the string.
4. For each character \`s[right]\`:
   - While \`charSet\` already contains \`s[right]\` (meaning it's a repeating character):
     - Remove \`s[left]\` from \`charSet\`.
     - Increment \`left\` pointer (shrink the window from the left).
   - Add \`s[right]\` to \`charSet\`.
   - Update \`maxLength\` with the maximum of its current value and the current window size (\`right - left + 1\`).
5. Return \`maxLength\`.

**Time Complexity:** O(n) - Both \`left\` and \`right\` pointers traverse the string at most once. Set operations (add, delete, has) take average O(1) time.
**Space Complexity:** O(min(n, m)) - Where 'n' is the string length and 'm' is the size of the character set (e.g., 256 for ASCII characters). In the worst case, all characters in the string are unique, and the set will store up to 'm' characters.`,
  },
  // Add more problems with solution and explanation here
};


const ProblemPage = () => {
  const { isDark } = useThemeStore(); // Use isDark from the external theme store
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<Array<{type: string, message: string}>>([]);
  const [testCases, setTestCases] = useState<Array<{ input: string; output: string; actualOutput?: string; result: '' | 'passed' | 'failed'; expanded: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSolved, setIsSolved] = useState(false); // New state for solved status

  // Get problem data based on ID from the imported problems object
  const problem = problems[id as keyof typeof problems]; // Type assertion for problem ID

  // Set initial code and test cases when problem changes
  useEffect(() => {
    if (problem) {
      // Load saved code from localStorage, or use problem's solution as default
      const savedCode = localStorage.getItem(`problem-${problem.id}-code`);
      setCode(savedCode || `// ${problem.title}\n// Solution in ${language}\n\n${problem.solution}`);

      // Initialize test cases from problem examples
      const initialTestCases = problem.examples.map(ex => ({
        input: ex.input,
        output: ex.output,
        actualOutput: '',
        result: '' as '' | 'passed' | 'failed',
        expanded: false, // Start collapsed
      }));
      setTestCases(initialTestCases.length > 0 ? initialTestCases : [{ input: '', output: '', result: '', expanded: false }]);

      // Load solved status
      const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
      setIsSolved(solvedProblems.includes(problem.id));
    }
  }, [problem, language]); // Re-run when problem or language changes

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
    setIsLoading(true);
    setShowConsole(true);
    setConsoleOutput([{ type: 'info', message: 'Running test cases...' }]);
    setSubmissionStatus('idle'); // Reset submission status on run

    // Simulate API call for code execution
    setTimeout(() => {
      let allPassed = true;
      const updatedTestCases = testCases.map((testCase, index) => {
        // Simulate execution and result
        const simulatedActualOutput = `simulated_output_${index}`; // Replace with actual execution logic
        const passed = Math.random() > 0.3; // 70% chance of passing
        if (!passed) {
          allPassed = false;
        }
        setConsoleOutput(prev => [...prev, {
          type: passed ? 'success' : 'error',
          message: passed
            ? `Test case ${index + 1} passed.`
            : `Test case ${index + 1} failed. Input: ${testCase.input}, Expected: ${testCase.output}, Got: ${simulatedActualOutput}`
        }]);
        return {
          ...testCase,
          actualOutput: simulatedActualOutput,
          result: passed ? 'passed' : 'failed',
        };
      });

      setTestCases(updatedTestCases);
      setExecutionTime(Math.floor(Math.random() * 100) + 50); // Random time between 50-150ms
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsLoading(true);
    setSubmissionStatus('idle');
    setShowConsole(true);
    setConsoleOutput([{ type: 'info', message: 'Submitting solution...' }]);

    // Simulate API call for submission
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      const newOutput = [...consoleOutput];

      if (success) {
        newOutput.push({
          type: 'success',
          message: 'All test cases passed! Solution accepted.'
        });
        setSubmissionStatus('success');
        handleMarkSolved(true); // Automatically mark as solved on successful submission
      } else {
        newOutput.push({
          type: 'error',
          message: 'Some test cases failed. Please review your code.'
        });
        setSubmissionStatus('error');
      }

      setConsoleOutput(newOutput);
      setIsLoading(false);
    }, 2000);
  };

  const toggleTestCase = (index: number) => {
    const newTestCases = [...testCases];
    newTestCases[index].expanded = !newTestCases[index].expanded;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '', result: '', expanded: true }]);
  };

  const removeTestCase = (index: number) => {
    if (testCases.length > 1) {
      const newTestCases = [...testCases];
      newTestCases.splice(index, 1);
      setTestCases(newTestCases);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const handleMarkSolved = (solved: boolean) => {
    setIsSolved(solved);
    const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
    if (solved && !solvedProblems.includes(problem.id)) {
      localStorage.setItem('solvedProblems', JSON.stringify([...solvedProblems, problem.id]));
    } else if (!solved && solvedProblems.includes(problem.id)) {
      localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems.filter((id: string) => id !== problem.id)));
    }
  };

  const handleSaveCode = () => {
    localStorage.setItem(`problem-${problem.id}-code`, code);
    setConsoleOutput(prev => [...prev, { type: 'info', message: 'Code saved to local storage.' }]);
  };

  const handleResetCode = () => {
    setCode(`// ${problem.title}\n// Solution in ${language}\n\n${problem.solution}`);
    setConsoleOutput(prev => [...prev, { type: 'info', message: 'Code reset to default solution.' }]);
    localStorage.removeItem(`problem-${problem.id}-code`); // Clear saved code
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button and problem info */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
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
              problem.difficulty === 'easy'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : problem.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : problem.difficulty === 'hard'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
            <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Frequency: {problem.frequency}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleMarkSolved(!isSolved)}
              variant={isSolved ? 'primary' : 'outline'}
              size="sm"
            >
              <Bookmark className="w-4 h-4 mr-1" />
              {isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
            </Button>
            <Button
              onClick={handleSaveCode}
              variant="outline"
              size="sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Save Code
            </Button>
            <Button
              onClick={handleResetCode}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Code
            </Button>
          </div>
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

                {problem.examples && problem.examples.length > 0 && (
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
                  <div className="mb-6">
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

                {problem.hints && problem.hints.length > 0 && (
                  <div className="mb-6">
                    <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Hints
                    </h2>
                    <ol className={`list-decimal pl-5 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {problem.hints.map((hint, index) => (
                        <li key={index}>{hint}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {problem.relatedProblems && problem.relatedProblems.length > 0 && (
                  <div>
                    <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Related Problems
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/problem/${problem.relatedProblems[0].id}`)} // Example, adjust as needed
                      >
                        {problem.relatedProblems[0].title}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Code editor and console area */}
          <div className={`lg:w-1/2 ${activeTab === 'solution' ? 'block' : 'hidden lg:block'}`}>
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={[
                { id: 'problem', label: 'Problem' },
                { id: 'solution', label: 'Solution' }
              ]}
              className="mb-4"
            />

            {activeTab === 'solution' ? (
              <Card className="mb-4">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Solution Code
                    </h3>
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <Editor
                      height="300px"
                      language={language}
                      value={problem.solution}
                      theme={isDark ? 'vs-dark' : 'light'} // Apply theme based on isDark
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        wordWrap: 'on',
                      }}
                    />
                  </div>
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
                      <Button size="sm" variant="outline" onClick={copyToClipboard}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Editor
                        height="400px"
                        language={language}
                        value={code}
                        onChange={handleEditorChange}
                        theme={isDark ? 'vs-dark' : 'light'} // Apply theme based on isDark
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          wordWrap: 'on',
                        }}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="mb-4">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Test Cases
                      </h3>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={addTestCase}>
                          Add Test Case
                        </Button>
                      </div>
                    </div>
                    {testCases.map((testCase, index) => (
                      <div key={index} className={`mb-3 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div
                          className={`p-3 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                          onClick={() => toggleTestCase(index)}
                        >
                          <div className="flex items-center">
                            <span>Test Case {index + 1}</span>
                            {testCase.result && (
                              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                testCase.result === 'passed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {testCase.result}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center">
                            {testCases.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTestCase(index);
                                }}
                                className="mr-2 text-gray-500 hover:text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            {testCase.expanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
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
                                placeholder="Enter input (e.g., [2,7,11,15], 9)"
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
                                placeholder="Enter expected output (e.g., [0,1])"
                              />
                            </div>
                            {testCase.actualOutput && (
                              <div className="mb-2">
                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Actual Output
                                </label>
                                <input
                                  type="text"
                                  value={testCase.actualOutput}
                                  readOnly
                                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex space-x-3 mb-4">
                  <Button
                    onClick={handleRunCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      'Run Code'
                    )}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>

                {showConsole && (
                  <Card>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Console
                        </h3>
                        <div className="flex items-center gap-3">
                          {executionTime && (
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Time: {executionTime}ms
                            </span>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowConsole(false)}
                          >
                            Hide
                          </Button>
                        </div>
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

                {submissionStatus !== 'idle' && (
                  <Card className={`mt-4 border-l-4 ${
                    submissionStatus === 'success'
                      ? 'border-green-500 dark:border-green-600'
                      : 'border-red-500 dark:border-red-600'
                  }`}>
                    <div className="p-4">
                      <div className="flex items-center">
                        {submissionStatus === 'success' ? (
                          <>
                            <Check className="w-6 h-6 text-green-500 mr-2" />
                            <h3 className="text-green-700 dark:text-green-400 font-medium">
                              Submission Accepted
                            </h3>
                          </>
                        ) : (
                          <>
                            <X className="w-6 h-6 text-red-500 mr-2" />
                            <h3 className="text-red-700 dark:text-red-400 font-medium">
                              Submission Failed
                            </h3>
                          </>
                        )}
                      </div>
                      <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {submissionStatus === 'success'
                          ? 'Your solution passed all test cases!'
                          : 'Some test cases did not pass. Try again!'}
                      </p>
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
