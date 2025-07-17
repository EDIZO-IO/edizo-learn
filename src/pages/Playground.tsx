import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Share, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore'; // Import the actual useThemeStore

// --- Mock toast (react-hot-toast) ---
const toast = {
  success: (message) => console.log('Toast Success:', message),
  error: (message) => console.error('Toast Error:', message),
};

// --- Mock CodeEditor Component ---
const CodeEditor = ({ language, initialCode, height, onChange }) => {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e) => {
    setCode(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Updated to support more languages
  const getLanguageClass = (lang: string): string => {
    switch (lang.toLowerCase()) {
      case 'html':
        return 'language-html';
      case 'css':
        return 'language-css';
      case 'javascript':
      case 'js':
        return 'language-javascript';
      case 'typescript':
      case 'ts':
        return 'language-typescript';
      case 'react':
      case 'jsx':
        return 'language-jsx';
      case 'python':
      case 'py':
        return 'language-python';
      case 'json':
        return 'language-json';
      default:
        return ''; // fallback (could return 'language-text' if desired)
    }
  };

  return (
    <textarea
      className={`w-full p-4 rounded-md font-mono text-sm bg-gray-800 text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${getLanguageClass(language)}`}
      style={{ height: height, minHeight: '300px' }}
      value={code}
      onChange={handleChange}
      spellCheck="false"
      autoCapitalize="off"
      autoCorrect="off"
      data-language={language}
    />
  );
};

// --- Mock Card Component ---
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

// --- Mock Button Component ---
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

// --- Programming Challenge Interface ---
interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  starterCode: {
    html: string;
    css: string;
    js: string;
  };
}

// --- Main Playground Component ---
const App = () => {
  const { isDark, toggleTheme } = useThemeStore(); // Use isDark and toggleTheme from the external theme store
  const [activeTab, setActiveTab] = useState('javascript');
  const [output, setOutput] = useState('');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="font-sans antialiased bg-gray-100 p-4">
    <div id="app" class="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to the Playground!</h1>
        <p class="text-gray-600 mb-6">Start coding and see the magic happen.</p>
        <!-- JavaScript will append a button and a message div here -->
    </div>
</body>
</html>`);
  
  const [cssCode, setCssCode] = useState(`body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

#app {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

p {
    color: #666;
    line-height: 1.6;
    text-align: center;
}

#message-display {
    margin-top: 20px;
    font-size: 1.2em;
    color: #28a745;
    font-weight: bold;
}
`);

  const [jsCode, setJsCode] = useState(`// Welcome to the JavaScript Playground!
// Try out some code below

function greetUser(name) {
    return \`Hello, \${name}! Welcome to Learn with Edizo!\`;
}

document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    
    const button = document.createElement('button');
    button.textContent = 'Click me!';
    button.style.cssText = \`
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    \`;
    button.onmouseover = () => button.style.transform = 'translateY(-2px)';
    button.onmouseout = () => button.style.transform = 'translateY(0)';

    const messageDiv = document.createElement('div');
    messageDiv.id = 'message-display';
    messageDiv.style.cssText = \`
        font-size: 18px;
        color: #4CAF50;
        font-weight: bold;
        text-align: center;
    \`;
    
    button.addEventListener('click', function() {
        messageDiv.textContent = greetUser('Awesome Developer');
    });
    
    app.appendChild(button);
    app.appendChild(messageDiv);
});`);

  const programmingChallenges: Challenge[] = [
    // JavaScript Challenges (6)
    {
  id: 'js-1',
  title: 'FizzBuzz',
  description:
    'Write a program that prints numbers from 1 to 100. For multiples of 3, print "Fizz" instead of the number. For multiples of 5, print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FizzBuzz</title>
</head>
<body>
  <h1>FizzBuzz Output</h1>
  <pre id="output"></pre>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  padding: 2rem;
  background-color: #f9f9f9;
  color: #333;
}
h1 {
  font-size: 1.5rem;
}
#output {
  white-space: pre-wrap;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  max-width: 600px;
}`,

    js: `const outputDiv = document.getElementById('output');
