import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code, ChevronLeft, Check, X, Copy, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Tabs from '../components/UI/Tabs';
import Editor from '@monaco-editor/react';
import { problems } from '../data/problemData'; // Import problems from problemData.tsx

const ProblemPage = () => {
  const { isDark } = useThemeStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<Array<{type: string, message: string}>>([]);
  const [testCases, setTestCases] = useState([
    { input: '', output: '', result: '', expanded: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Get problem data based on ID from the imported problems object
  const problem = problems[id as keyof typeof problems]; // Type assertion for problem ID

  // Set initial code when problem changes
  useEffect(() => {
    if (problem) {
      setCode(`// ${problem.title}\n// Solution in ${language}\n\n${problem.solution}`);
    }
  }, [problem, language]);

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
    
    // Simulate API call
    setTimeout(() => {
      const newOutput = [...consoleOutput];
      const passed = Math.random() > 0.3; // 70% chance of passing
      
      testCases.forEach((testCase, index) => {
        if (testCase.input && testCase.output) {
          newOutput.push({
            type: passed ? 'success' : 'error',
            message: passed 
              ? `Test case ${index + 1} passed`
              : `Test case ${index + 1} failed`
          });
        }
      });
      
      setConsoleOutput(newOutput);
      setExecutionTime(Math.floor(Math.random() * 100) + 50); // Random time between 50-150ms
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsLoading(true);
    setSubmissionStatus('idle');
    setShowConsole(true);
    setConsoleOutput([{ type: 'info', message: 'Submitting solution...' }]);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      const newOutput = [...consoleOutput];
      
      if (success) {
        newOutput.push({
          type: 'success',
          message: 'All test cases passed!'
        });
        setSubmissionStatus('success');
      } else {
        newOutput.push({
          type: 'error',
          message: 'Some test cases failed'
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
            problem.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : problem.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : problem.difficulty === 'hard'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' // Default if difficulty is not recognized
          }`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)} {/* Capitalize first letter */}
          </span>
          <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Frequency: {problem.frequency}% {/* Add % sign */}
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
                      {problem.relatedProblems.map((related, index) => (
                        <Button 
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/problem/${related.id}`)}
                        >
                          {related.title}
                        </Button>
                      ))}
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
                      theme={isDark ? 'vs-dark' : 'light'}
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
                        theme={isDark ? 'vs-dark' : 'light'}
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
