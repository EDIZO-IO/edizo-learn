import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, Filter, Search, ChevronRight, Bookmark, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore'; // Import useThemeStore

// Simple Card component (inline for self-containment)
const Card = ({ children, className = '', isDark }) => (
  <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} ${className}`}>
    {children}
  </div>
);

// Simple Button component (inline for self-containment)
const Button = ({ children, onClick, size = 'md', variant = 'primary', className = '', isDark }) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeStyle = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }[size];
  const variantStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    outline: `border ${isDark ? 'border-gray-600 text-gray-100 hover:bg-gray-700' : 'border-gray-300 text-gray-900 hover:bg-gray-100'} focus:ring-blue-500`,
  }[variant];

  return (
    <button onClick={onClick} className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
};

// Tutorial Detail Page Component
const TutorialDetailPage = ({ tutorial, onBack, isDark }) => {
  if (!tutorial) {
    return (
      <div className="text-center py-12">
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Tutorial not found.
        </h3>
        <Button onClick={onBack} variant="secondary" isDark={isDark}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tutorials
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Button onClick={onBack} variant="secondary" className="mb-6" isDark={isDark}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tutorials
      </Button>
      <Card isDark={isDark}>
        <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {tutorial.title}
        </h1>
        <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          by {tutorial.author}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            {tutorial.duration}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            {tutorial.rating}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            tutorial.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            tutorial.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
          </span>
        </div>
        
        <div className={`prose max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2
          prose-p:mb-4 prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2
          prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto
          dark:prose-pre:bg-gray-700 dark:prose-pre:text-gray-100
          prose-code:font-mono prose-code:text-sm prose-code:bg-gray-200 prose-code:rounded-sm prose-code:px-1
          dark:prose-code:bg-gray-600 dark:prose-code:text-gray-200
        `}>
          <p className="mb-4 text-lg font-medium">{tutorial.description}</p>
          
          {/* Render sections dynamically */}
          {tutorial.sections && tutorial.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className={`text-2xl font-bold mt-8 mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h2>
              {/* Using dangerouslySetInnerHTML to render HTML content from string */}
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