let result = '';

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    result += 'FizzBuzz\\n';
  } else if (i % 3 === 0) {
    result += 'Fizz\\n';
  } else if (i % 5 === 0) {
    result += 'Buzz\\n';
  } else {
    result += i + '\\n';
  }
}

outputDiv.textContent = result;`
  }
},
    {
  id: 'js-2',
  title: 'Palindrome Checker',
  description: 'Write a JavaScript function that checks if a given string is a palindrome (reads the same forwards and backward).',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Palindrome Checker</title>
</head>
<body>
  <input type="text" id="textInput" placeholder="Enter a string">
  <button id="checkButton">Check</button>
  <p id="result"></p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
}
input {
  padding: 8px;
  font-size: 1rem;
}
button {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
}`,

    js: `function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}

document.getElementById('checkButton').addEventListener('click', () => {
  const text = document.getElementById('textInput').value;
  const resultP = document.getElementById('result');

  if (text.trim() === '') {
    resultP.textContent = 'Please enter a word or sentence.';
    resultP.style.color = 'orange';
    return;
  }

  if (isPalindrome(text)) {
    resultP.textContent = \`"\${text}" is a palindrome!\`;
    resultP.style.color = 'green';
  } else {
    resultP.textContent = \`"\${text}" is NOT a palindrome.\`;
    resultP.style.color = 'red';
  }
});`
  }
},
   {
  id: 'js-3',
  title: 'Array Sum and Average',
  description: 'Write a JavaScript function that takes an array of numbers and returns an object containing their sum and average.',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Array Stats</title>
</head>
<body>
  <p>Numbers: [10, 20, 30, 40, 50]</p>
  <button id="calculateButton">Calculate Stats</button>
  <p id="sumResult"></p>
  <p id="avgResult"></p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
}
button {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
}`,

    js: `function getArrayStats(arr) {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  const average = sum / arr.length;
  return { sum, average };
}

document.getElementById('calculateButton').addEventListener('click', () => {
  const numbers = [10, 20, 30, 40, 50];
  const stats = getArrayStats(numbers);
  document.getElementById('sumResult').textContent = \`Sum: \${stats.sum}\`;
  document.getElementById('avgResult').textContent = \`Average: \${stats.average}\`;
});`
  }
},
{
  id: 'js-4',
  title: 'Factorial Calculator',
  description: 'Implement a JavaScript function to calculate the factorial of a non-negative integer.',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Factorial</title>
</head>
<body>
  <input type="number" id="numInput" value="5" min="0" />
  <button id="calculateButton">Calculate Factorial</button>
  <p id="result"></p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
}
input, button {
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 4px;
}`,

    js: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

document.getElementById('calculateButton').addEventListener('click', () => {
  const num = parseInt(document.getElementById('numInput').value);
  const resultEl = document.getElementById('result');

  if (!isNaN(num) && num >= 0) {
    const result = factorial(num);
    resultEl.textContent = \`Factorial of \${num} is \${result}\`;
    resultEl.style.color = 'green';
  } else {
    resultEl.textContent = 'Please enter a non-negative number.';
    resultEl.style.color = 'red';
  }
});`
  }
},
{
  id: 'js-5',
  title: 'Fibonacci Sequence Generator',
  description: 'Write a JavaScript function that generates the first N numbers of the Fibonacci sequence.',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fibonacci</title>
</head>
<body>
  <input type="number" id="countInput" value="10" min="1" />
  <button id="generateButton">Generate Fibonacci</button>
  <p id="result"></p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
}
input, button {
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 4px;
}`,

    js: `function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