// Main App Component
const App = () => {
  // State for dark mode, search term, selected category, and selected difficulty
  const { isDark } = useThemeStore(); // Use isDark from the external theme store
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  // State to manage sidebar visibility on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for routing
  const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'detail'
  const [selectedTutorialId, setSelectedTutorialId] = useState(null);

  // Define tutorial categories with their counts
  const categories = [
    { id: 'all', name: 'All Topics', count: 8 }, // Updated total count
    { id: 'javascript', name: 'JavaScript', count: 2 }, // Updated count
    { id: 'react', name: 'React', count: 2 }, // Updated count
    { id: 'python', name: 'Python', count: 1 }, // Updated count
    { id: 'dsa', name: 'Data Structures', count: 1 }, // Updated count
    { id: 'algorithms', name: 'Algorithms', count: 1 }, // Updated count
    { id: 'db', name: 'Databases', count: 1 },
    { id: 'system', name: 'System Design', count: 1 },
  ];

  // Define tutorial data - Now with enhanced sections and a new tutorial
  const allTutorials = [
    {
      id: 1,
      title: 'Complete JavaScript Fundamentals',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, async/await, and more.',
      category: 'javascript',
      difficulty: 'beginner',
      duration: '4 hours',
      rating: 4.8,
      students: 1250,
      author: 'John Doe',
      isBookmarked: false,
      progress: 0,
      sections: [
        { 
          title: 'Introduction to JavaScript', 
          content: `
            <p>JavaScript is a versatile programming language used for web development, server-side applications, mobile apps, and more. This tutorial will guide you through its core concepts.</p>
            <p><strong>What is JavaScript?</strong></p>
            <ul>
              <li>A high-level, interpreted programming language.</li>
              <li>Primarily known as the scripting language for Web pages.</li>
              <li>Can also be used for server-side programming (Node.js), mobile apps (React Native), and desktop apps (Electron).</li>
            </ul>
            <p><strong>Why Learn JavaScript?</strong></p>
            <p>It's essential for front-end web development and has a vast ecosystem for full-stack development.</p>
          ` 
        },
        { 
          title: 'Variables and Data Types', 
          content: `
            <p>Variables are containers for storing data values. JavaScript has several fundamental data types.</p>
            <h4>Declaring Variables:</h4>
            <ul>
              <li><code>var</code>: Old way, function-scoped.</li>
              <li><code>let</code>: Block-scoped, reassignable.</li>
              <li><code>const</code>: Block-scoped, constant (cannot be reassigned).</li>
            </ul>
            <pre><code class="language-javascript">
// Using var (function-scoped)
var greeting = "Hello, World!";
console.log(greeting); // Output: Hello, World!

// Using let (block-scoped, reassignable)
let count = 10;
count = 12; // Valid
console.log(count); // Output: 12

// Using const (block-scoped, constant)
const PI = 3.14159;
// PI = 3.14; // This would cause an error!
console.log(PI); // Output: 3.14159

const user = &#123; name: "Alice" &#125;;
user.name = "Bob"; // Valid: object content can be modified
// user = &#123; name: "Charlie" &#125;; // Invalid: cannot reassign const object
            </code></pre>
            <h4>Common Data Types:</h4>
            <ul>
              <li><strong>Primitive Types:</strong>
                <ul>
                  <li><code>string</code>: e.g., "hello", 'world'</li>
                  <li><code>number</code>: e.g., 10, 3.14, -5</li>
                  <li><code>boolean</code>: e.g., <code>true</code> or <code>false</code></li>
                  <li><code>null</code>: intentional absence of any object value</li>
                  <li><code>undefined</code>: a variable that has not been assigned a value</li>
                  <li><code>symbol</code> (ES6): unique and immutable primitive value</li>
                  <li><code>bigint</code> (ES11): for very large integers</li>
                </ul>
              </li>
              <li><strong>Non-Primitive Type:</strong>
                <ul>
                  <li><code>object</code>: e.g., <code>&#123; name: "Alice" &#125;</code>, <code>[1, 2, 3]</code>, <code>function() &#123;&#125;</code></li>
                </ul>
              </li>
            </ul>
          `
        },
        {
          title: 'Operators and Control Flow',
          content: `
            <p>Operators perform operations on values and variables. Control flow statements execute blocks of code based on conditions or loops.</p>
            <h4>Arithmetic Operators:</h4>
            <p><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus), <code>**</code> (exponentiation)</p>
            <h4>Comparison Operators:</h4>
            <p><code>==</code> (loose equality), <code>===</code> (strict equality), <code>!=</code>, <code>!==</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></p>
            <h4>Logical Operators:</h4>
            <p><code>&&</code> (AND), <code>||</code> (OR), <code>!</code> (NOT)</p>
            <h4>Conditional Statements:</h4>
            <pre><code class="language-javascript">
let age = 18;
if (age >= 18) &#123;
  console.log("Eligible to vote.");
&#125; else &#123;
  console.log("Not eligible to vote.");
&#125;

let day = "Monday";
switch (day) &#123;
  case "Monday":
    console.log("Start of the week.");
    break;
  case "Friday":
    console.log("End of the week.");
    break;
  default:
    console.log("Mid-week.");
&#125;
            </code></pre>
            <h4>Looping Statements:</h4>
            <pre><code class="language-javascript">
// For loop
for (let i = 0; i &lt; 3; i++) &#123;
  console.log("Iteration " + i);
&#125;

// While loop
let i = 0;
while (i &lt; 3) &#123;
  console.log("While iteration " + i);
  i++;
&#125;

// For...of (for arrays)
const colors = ["red", "green", "blue"];
for (const color of colors) &#123;
  console.log(color);
&#125;

// For...in (for objects)
const car = &#123; brand: "Toyota", model: "Camry" &#125;;
for (const key in car) &#123;
  console.log(&#96;\${key}: \${car[key]}&#96;);
&#125;
            </code></pre>
          `
        },
        {
          title: 'Functions and Scope',
          content: `
            <p>Functions are blocks of code designed to perform a particular task. Scope determines the accessibility of variables.</p>
            <h4>Function Declaration:</h4>
            <pre><code class="language-javascript">
function greet(name) &#123;
  return "Hello, " + name + "!";
&#125;
console.log(greet("Alice")); // Output: Hello, Alice!
            </code></pre>
            <h4>Function Expression:</h4>
            <pre><code class="language-javascript">
const add = function(a, b) &#123;
  return a + b;
&#125;;
console.log(add(5, 3)); // Output: 8
            </code></pre>
            <h4>Arrow Functions (ES6):</h4>
            <pre><code class="language-javascript">
const multiply = (a, b) => a * b;
console.log(multiply(4, 2)); // Output: 8

const sayHello = () => "Hello!";
console.log(sayHello()); // Output: Hello!
            </code></pre>
            <h4>Scope:</h4>
            <ul>
              <li><strong>Global Scope:</strong> Variables declared outside any function or block. Accessible everywhere.</li>
              <li><strong>Function Scope:</strong> Variables declared with &#96;var&#96; inside a function. Accessible only within that function.</li>
              <li><strong>Block Scope (ES6):</strong> Variables declared with &#96;let&#96; or &#96;const&#96; inside a block (&#123;&#125;). Accessible only within that block.</li>
            </ul>
            <pre><code class="language-javascript">
let globalVar = "I'm global";

function exampleScope() &#123;
  var functionVar = "I'm function scoped";
  let blockVar = "I'm block scoped"; // This is block scoped to the function block
  console.log(globalVar); // Accessible
  console.log(functionVar); // Accessible
  console.log(blockVar); // Accessible

  if (true) &#123;
    let innerBlockVar = "I'm inner block scoped";
    console.log(innerBlockVar); // Accessible
  &#125;
  // console.log(innerBlockVar); // Error: innerBlockVar is not defined
&#125;

exampleScope();
// console.log(functionVar); // Error: functionVar is not defined
            </code></pre>
          `
        },
        {
          title: 'ES6+ Features',
          content: `
            <p>ECMAScript 2015 (ES6) introduced many powerful features to JavaScript, making it more concise and expressive.</p>
            <h4>Template Literals:</h4>
            <p>Use backticks (&#96;) for string interpolation and multi-line strings.</p>
            <pre><code class="language-javascript">
const name = "World";
const message = &#96;Hello, \${name}!
This is a multi-line string.&#96;;
console.log(message);
// Output:
// Hello, World!
// This is a multi-line string.
            </code></pre>
            <h4>Destructuring Assignment:</h4>
            <p>Unpack values from arrays or properties from objects into distinct variables.</p>
            <pre><code class="language-javascript">
// Array Destructuring
const numbers = [1, 2, 3];
const [a, b, c] = numbers;
console.log(a, b, c); // Output: 1 2 3

// Object Destructuring
const person = &#123; firstName: "John", lastName: "Doe" &#125;;
const &#123; firstName, lastName &#125; = person;
console.log(firstName, lastName); // Output: John Doe
            </code></pre>
            <h4>Spread and Rest Operators:</h4>
            <p><code>...</code> The spread operator expands iterables; the rest operator collects remaining elements into an array.</p>
            <pre><code class="language-javascript">
// Spread Operator (Arrays)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // Output: [1, 2, 3, 4]

// Spread Operator (Objects)
const obj1 = &#123; a: 1, b: 2 &#125;;
const obj2 = &#123; ...obj1, c: 3 &#125;;
console.log(obj2); // Output: &#123; a: 1, b: 2, c: 3 &#125;

// Rest Operator in functions
function sumAll(...args) &#123;
  return args.reduce((total, num) => total + num, 0);
&#125;
console.log(sumAll(1, 2, 3, 4)); // Output: 10
            </code></pre>
            <h4>Modules (import/export):</h4>
            <p>Organize code into separate files and share functionality.</p>
            <pre><code class="language-javascript">
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import &#123; add, subtract &#125; from './math.js';
console.log(add(10, 5)); // Output: 15
            </code></pre>
          `
        },
        {
          title: 'Asynchronous JavaScript',
          content: `
            <p>Asynchronous operations allow your program to perform long-running tasks without blocking the main thread.</p>
            <h4>Callbacks:</h4>
            <p>Functions passed as arguments to other functions, to be executed later.</p>
            <pre><code class="language-javascript">
function fetchData(callback) &#123;
  setTimeout(() => &#123;
    const data = "Data fetched!";
    callback(data);
  &#125;, 1000);
&#125;

fetchData(function(data) &#123;
  console.log(data); // Output: Data fetched! (after 1 second)
&#125;);
            </code></pre>
            <h4>Promises (ES6):</h4>
            <p>An object representing the eventual completion or failure of an asynchronous operation.</p>
            <pre><code class="language-javascript">
function fetchDataPromise() &#123;
  return new Promise((resolve, reject) => &#123;
    setTimeout(() => &#123;
      const success = true;
      if (success) &#123;
        resolve("Data fetched successfully!");
      &#125; else &#123;
        reject("Failed to fetch data.");
      &#125;
    &#125;, 1000);
  &#125;);
&#125;

fetchDataPromise()
  .then(data => console.log(data)) // Output: Data fetched successfully!
  .catch(error => console.error(error));
            </code></pre>
            <h4>Async/Await (ES8):</h4>
            <p>Syntactic sugar built on Promises, making asynchronous code look and behave more like synchronous code.</p>
            <pre><code class="language-javascript">
async function fetchDataAsync() &#123;
  try &#123;
    const data = await fetchDataPromise();
    console.log(data); // Output: Data fetched successfully!
  &#125; catch (error) &#123;
    console.error(error);
  &#125;
&#125;

fetchDataAsync();
            </code></pre>
          `
        },
      ]
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
      author: 'Jane Smith',
      isBookmarked: true,
      progress: 60,
      sections: [
        {
          title: 'Mastering React Hooks',
          content: `
            <p>React Hooks allow you to use state and other React features without writing a class. This deep dive covers essential hooks and their advanced use cases.</p>
            <p><strong>Why Hooks?</strong></p>
            <ul>
              <li>Reuse stateful logic between components.</li>
              <li>Make components easier to read and test.</li>
              <li>Avoid class components complexities (<code>this</code> binding, lifecycle methods).</li>
            </ul>
          `
        },
        {
          title: 'useState: State Management',
          content: `
            <p>The most fundamental hook for adding state to functional components. It returns a stateful value and a function to update it.</p>
            <h4>Basic Usage:</h4>
            <pre><code class="language-javascript">
import React, &#123; useState &#125; from 'react';

function Counter() &#123;
  const [count, setCount] = useState(0); // Initialize count to 0

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked &#123;count&#125; times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
&#125;
export default Counter;
            </code></pre>
            <h4>Functional Updates:</h4>
            <p>When the new state depends on the previous state, pass a function to &#96;setCount&#96;.</p>
            <pre><code class="language-javascript">
// Correct way to update state based on previous state
setCount(prevCount => prevCount + 1);
            </code></pre>
          `
        },
        {
          title: 'useEffect: Side Effects',
          content: `
            <p>The &#96;useEffect&#96; hook lets you perform side effects in functional components. It runs after every render by default.</p>
            <h4>Cleanup Function:</h4>
            <p>Return a function from &#96;useEffect&#96; to perform cleanup (e.g., clearing timers, unsubscribing).</p>
            <pre><code class="language-javascript">
import React, &#123; useState, useEffect &#125; from 'react';

function Timer() &#123;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => &#123;
    const intervalId = setInterval(() => &#123;
      setSeconds(prevSeconds => prevSeconds + 1);
    &#125;, 1000);

    // Cleanup function: runs when component unmounts or before next effect run
    return () => clearInterval(intervalId);
  &#125;, []); // Empty dependency array means effect runs once on mount and cleans up on unmount

  return &lt;p&gt;Seconds: &#123;seconds&#125;&lt;/p&gt;;
&#125;
export default Timer;
            </code></pre>
            <h4>Dependency Array:</h4>
            <ul>
              <li>Empty array &#96;[]&#96;: Effect runs once after the initial render and cleans up on unmount.</li>
              <li>No array: Effect runs after every render.</li>
              <li>Array with dependencies &#96;[propA, stateB]&#96;: Effect runs when any dependency changes.</li>
            </ul>
          `
        },
        {
          title: 'useContext: Global State',
          content: `
            <p>The &#96;useContext&#96; hook allows you to subscribe to React Context without introducing nesting.</p>
            <h4>Example: Theme Context</h4>
            <pre><code class="language-javascript">
// ThemeContext.js
import React, &#123; createContext, useState, useContext &#125; from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = (&#123; children &#125;) => &#123;
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => &#123;
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  &#125;;

  return (
    &lt;ThemeContext.Provider value=&#123;&#123; theme, toggleTheme &#125;&#125;&gt;
      &#123;children&#125;
    &lt;/ThemeContext.Provider&gt;
  );
&#125;;

export const useTheme = () => useContext(ThemeContext);

// App.js (or any component)
import React from 'react';
import &#123; ThemeProvider, useTheme &#125; from './ThemeContext'; // Assuming ThemeContext.js

const ThemedComponent = () => &#123;
  const &#123; theme, toggleTheme &#125; = useTheme();
  return (
    &lt;div style=&#123;&#123; background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' &#125;&#125;&gt;
      &lt;p&gt;Current Theme: &#123;theme&#125;&lt;/p&gt;
      &lt;button onClick=&#123;toggleTheme&#125;&gt;Toggle Theme&lt;/button&gt;
    &lt;/div&gt;
  );
&#125;;

const AppWrapper = () => (
  &lt;ThemeProvider&gt;
    &lt;ThemedComponent /&gt;
  &lt;/ThemeProvider&gt;
);
export default AppWrapper;
            </code></pre>
          `
        },
        {
          title: 'useRef: Direct DOM Access & Mutable Values',
          content: `
            <p>The &#96;useRef&#96; hook returns a mutable ref object whose &#96;.current&#96; property is initialized to the passed argument (&#96;initialValue&#96;). The returned object will persist for the full lifetime of the component.</p>
            <h4>Accessing DOM Elements:</h4>
            <pre><code class="language-javascript">
import React, &#123; useRef, useEffect &#125; from 'react';

function TextInputWithFocusButton() &#123;
  const inputRef = useRef(null);

  const onButtonClick = () => &#123;
    // &#96;current&#96; points to the mounted text input element
    inputRef.current.focus();
  &#125;;

  return (
    &lt;&gt;
      &lt;input ref=&#123;inputRef&#125; type="text" /&gt;
      &lt;button onClick=&#123;onButtonClick&#125;&gt;Focus the input&lt;/button&gt;
    &lt;/&gt;
  );
&#125;
export default TextInputWithFocusButton;
            </code></pre>
            <h4>Storing Mutable Values:</h4>
            <p>Useful for storing any mutable value that doesn’t cause a re-render when it changes, like a timer ID.</p>
            <pre><code class="language-javascript">
import React, &#123; useRef, useState &#125; from 'react';

function StoppableCounter() &#123;
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // To store the interval ID

  const startCounter = () => &#123;
    if (!intervalRef.current) &#123; // Prevent multiple intervals
      intervalRef.current = setInterval(() => &#123;
        setCount(prevCount => prevCount + 1);
      &#125;, 1000);
    &#125;
  &#125;;

  const stopCounter = () => &#123;
    if (intervalRef.current) &#123;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    &#125;
  &#125;;

  return (
    &lt;div&gt;
      &lt;p&gt;Count: &#123;count&#125;&lt;/p&gt;
      &lt;button onClick=&#123;startCounter&#125;&gt;Start&lt;/button&gt;
      &lt;button onClick=&#123;stopCounter&#125;&gt;Stop&lt;/button&gt;
    &lt;/div&gt;
  );
&#125;
export default StoppableCounter;
            </code></pre>
          `
        },
        {
          title: 'Custom Hooks: Reusable Logic',
          content: `
            <p>Custom Hooks are JavaScript functions whose names start with "use" and that may call other Hooks. They allow you to extract reusable stateful logic from a component.</p>
            <h4>Example: &#96;useToggle&#96; Hook</h4>
            <pre><code class="language-javascript">
// useToggle.js
import &#123; useState, useCallback &#125; from 'react';

const useToggle = (initialState = false) => &#123;
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(prevState => !prevState), []);
  return [state, toggle];
&#125;;

export default useToggle;

// MyComponent.js
import React from 'react';
import useToggle from './useToggle'; // Assuming useToggle.js is in the same directory

function MyComponent() &#123;
  const [isOn, toggle] = useToggle(false);

  return (
    &lt;div&gt;
      &lt;p&gt;Status: &#123;isOn ? 'ON' : 'OFF'&#125;&lt;/p&gt;
      &lt;button onClick=&#123;toggle&#125;&gt;Toggle&lt;/button&gt;
    &lt;/div&gt;
  );
&#125;
export default MyComponent;
            </code></pre>
          `
        },
      ]
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
      author: 'Mike Johnson',
      isBookmarked: false,
      progress: 0,
      sections: [
        {
          title: 'Python Fundamentals for Data Science',
          content: `
            <p>Review Python syntax, data structures (lists, dictionaries), control flow, and functions, with a focus on their application in data manipulation.</p>
            <h4>Lists:</h4>
            <pre><code class="language-python">
# Creating a list
my_list = [1, 2, 3, "hello", True]
print(my_list) # Output: [1, 2, 3, 'hello', True]

# Accessing elements
print(my_list[0]) # Output: 1
print(my_list[-1]) # Output: True

# Slicing
print(my_list[1:4]) # Output: [2, 3, 'hello']

# Modifying elements
my_list[0] = 100
print(my_list) # Output: [100, 2, 3, 'hello', True]

# Adding elements
my_list.append("world")
print(my_list) # Output: [100, 2, 3, 'hello', True, 'world']
            </code></pre>
            <h4>Dictionaries:</h4>
            <pre><code class="language-python">
# Creating a dictionary
my_dict = &#123;"name": "Alice", "age": 30, "city": "New York"&#125;
print(my_dict) # Output: &#123;'name': 'Alice', 'age': 30, 'city': 'New York'&#125;

# Accessing values
print(my_dict["name"]) # Output: Alice

# Modifying values
my_dict["age"] = 31
print(my_dict) # Output: &#123;'name': 'Alice', 'age': 31, 'city': 'New York'&#125;

# Adding new key-value pairs
my_dict["country"] = "USA"
print(my_dict) # Output: &#123;'name': 'Alice', 'age': 31, 'city': 'New York', 'country': 'USA'&#125;
            </code></pre>
          `
        },
        { title: 'NumPy: Numerical Computing', content: '<p>Explore NumPy arrays, vectorized operations, and essential functions for high-performance numerical computations.</p>' },
        { title: 'Pandas: Data Manipulation and Analysis', content: '<p>Master DataFrames, Series, data loading, cleaning, transformation, aggregation, and merging data for robust data analysis.</p>' },
        { title: 'Matplotlib & Seaborn: Data Visualization', content: '<p>Learn to create compelling static, animated, and interactive visualizations to uncover insights from your data.</p>' },
        { title: 'Scikit-learn: Machine Learning Basics', content: '<p>Introduction to supervised and unsupervised learning algorithms, model training, evaluation, and basic machine learning workflows.</p>' },
      ]
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
      author: 'Sarah Wilson',
      isBookmarked: true,
      progress: 25,
      sections: [
        { title: 'What is a Binary Tree?', content: '<p>Learn the definition of a binary tree, its nodes (root, parent, child, leaf), and basic terminology like depth, height, and level.</p>' },
        { title: 'Types of Binary Trees', content: '<p>Explore different types including full, complete, perfect, balanced, and degenerate binary trees.</p>' },
        { title: 'Binary Search Trees (BST)', content: '<p>Understand the properties of a Binary Search Tree and how it enables efficient searching, insertion, and deletion operations.</p>' },
        { title: 'Tree Traversals', content: '<p>Master the three main tree traversal algorithms: Inorder, Preorder, and Postorder. We\'ll discuss both recursive and iterative approaches for each.</p>' },
        { title: 'Applications of Binary Trees', content: '<p>Discover real-world applications of binary trees, such as representing hierarchical data, implementing expression parsers, and efficient searching in databases.</p>' },
      ]
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
      author: 'David Brown',
      isBookmarked: false,
      progress: 0,
      sections: [
        { title: 'Bubble Sort', content: '<p>A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>' },
        { title: 'Selection Sort', content: '<p>The algorithm divides the input list into two parts: a sorted sublist and the remaining unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the sorted sublist.</p>' },
        { title: 'Insertion Sort', content: '<p>Builds the final sorted array (or list) one item at a time. It iterates through the input elements and grows a sorted output list.</p>' },
        { title: 'Merge Sort', content: '<p>A divide and conquer algorithm that divides the unsorted list into n sublists, each containing one element, and then repeatedly merges sublists to produce new sorted sublists until there is only one sorted sublist remaining.</p>' },
        { title: 'Quick Sort', content: '<p>Another divide and conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.</p>' },
        { title: 'Heap Sort', content: '<p>A comparison-based sorting algorithm that uses a binary heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.</p>' },
      ]
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
      author: 'Emily Davis',
      isBookmarked: false,
      progress: 0,
      sections: [
        { title: 'Render Props', content: '<p>A technique for sharing code between React components using a prop whose value is a function. This function renders what the component needs to render.</p>' },
        { title: 'Higher-Order Components (HOCs)', content: '<p>HOCs are functions that take a component as an argument and return a new component with enhanced capabilities. They are a powerful pattern for code reuse and logic abstraction.</p>' },
        { title: 'Compound Components', content: '<p>This pattern allows you to build components that work together to share implicit state and logic, providing a flexible and expressive API to users.</p>' },
        { title: 'Controlled vs. Uncontrolled Components', content: '<p>Understand the differences between controlled components (where form data is handled by React state) and uncontrolled components (where form data is handled by the DOM itself).</p>' },
        { title: 'Context API for Global State', content: '<p>While &#96;useContext&#96; is a hook, understanding the broader Context API is crucial for managing global state without prop drilling, especially when combined with reducers for complex state.</p>' },
        { title: 'Performance Optimization Patterns', content: '<p>Explore techniques like memoization (&#96;React.memo&#96;, &#96;useMemo&#96;, &#96;useCallback&#96;), lazy loading (&#96;React.lazy&#96;, &#96;Suspense&#96;), and virtualization to optimize the performance of your React applications.</p>' },
      ]
    },
    {
      id: 7,
      title: 'Getting Started with SQL',
      description: 'Learn the fundamentals of SQL for database management and querying.',
      category: 'db',
      difficulty: 'beginner',
      duration: '5 hours',
      rating: 4.7,
      students: 1500,
      author: 'Robert Lee',
      isBookmarked: false,
      progress: 0,
      sections: [
        {
          title: 'Introduction to Databases',
          content: `
            <p>Understand what databases are, why they are used, and the concept of relational databases.</p>
            <h4>What is a Database?</h4>
            <p>A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).</p>
            <h4>Relational Databases:</h4>
            <p>Data is organized into tables (relations) with rows and columns. Relationships between tables are established using primary and foreign keys.</p>
          `
        },
        {
          title: 'Basic SQL Commands: SELECT, FROM, WHERE',
          content: `
            <p>These are the most fundamental commands for retrieving data.</p>
            <h4>SELECT:</h4>
            <p>Used to select data from a database.</p>
            <pre><code class="language-sql">
SELECT column1, column2 FROM table_name;
SELECT * FROM customers; -- Selects all columns from the customers table
            </code></pre>
            <h4>FROM:</h4>
            <p>Specifies the table(s) from which to retrieve data.</p>
            <h4>WHERE:</h4>
            <p>Filters records based on a specified condition.</p>
            <pre><code class="language-sql">
SELECT name, email FROM users WHERE age > 25;
SELECT product_name FROM products WHERE price BETWEEN 10 AND 50;
            </code></pre>
          `
        },
        {
          title: 'Data Manipulation: INSERT, UPDATE, DELETE',
          content: `
            <p>Commands to modify data within tables.</p>
            <h4>INSERT INTO:</h4>
            <p>Adds new rows of data to a table.</p>
            <pre><code class="language-sql">
INSERT INTO customers (customer_name, city, country)
VALUES ('Alice Wonderland', 'London', 'UK');

INSERT INTO products VALUES (101, 'Laptop', 1200.00, 50); -- If inserting into all columns
            </code></pre>
            <h4>UPDATE:</h4>
            <p>Modifies existing records in a table.</p>
            <pre><code class="language-sql">
UPDATE customers
SET city = 'Paris'
WHERE customer_name = 'Alice Wonderland';
            </code></pre>
            <h4>DELETE FROM:</h4>
            <p>Removes existing records from a table.</p>
            <pre><code class="language-sql">
DELETE FROM products WHERE stock_quantity = 0;
            </code></pre>
          `
        },
        { title: 'Table Creation and Modification: CREATE TABLE, ALTER TABLE, DROP TABLE', content: '<p>Understand how to define database schemas by creating new tables, altering their structure, and dropping them.</p>' },
        { title: 'Joining Tables: INNER JOIN, LEFT JOIN, RIGHT JOIN', content: '<p>Learn to combine data from multiple tables using various JOIN operations to retrieve related information.</p>' },
        { title: 'Aggregation and Grouping: COUNT, SUM, AVG, GROUP BY, HAVING', content: '<p>Explore aggregate functions to perform calculations on sets of rows and how to group results using GROUP BY and filter groups with HAVING.</p>' },
      ]
    },
    {
      id: 8,
      title: 'Introduction to System Design',
      description: 'Learn the core concepts and principles of designing scalable and reliable systems.',
      category: 'system',
      difficulty: 'intermediate',
      duration: '4 hours',
      rating: 4.5,
      students: 900,
      author: 'Laura Chen',
      isBookmarked: false,
      progress: 0,
      sections: [
        { title: 'Scalability', content: '<p>Understand different types of scalability (vertical vs. horizontal) and techniques like load balancing, caching, and database sharding to handle increasing traffic and data.</p>' },
        { title: 'Reliability and Availability', content: '<p>Explore concepts like fault tolerance, redundancy, and disaster recovery to ensure your system remains operational even in the face of failures.</p>' },
        { title: 'Consistency and CAP Theorem', content: '<p>Delve into data consistency models (strong, eventual) and the CAP theorem (Consistency, Availability, Partition Tolerance) in distributed systems.</p>' },
        { title: 'Distributed Systems Concepts', content: '<p>Learn about distributed computing challenges, inter-service communication (RPC, message queues), and distributed consensus algorithms.</p>' },
        { title: 'Common System Design Patterns', content: '<p>Introduction to frequently used patterns like API Gateway, Service Discovery, Circuit Breaker, and Event Sourcing.</p>' },
      ]
    },
    {
      id: 9,
      title: 'Introduction to Web Development',
      description: 'A beginner-friendly guide to HTML, CSS, and basic JavaScript for web development.',
      category: 'javascript',
      difficulty: 'beginner',
      duration: '5 hours',
      rating: 4.5,
      students: 3000,
      author: 'Chris Evans',
      isBookmarked: false,
      progress: 0,
      sections: [
        {
          title: 'HTML: Structuring Web Content',
          content: `
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
            <h4>Basic HTML Structure:</h4>
            <pre><code class="language-html">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
    &lt;p&gt;This is a paragraph of text.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
            </code></pre>
            <h4>Common HTML Tags:</h4>
            <ul>
              <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>: Headings</li>
              <li><code>&lt;p&gt;</code>: Paragraphs</li>
              <li><code>&lt;a&gt;</code>: Links (anchor tag)</li>
              <li><code>&lt;img&gt;</code>: Images</li>
              <li><code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>: Lists</li>
              <li><code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>: Generic containers</li>
            </ul>
          `
        },
        {
          title: 'CSS: Styling Web Pages',
          content: `
            <p>CSS (Cascading Style Sheets) is used to style the look and feel of web pages.</p>
            <h4>Ways to Add CSS:</h4>
            <ul>
              <li><strong>Inline:</strong> Using the &#96;style&#96; attribute directly on an HTML element.</li>
              <li><strong>Internal:</strong> Using a &#96;&lt;style&gt;&#96; tag within the &#96;&lt;head&gt;&#96; of an HTML document.</li>
              <li><strong>External:</strong> Linking an external &#96;.css&#96; file (most common and recommended).</li>
            </ul>
            <h4>Basic CSS Syntax:</h4>
            <pre><code class="language-css">
/* Selector &#123; property: value; &#125; */
body &#123;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
&#125;

h1 &#123;
  color: #333;
  text-align: center;
&#125;

.container &#123;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
&#125;
            </code></pre>
            <h4>Common CSS Properties:</h4>
            <ul>
              <li><code>color</code>, <code>background-color</code></li>
              <li><code>font-size</code>, <code>font-family</code>, <code>font-weight</code></li>
              <li><code>margin</code>, <code>padding</code></li>
              <li><code>width</code>, <code>height</code></li>
              <li><code>border</code>, <code>box-shadow</code></li>
              <li><code>display</code>, <code>position</code></li>
            </ul>
          `
        },
        {
          title: 'Basic JavaScript for Interactivity',
          content: `
            <p>JavaScript adds dynamic and interactive behavior to web pages.</p>
            <h4>Adding JavaScript to HTML:</h4>
            <p>Using the &#96;&lt;script&#96; tag, typically at the end of the &#96;&lt;body&gt;&#96;.</p>
            <pre><code class="language-html">
&lt;body&gt;
    &lt;h1 id="myHeading"&gt;Hello!&lt;/h1&gt;
    &lt;button onclick="changeText()"&gt;Change Heading&lt;/button&gt;

    &lt;script&gt;
        function changeText() &#123;
            document.getElementById("myHeading").textContent = "Text Changed!";
        &#125;
    &lt;/script&gt;
&lt;/body&gt;
            </code></pre>
            <h4>DOM Manipulation:</h4>
            <p>JavaScript interacts with the Document Object Model (DOM) to change content, style, and structure of a web page.</p>
            <pre><code class="language-javascript">
// Get an element by its ID
const heading = document.getElementById("myHeading");

// Change its text content
heading.textContent = "New Heading!";

// Change its style
heading.style.color = "blue";

// Add an event listener
const button = document.querySelector("button");
button.addEventListener("click", () => &#123;
  alert("Button clicked!");
&#125;);
            </code></pre>
            <h4>Event Handling:</h4>
            <p>Responding to user actions like clicks, hovers, key presses, etc.</p>
          `
        }
      ]
    }
  ];


  // Filter tutorials based on search term, category, and difficulty
  const filteredTutorials = allTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Helper function to get difficulty-based Tailwind CSS classes
  const getDifficultyColor = (difficulty) => {
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

  const handleTutorialClick = (id) => {
    setSelectedTutorialId(id);
    setCurrentPage('detail');
  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedTutorialId(null);
  };

  // Find the selected tutorial for the detail page
  const currentTutorial = allTutorials.find(t => t.id === selectedTutorialId);

  return (
    // Main container for the entire application
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} font-inter`}>
      {/* Mobile Sidebar Toggle - Removed theme toggle here as it's handled by Navbar */}
      <div className="lg:hidden p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Tutorials</h2>
        <div className="flex items-center space-x-4">
          {/* Removed theme toggle button */}
          <Button variant="secondary" onClick={() => setIsSidebarOpen(!isSidebarOpen)} size="sm" className="rounded-full p-2" isDark={isDark}>
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 p-6 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex flex-col
        ${isDark ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}
        transition-transform duration-300 ease-in-out`}>
        
        {/* Sidebar Header/Logo */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-600">QuickRef</h2>
          {/* Removed theme toggle button */}
          <Button variant="secondary" onClick={() => setIsSidebarOpen(false)} size="sm" className="rounded-full p-2 lg:hidden" isDark={isDark}>
            <ChevronRight className="w-5 h-5 rotate-180" /> {/* Close button for mobile */}
          </Button>
        </div>

        {/* Search Input in Sidebar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <nav>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? 'primary' : 'outline'}
                    className={`w-full justify-between ${selectedCategory === category.id ? '' : (isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
                    size="md"
                    isDark={isDark}
                  >
                    <span>{category.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedCategory === category.id ? 'bg-blue-700 text-white' : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600')}`}>
                      {category.count}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Difficulty</h3>
          <div className="flex flex-col space-y-2">
            {['all', 'beginner', 'intermediate', 'advanced'].map(difficulty => (
              <label key={difficulty} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className={`ml-2 text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:ml-0 overflow-auto">
        {currentPage === 'list' && (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <h1 className={`text-4xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Programming Tutorials
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Explore our comprehensive library of coding tutorials
              </p>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} isDark={isDark} className="h-full flex flex-col overflow-hidden transform hover:scale-105 transition-transform duration-200 ease-in-out relative">
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Bookmark button at the top right of the card content */}
                    <div className="absolute top-4 right-4">
                      <Button
                        onClick={() => console.log('Bookmark clicked')} // Placeholder for bookmark action
                        size="sm"
                        className={`rounded-full p-2 shadow-lg ${
                          tutorial.isBookmarked
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        } transition-colors`}
                        isDark={isDark}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>

                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {tutorial.title}
                      {/* Difficulty badge next to the title */}
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                      </span>
                    </h3>
                    <p className={`text-sm mb-4 flex-grow ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tutorial.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-400" />
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
                        <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${tutorial.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        by {tutorial.author}
                      </span>
                      <Button size="sm" onClick={() => handleTutorialClick(tutorial.id)} isDark={isDark}>
                        {tutorial.progress > 0 ? 'Continue' : 'Start'}
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No tutorials found message */}
            {filteredTutorials.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No tutorials found
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}

        {currentPage === 'detail' && (
          <TutorialDetailPage tutorial={currentTutorial} onBack={handleBackToList} isDark={isDark} />
        )}
      </main>
    </div>
  );
};

export default App;