document.getElementById('generateButton').addEventListener('click', () => {
  const count = parseInt(document.getElementById('countInput').value);
  const resultEl = document.getElementById('result');

  if (!isNaN(count) && count > 0) {
    const sequence = generateFibonacci(count);
    resultEl.textContent = \`Fibonacci sequence (first \${count} numbers): \${sequence.join(', ')}\`;
    resultEl.style.color = 'green';
  } else {
    resultEl.textContent = 'Please enter a positive number.';
    resultEl.style.color = 'red';
  }
});`
  }
},
{
  id: 'js-6',
  title: 'Reverse a String',
  description: 'Create a JavaScript function that reverses a given string without using the built-in `reverse()` method for arrays.',
  category: 'javascript',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reverse String</title>
</head>
<body>
  <input type="text" id="textInput" placeholder="Enter a string" />
  <button id="reverseButton">Reverse</button>
  <p id="result"></p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
}
input, button {
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 4px;
}`,

    js: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

document.getElementById('reverseButton').addEventListener('click', () => {
  const text = document.getElementById('textInput').value;
  const resultEl = document.getElementById('result');

  if (text.trim() === '') {
    resultEl.textContent = 'Please enter a string.';
    resultEl.style.color = 'orange';
    return;
  }

  resultEl.textContent = \`Reversed: \${reverseString(text)}\`;
  resultEl.style.color = 'green';
});`
  }
},

    // React Challenges (6)
{
  id: 'react-1',
  title: 'Simple Counter',
  description: 'Create a React component that displays a number and has two buttons: "Increment" and "Decrement". Clicking the buttons should change the displayed number.',
  category: 'react',
  starterCode: {
    html: `<!-- No specific HTML needed, React will render into #root -->`,

    css: `/* Tailwind CSS is included in the React environment */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,

    js: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">Count: {count}</h2>
      <div className="flex gap-4">
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;`
  }
},
{
  id: 'react-2',
  title: 'Toggle Visibility',
  description: 'Build a React component with a button that toggles the visibility of a paragraph of text. Initially, the text should be visible.',
  category: 'react',
  starterCode: {
    html: `<!-- No specific HTML needed, React will render into #root -->`,

    css: `/* Tailwind CSS is included in the React environment */`,

    js: `import React, { useState } from 'react';

const ToggleText = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <button 
        onClick={toggle} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
      >
        {isVisible ? 'Hide Text' : 'Show Text'}
      </button>

      {isVisible && (
        <p className="text-lg text-gray-700">
          This is the text to toggle!
        </p>
      )}
    </div>
  );
};

export default ToggleText;`
  }
},
{
  id: 'react-3',
  title: 'Basic Todo List',
  description: 'Create a simple React Todo List application where users can add new tasks and mark existing tasks as complete.',
  category: 'react',
  starterCode: {
    html: `<!-- No specific HTML needed, React will render into #root -->`,

    css: `/* Tailwind CSS is included in the React environment */`,

    js: `import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border-b last:border-b-0"
          >
            <span
              onClick={() => toggleComplete(todo.id)}
              className={\`text-lg cursor-pointer \${todo.completed ? 'line-through text-gray-400' : ''}\`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`
  }
},
    {
      id: 'react-4',
      title: 'Display List from Array',
      description: 'Create a React component that takes an array of strings as a prop and renders them as an unordered list.',
      category: 'react',
      starterCode: {
        html: `<!-- No specific HTML needed, React will render into #root -->`,
        css: `/* Tailwind CSS is included in the React environment */`,
        js: `import React from 'react';

const MyList = ({ items }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Items:</h2>
      <ul>
        {/* Map over the 'items' prop and render list items */}
        {items.map((item, index) => (
          <li key={index} className="text-lg mb-2 p-2 bg-gray-100 rounded-md">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example Usage (for demonstration, normally passed as prop from parent)
const AppWrapper = () => {
  const data = ["Apple", "Banana", "Cherry", "Date"];
  return <MyList items={data} />;
};

export default AppWrapper;`
      }
    },
    {
      id: 'react-5',
      title: 'Form Input Handler',
      description: 'Build a React component with a controlled input field. As the user types, display the current input value below the field.',
      category: 'react',
      starterCode: {
        html: `<!-- No specific HTML needed, React will render into #root -->`,
        css: `/* Tailwind CSS is included in the React environment */`,
        js: `import React, { useState } from 'react';

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    // Your code here
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
      <label htmlFor="myInput" className="text-lg font-semibold">Type something:</label>
      <input
        type="text"
        id="myInput"
        className="border border-gray-300 p-2 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      <p className="text-xl mt-4">Current Value: <span className="font-bold">{inputValue}</span></p>
    </div>
  );
};

export default ControlledInput;`
      }
    },
    {
      id: 'react-6',
      title: 'Fetch Data (Mock API)',
      description: 'Create a React component that fetches data from a mock API endpoint (e.g., JSONPlaceholder) and displays it. Use `useEffect` for fetching.',
      category: 'react',
      starterCode: {
        html: `<!-- No specific HTML needed, React will render into #root -->`,
        css: `/* Tailwind CSS is included in the React environment */`,
        js: `import React, { useState, useEffect } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Your code here to fetch data
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-8">Loading data...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Fetched Data:</h2>
      {data && (
        <div>
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <p className="text-gray-700">{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;`
      }
    },

    // Python Challenges (6)
{
  id: 'python-1',
  title: 'Prime Number Checker',
  description: 'Write a Python function that checks if a given number is prime.',
  category: 'python',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prime Checker</title>
</head>
<body>
  <p>Check the console for output.</p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  padding: 2rem;
  text-align: center;
}`,

    js: `// This is a Python challenge rendered in a JavaScript-based playground.
// You may imagine the following as Python syntax in a real Python environment.

/*
def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

# Example usage:
print(is_prime(7))   # True
print(is_prime(10))  # False
*/

// To demo in JS environment:
function isPrimeJS(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log("Is 7 prime?", isPrimeJS(7));    // true
console.log("Is 10 prime?", isPrimeJS(10));  // false
`
  }
},
{
  id: 'python-2',
  title: 'List Reverser',
  description: 'Write a Python function that reverses a list without using built-in `reverse()` or `[::-1]` slicing.',
  category: 'python',
  starterCode: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>List Reverser</title>
</head>
<body>
  <p>Open the browser console to see the output.</p>
</body>
</html>`,

    css: `body {
  font-family: sans-serif;
  padding: 2rem;
  text-align: center;
}`,

    js: `// Simulated Python logic shown in JS-friendly format.
/*
def reverse_list(input_list):
    # Create a new list and append items from the end
    reversed_list = []
    for i in range(len(input_list) - 1, -1, -1):
        reversed_list.append(input_list[i])
    return reversed_list

# Example usage:
my_list = [1, 2, 3, 4, 5]
print(reverse_list(my_list))  # Output: [5, 4, 3, 2, 1]
*/

// JavaScript version for demo:
function reverseListJS(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

console.log("Reversed [1, 2, 3, 4, 5]:", reverseListJS([1, 2, 3, 4, 5]));
`
  }
},
    {
      id: 'python-3',
      title: 'Count Vowels',
      description: 'Write a Python function that counts the number of vowels (a, e, i, o, u, case-insensitive) in a given string.',
      category: 'python',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Count Vowels</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `// Imagine this is a Python interpreter.
/*
def count_vowels(s):
    # Your Python code here
    vowels = "aeiouAEIOU"
    count = 0
    for char in s:
        if char in vowels:
            count += 1
    return count

# print(count_vowels("Hello World")) # Expected: 3
*/

// For demonstration in JS environment:
function countVowelsJS(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}
console.log("Vowels in 'Hello World':", countVowelsJS("Hello World"));
`
      }
    },
    {
      id: 'python-4',
      title: 'Simple Calculator',
      description: 'Create a Python function that takes two numbers and an operator (+, -, *, /) and returns the result of the operation.',
      category: 'python',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Calculator</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `// Imagine this is a Python interpreter.
/*
def calculate(num1, num2, operator):
    # Your Python code here
    if operator == '+':
        return num1 + num2
    elif operator == '-':
        return num1 - num2
    elif operator == '*':
        return num1 * num2
    elif operator == '/':
        if num2 != 0:
            return num1 / num2
        else:
            return "Error: Division by zero"
    else:
        return "Error: Invalid operator"

# print(calculate(10, 5, '+')) # Expected: 15
# print(calculate(10, 0, '/')) # Expected: Error: Division by zero
*/

// For demonstration in JS environment:
function calculateJS(num1, num2, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : "Error: Division by zero";
        default: return "Error: Invalid operator";
    }
}
console.log("10 + 5 =", calculateJS(10, 5, '+'));
console.log("10 / 0 =", calculateJS(10, 0, '/'));
`
      }
    },
    {
      id: 'python-5',
      title: 'File I/O Simulation',
      description: 'Simulate writing and reading text from a file in Python. (Since this is a browser environment, we\'ll use console logs to simulate file operations).',
      category: 'python',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File I/O Simulation</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `// Imagine this is a Python interpreter.
// We'll simulate file operations using a global variable for content.
let simulated_file_content = "";

/*
def write_to_file(filename, content):
    global simulated_file_content
    print(f"Simulating writing to {filename}...")
    simulated_file_content = content
    print("Content written.")

def read_from_file(filename):
    global simulated_file_content
    print(f"Simulating reading from {filename}...")
    return simulated_file_content

# write_to_file("my_data.txt", "Hello, Python file I/O!")
# read_data = read_from_file("my_data.txt")
# print(f"Read from file: {read_data}")
*/

// For demonstration in JS environment:
let simulatedFileContentJS = "";
function writeToFileJS(filename, content) {
    console.log(\`Simulating writing to \${filename}...\`);
    simulatedFileContentJS = content;
    console.log("Content written.");
}

function readFromFileJS(filename) {
    console.log(\`Simulating reading from \${filename}...\`);
    return simulatedFileContentJS;
}

writeToFileJS("my_data.txt", "Hello, JavaScript file I/O simulation!");
let readDataJS = readFromFileJS("my_data.txt");
console.log(\`Read from file: \${readDataJS}\`);
`
      }
    },
    {
      id: 'python-6',
      title: 'Factorial (Recursive)',
      description: 'Implement a recursive Python function to calculate the factorial of a non-negative integer.',
      category: 'python',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recursive Factorial</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `// Imagine this is a Python interpreter.
/*
def factorial_recursive(n):
    # Your Python code here
    if n == 0:
        return 1
    else:
        return n * factorial_recursive(n - 1)

# print(factorial_recursive(5)) # Expected: 120
*/

// For demonstration in JS environment:
function factorialRecursiveJS(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorialRecursiveJS(n - 1);
    }
}
console.log("Factorial of 5 (recursive):", factorialRecursiveJS(5));
`
      }
    },

    // Data Structures Challenges (6)
    {
      id: 'dsa-1',
      title: 'Implement a Stack (Array-based)',
      description: 'Implement a basic Stack data structure using a JavaScript array. Include `push`, `pop`, `peek`, and `isEmpty` methods.',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Array Stack</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        // Your code here
        this.items.push(element);
    }

    pop() {
        // Your code here
        if (this.items.length === 0) return "Underflow";
        return this.items.pop();
    }

    peek() {
        // Your code here
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        // Your code here
        return this.items.length === 0;
    }
}

const stack = new Stack();
console.log("Stack is empty?", stack.isEmpty()); // Expected: true
stack.push(10);
stack.push(20);
console.log("Stack top:", stack.peek()); // Expected: 20
stack.pop();
console.log("Stack top after pop:", stack.peek()); // Expected: 10
`
      }
    },
    {
      id: 'dsa-2',
      title: 'Implement a Queue (Array-based)',
      description: 'Implement a basic Queue data structure using a JavaScript array. Include `enqueue`, `dequeue`, `front`, and `isEmpty` methods.',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Array Queue</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        // Your code here
        this.items.push(element);
    }

    dequeue() {
        // Your code here
        if (this.items.length === 0) return "Underflow";
        return this.items.shift(); // Note: shift() can be inefficient for large arrays
    }

    front() {
        // Your code here
        if (this.items.length === 0) return null;
        return this.items[0];
    }

    isEmpty() {
        // Your code here
        return this.items.length === 0;
    }
}

const queue = new Queue();
console.log("Queue is empty?", queue.isEmpty()); // Expected: true
queue.enqueue(10);
queue.enqueue(20);
console.log("Queue front:", queue.front()); // Expected: 10
queue.dequeue();
console.log("Queue front after dequeue:", queue.front()); // Expected: 20
`
      }
    },
    {
      id: 'dsa-3',
      title: 'Basic Linked List Node',
      description: 'Define a `Node` class for a singly linked list in JavaScript. Each node should have `data` and a `next` pointer.',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linked List Node</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class Node {
    constructor(data) {
        // Your code here
        this.data = data;
        this.next = null;
    }
}

// Example Usage
const node1 = new Node(10);
const node2 = new Node(20);
node1.next = node2;

console.log("Node 1 data:", node1.data); // Expected: 10
console.log("Node 1's next node data:", node1.next.data); // Expected: 20
`
      }
    },
    {
      id: 'dsa-4',
      title: 'Binary Tree Node',
      description: 'Define a `TreeNode` class for a binary tree in JavaScript. Each node should have `value`, `left` child, and `right` child.',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binary Tree Node</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class TreeNode {
    constructor(value) {
        // Your code here
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Example Usage
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);

console.log("Root value:", root.value); // Expected: 10
console.log("Left child value:", root.left.value); // Expected: 5
console.log("Right child value:", root.right.value); // Expected: 15
`
      }
    },
    {
      id: 'dsa-5',
      title: 'Simple Hash Map (Object-based)',
      description: 'Implement a basic Hash Map (or Dictionary) using a JavaScript object. Include `set` and `get` methods.',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Hash Map</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class HashMap {
    constructor() {
        this.map = {}; // Use a plain JavaScript object for storage
    }

    set(key, value) {
        // Your code here
        this.map[key] = value;
    }

    get(key) {
        // Your code here
        return this.map[key];
    }
}

const myMap = new HashMap();
myMap.set('name', 'Alice');
myMap.set('age', 30);

console.log("Name:", myMap.get('name')); // Expected: Alice
console.log("Age:", myMap.get('age')); // Expected: 30
console.log("City (not set):", myMap.get('city')); // Expected: undefined
`
      }
    },
    {
      id: 'dsa-6',
      title: 'Graph Node/Edge Representation',
      description: 'Represent a simple unweighted, undirected graph using an adjacency list (JavaScript object where keys are nodes and values are arrays of connected nodes).',
      category: 'dsa',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graph Representation</title>
</head>
<body>
    <p>Open the browser console to see the output.</p>
</body>
</html>`,
        css: `body { font-family: sans-serif; }`,
        js: `class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        // Your code here
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        // Your code here
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

console.log("Graph Adjacency List:", graph.adjacencyList);
// Expected: { A: ['B'], B: ['A', 'C'], C: ['B'] }
`
      }
    },

    // Algorithms Challenges (6)
    {
      id: 'algo-1',
      title: 'Bubble Sort',
      description: 'Implement the Bubble Sort algorithm to sort an array of numbers in ascending order.',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubble Sort</title>
</head>
<body>
    <p>Original Array: [64, 34, 25, 12, 22, 11, 90]</p>
    <button id="sortButton">Sort Array</button>
    <p id="result"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function bubbleSort(arr) {
    // Your code here
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
            }
        }
    }
    return arr;
}

document.getElementById('sortButton').addEventListener('click', () => {
    const numbers = [64, 34, 25, 12, 22, 11, 90];
    const sortedNumbers = bubbleSort([...numbers]); // Use a copy to avoid modifying original
    document.getElementById('result').textContent = \`Sorted Array: \${sortedNumbers.join(', ')}\`;
});`
      }
    },
    {
      id: 'algo-2',
      title: 'Linear Search',
      description: 'Implement the Linear Search algorithm to find an element in an array. Return the index if found, otherwise -1.',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Search</title>
</head>
<body>
    <p>Array: [10, 20, 80, 30, 60, 50, 110, 100, 130, 170]</p>
    <input type="number" id="searchInput" value="30" placeholder="Number to search">
    <button id="searchButton">Search</button>
    <p id="result"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function linearSearch(arr, target) {
    // Your code here
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const numbers = [10, 20, 80, 30, 60, 50, 110, 100, 130, 170];
    const target = parseInt(document.getElementById('searchInput').value);
    const index = linearSearch(numbers, target);
    if (index !== -1) {
        document.getElementById('result').textContent = \`\${target} found at index \${index}\`;
        document.getElementById('result').style.color = 'green';
    } else {
        document.getElementById('result').textContent = \`\${target} not found in the array\`;
        document.getElementById('result').style.color = 'red';
    }
});`
      }
    },
    {
      id: 'algo-3',
      title: 'Factorial (Iterative)',
      description: 'Implement an iterative function to calculate the factorial of a non-negative integer.',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iterative Factorial</title>
</head>
<body>
    <input type="number" id="numInput" value="5" min="0">
    <button id="calculateButton">Calculate Factorial</button>
    <p id="result"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function factorialIterative(n) {
    // Your code here
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

document.getElementById('calculateButton').addEventListener('click', () => {
    const num = parseInt(document.getElementById('numInput').value);
    if (num >= 0) {
        document.getElementById('result').textContent = \`Factorial of \${num} is \${factorialIterative(num)}\`;
    } else {
        document.getElementById('result').textContent = 'Please enter a non-negative number.';
    }
});`
      }
    },
    {
      id: 'algo-4',
      title: 'Find Max/Min in Array',
      description: 'Write a JavaScript function that finds the maximum and minimum values in an array of numbers.',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Max/Min Array</title>
</head>
<body>
    <p>Numbers: [3, 1, 4, 1, 5, 9, 2, 6]</p>
    <button id="findButton">Find Max/Min</button>
    <p id="maxResult"></p>
    <p id="minResult"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function findMaxMin(arr) {
    // Your code here
    if (arr.length === 0) return { max: undefined, min: undefined };
    let max = arr[0];
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }
    return { max, min };
}

document.getElementById('findButton').addEventListener('click', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    const { max, min } = findMaxMin(numbers);
    document.getElementById('maxResult').textContent = \`Maximum: \${max}\`;
    document.getElementById('minResult').textContent = \`Minimum: \${min}\`;
});`
      }
    },
    {
      id: 'algo-5',
      title: 'Sum of N Numbers',
      description: 'Write a JavaScript function that calculates the sum of the first N natural numbers.',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sum of N</title>
</head>
<body>
    <input type="number" id="nInput" value="10" min="1">
    <button id="calculateButton">Calculate Sum</button>
    <p id="result"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function sumOfN(n) {
    // Your code here (iterative or formula)
    // Example iterative:
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
    // Example formula: return n * (n + 1) / 2;
}

document.getElementById('calculateButton').addEventListener('click', () => {
    const n = parseInt(document.getElementById('nInput').value);
    if (n > 0) {
        document.getElementById('result').textContent = \`Sum of first \${n} numbers: \${sumOfN(n)}\`;
    } else {
        document.getElementById('result').textContent = 'Please enter a positive number.';
    }
});`
      }
    },
    {
      id: 'algo-6',
      title: 'Check Anagrams',
      description: 'Write a JavaScript function that determines if two strings are anagrams of each other (contain the same characters, just in a different order).',
      category: 'algorithms',
      starterCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anagram Checker</title>
</head>
<body>
    <input type="text" id="string1" value="listen" placeholder="String 1">
    <input type="text" id="string2" value="silent" placeholder="String 2">
    <button id="checkButton">Check Anagrams</button>
    <p id="result"></p>
</body>
</html>`,
        css: `body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; gap: 10px; }`,
        js: `function areAnagrams(str1, str2) {
    // Your code here
    const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanStr1.length !== cleanStr2.length) return false;
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');
    return sortedStr1 === sortedStr2;
}

document.getElementById('checkButton').addEventListener('click', () => {
    const s1 = document.getElementById('string1').value;
    const s2 = document.getElementById('string2').value;
    const resultP = document.getElementById('result');
    if (areAnagrams(s1, s2)) {
        resultP.textContent = \`"\${s1}" and "\${s2}" ARE anagrams!\`;
        resultP.style.color = 'green';
    } else {
        resultP.textContent = \`"\${s1}" and "\${s2}" are NOT anagrams.\`;
        resultP.style.color = 'red';
    }
});`
      }
    },
  ];

  // Ref for the code editor area
  const codeEditorRef = useRef(null);

  const loadChallenge = (challenge: Challenge) => {
    setHtmlCode(challenge.starterCode.html);
    setCssCode(challenge.starterCode.css);
    setJsCode(challenge.starterCode.js);
    setActiveTab('javascript'); // Default to JS tab after loading
    setOutput(''); // Clear previous output
    toast.success(`Loaded challenge: ${challenge.title}`);

    // Scroll to the code editor area
    if (codeEditorRef.current) {
      codeEditorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const runCode = () => {
    try {
      const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';
      const interFontLink = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">';

      const combinedCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Output</title>
          ${tailwindScript}
          ${interFontLink}
          <style>
            body { font-family: 'Inter', sans-serif; }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode.replace(/<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>/g, '')}
          <script>${jsCode}</script>
        </body>
        </html>
      `;
      setOutput(combinedCode);
      toast.success('Code executed successfully!');
    } catch (error) {
      console.error("Error running code:", error);
      toast.error('Error running code. Check console for details.');
    }
  };

  const saveProject = () => {
    const project = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('playground-project', JSON.stringify(project));
    toast.success('Project saved locally!');
  };

  const shareProject = () => {
    const project = {
      html: htmlCode,
      css: cssCode,
      js: jsCode
    };
    const encoded = btoa(JSON.stringify(project));
    const url = `${window.location.origin}/playground?project=${encoded}`;
    
    const tempInput = document.createElement('textarea');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      toast.success('Share link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link to clipboard.');
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(tempInput);
  };

  const tabs = [
    { id: 'html', label: 'HTML', code: htmlCode, setter: setHtmlCode },
    { id: 'css', label: 'CSS', code: cssCode, setter: setCssCode },
    { id: 'javascript', label: 'JavaScript', code: jsCode, setter: setJsCode }
  ];

  const challengeCategories = Array.from(new Set(programmingChallenges.map(c => c.category)));

  return (
    <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Code Playground
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Experiment with HTML, CSS, and JavaScript in real-time
            </p>
          </div>
          <Button onClick={toggleTheme} variant="outline" className="ml-4">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <Button onClick={runCode} className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
          <Button onClick={saveProject} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
          <Button onClick={shareProject} variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </motion.div>

        <div ref={codeEditorRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Added ref here */}
          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-0 overflow-hidden">
              {/* Tab Navigation */}
              <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? isDark
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                        : isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Editor */}
              <div className="p-4">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={activeTab === tab.id ? 'block' : 'hidden'}
                  >
                    <CodeEditor
                      language={tab.id}
                      initialCode={tab.code}
                      height="500px"
                      onChange={tab.setter}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-0 overflow-hidden h-full">
              <div className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`text-sm font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Output
                </h3>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="h-[500px] bg-white">
                {output ? (
                  <iframe
                    srcDoc={output}
                    className="w-full h-full border-0"
                    title="Code Output"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Run Code" to see your output here</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Programming Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className={`text-2xl font-semibold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Programming Challenges
          </h2>
          {challengeCategories.map(category => (
            <div key={category} className="mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Challenges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programmingChallenges.filter(c => c.category === category).map((challenge) => (
                  <Card key={challenge.id} className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {challenge.title}
                      </h4>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {challenge.description}
                      </p>
                    </div>
                    <Button onClick={() => loadChallenge(challenge)} size="sm" className="w-full mt-4">
                      Load Challenge
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
