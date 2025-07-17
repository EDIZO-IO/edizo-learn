// tutorialData.tsx
// This file contains the data for the programming tutorials.

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  sections: Array<{ title: string; content: string }>; // Changed to array of sections
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  image: string;
  author: string;
  isBookmarked: boolean;
  progress: number; // Percentage of completion
  likes?: number; // Added for consistency with blog data
  comments?: number; // Added for consistency with blog data
  tags: string[]; // Added for consistency with blog data
}

export const allTutorials: Tutorial[] = [
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
    likes: 350,
    comments: 55,
    tags: ["JavaScript", "Fundamentals", "ES6", "Async"],
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
console.log(greeting);

// Using let (block-scoped, reassignable)
let count = 10;
count = 12; // Valid
console.log(count);

// Using const (block-scoped, constant)
const PI = 3.14159;
// PI = 3.14; // This would cause an error!
console.log(PI);

const user = { name: "Alice" };
user.name = "Bob"; // Valid: object content can be modified
// user = { name: "Charlie" }; // Invalid: cannot reassign const object
          </code></pre>
          <h4>Common Data Types:</h4>
          <ul>
            <li><strong>Primitive Types:</strong>
              <ul>
                <li><code>string</code>: e.g., "hello", 'world'</li>
                <li><code>number</code>: e.g., 10, 3.14, -5</li>
                <li><code>boolean</code>: <code>true</code> or <code>false</code></li>
                <li><code>null</code>: intentional absence of any object value</li>
                <li><code>undefined</code>: a variable that has not been assigned a value</li>
                <li><code>symbol</code> (ES6): unique and immutable primitive value</li>
                <li><code>bigint</code> (ES11): for very large integers</li>
              </ul>
            </li>
            <li><strong>Non-Primitive Type:</strong>
              <ul>
                <li><code>object</code>: e.g., <code>{ name: "Alice" }</code>, <code>[1, 2, 3]</code>, <code>function() {}</code></li>
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
if (age >= 18) {
  console.log("Eligible to vote.");
} else {
  console.log("Not eligible to vote.");
}

let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the week.");
    break;
  case "Friday":
    console.log("End of the week.");
    break;
  default:
    console.log("Mid-week.");
}
    </code></pre>

    <h4>Looping Statements:</h4>
    <pre><code class="language-javascript">
// For loop
for (let i = 0; i < 3; i++) {
  console.log("Iteration " + i);
}

// While loop
let i = 0;
while (i < 3) {
  console.log("While iteration " + i);
  i++;
}

// For...of (for arrays)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// For...in (for objects)
const car = { brand: "Toyota", model: "Camry" };
for (const key in car) {
  console.log(\`\${key}: \${car[key]}\`);
}
    </code></pre>
  `
},

      {
        title: 'Functions and Scope',
        content: `
          <p>Functions are blocks of code designed to perform a particular task. Scope determines the accessibility of variables.</p>
          <h4>Function Declaration:</h4>
          <pre><code class="language-javascript">
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));
          </code></pre>
          <h4>Function Expression:</h4>
          <pre><code class="language-javascript">
const add = function(a, b) {
  return a + b;
};
console.log(add(5, 3));
          </code></pre>
          <h4>Arrow Functions (ES6):</h4>
          <pre><code class="language-javascript">
const multiply = (a, b) => a * b;
console.log(multiply(4, 2));

const sayHello = () => "Hello!";
console.log(sayHello());
          </code></pre>
          <h4>Scope:</h4>
          <ul>
            <li><strong>Global Scope:</strong> Variables declared outside any function or block. Accessible everywhere.</li>
            <li><strong>Function Scope:</strong> Variables declared with <code>var</code> inside a function. Accessible only within that function.</li>
            <li><strong>Block Scope (ES6):</strong> Variables declared with <code>let</code> or <code>const</code> inside a block (<code>{}</code>). Accessible only within that block.</li>
          </ul>
          <pre><code class="language-javascript">
let globalVar = "I'm global";

function exampleScope() {
  var functionVar = "I'm function scoped";
  let blockVar = "I'm block scoped"; // This is block scoped to the function block
  console.log(globalVar); // Accessible
  console.log(functionVar); // Accessible
  console.log(blockVar); // Accessible

  if (true) {
    let innerBlockVar = "I'm inner block scoped";
    console.log(innerBlockVar); // Accessible
  }
  // console.log(innerBlockVar); // Error: innerBlockVar is not defined
}

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
          <p>Use backticks (<code>\`</code>) for string interpolation and multi-line strings.</p>
          <pre><code class="language-javascript">
const name = "World";
const message = \`Hello, \${name}!
This is a multi-line string.\`;
console.log(message);
          </code></pre>
          <h4>Destructuring Assignment:</h4>
          <p>Unpack values from arrays or properties from objects into distinct variables.</p>
          <pre><code class="language-javascript">
// Array Destructuring
const numbers = [1, 2, 3];
const [a, b, c] = numbers;
console.log(a, b, c);

// Object Destructuring
const person = { firstName: "John", lastName: "Doe" };
const { firstName, lastName } = person;
console.log(firstName, lastName);
          </code></pre>
          <h4>Spread and Rest Operators:</h4>
          <p><code>...</code> The spread operator expands iterables; the rest operator collects remaining elements into an array.</p>
          <pre><code class="language-javascript">
// Spread Operator (Arrays)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2);

// Spread Operator (Objects)
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2);

// Rest Operator in functions
function sumAll(...args) {
  return args.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4));
          </code></pre>
          <h4>Modules (import/export):</h4>
          <p>Organize code into separate files and share functionality.</p>
          <pre><code class="language-javascript">
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(10, 5));
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
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data fetched!";
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log(data);
});
          </code></pre>
          <h4>Promises (ES6):</h4>
          <p>An object representing the eventual completion or failure of an asynchronous operation.</p>
          <pre><code class="language-javascript">
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 1000);
  });
}

fetchDataPromise()
  .then(data => console.log(data))
  .catch(error => console.error(error));
          </code></pre>
          <h4>Async/Await (ES8):</h4>
          <p>Syntactic sugar built on Promises, making asynchronous code look and behave more like synchronous code.</p>
          <pre><code class="language-javascript">
async function fetchDataAsync() {
  try {
    const data = await fetchDataPromise();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

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
    likes: 420,
    comments: 70,
    tags: ["React", "Hooks", "Frontend", "Advanced"],
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
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initialize count to 0

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
export default Counter;
          </code></pre>
          <h4>Functional Updates:</h4>
          <p>When the new state depends on the previous state, pass a function to <code>setCount</code>.</p>
          <pre><code class="language-javascript">
// Correct way to update state based on previous state
setCount(prevCount => prevCount + 1);
          </code></pre>
        `
      },
      {
        title: 'useEffect: Side Effects',
        content: `
          <p>The <code>useEffect</code> hook lets you perform side effects in functional components. It runs after every render by default.</p>
          <h4>Cleanup Function:</h4>
          <p>Return a function from <code>useEffect</code> to perform cleanup (e.g., clearing timers, unsubscribing).</p>
          <pre><code class="language-javascript">
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function: runs when component unmounts or before next effect run
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means effect runs once on mount and cleans up on unmount

  return &lt;p&gt;Seconds: {seconds}&lt;/p&gt;;
}
export default Timer;
          </code></pre>
          <h4>Dependency Array:</h4>
          <ul>
            <li>Empty array <code>[]</code>: Effect runs once after the initial render and cleans up on unmount.</li>
            <li>No array: Effect runs after every render.</li>
            <li>Array with dependencies <code>[propA, stateB]</code>: Effect runs when any dependency changes.</li>
          </ul>
        `
      },
      {
        title: 'useContext: Global State',
        content: `
          <p>The <code>useContext</code> hook allows you to subscribe to React Context without introducing nesting.</p>
          <h4>Example: Theme Context</h4>
          <pre><code class="language-javascript">
// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    &lt;ThemeContext.Provider value={{ theme, toggleTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
};

export const useTheme = () => useContext(ThemeContext);

// App.js (or any component)
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext'; // Assuming ThemeContext.js

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    &lt;div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}&gt;
      &lt;p&gt;Current Theme: {theme}&lt;/p&gt;
      &lt;button onClick={toggleTheme}&gt;Toggle Theme&lt;/button&gt;
    &lt;/div&gt;
  );
};

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
          <p>The <code>useRef</code> hook returns a mutable ref object whose <code>.current</code> property is initialized to the passed argument (<code>initialValue</code>). The returned object will persist for the full lifetime of the component.</p>
          <h4>Accessing DOM Elements:</h4>
          <pre><code class="language-javascript">
import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const onButtonClick = () => {
    // \`current\` points to the mounted text input element
    inputRef.current.focus();
  };

  return (
    &lt;&gt;
      &lt;input ref={inputRef} type="text" /&gt;
      &lt;button onClick={onButtonClick}&gt;Focus the input&lt;/button&gt;
    &lt;/&gt;
  );
}
export default TextInputWithFocusButton;
          </code></pre>
          <h4>Storing Mutable Values:</h4>
          <p>Useful for storing any mutable value that doesn’t cause a re-render when it changes, like a timer ID.</p>
          <pre><code class="language-javascript">
import React, { useRef, useState } from 'react';

function StoppableCounter() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // To store the interval ID

  const startCounter = () => {
    if (!intervalRef.current) { // Prevent multiple intervals
      intervalRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={startCounter}&gt;Start&lt;/button&gt;
      &lt;button onClick={stopCounter}&gt;Stop&lt;/button&gt;
    &lt;/div&gt;
  );
}
export default StoppableCounter;
          </code></pre>
        `
      },
      {
        title: 'Custom Hooks: Reusable Logic',
        content: `
          <p>Custom Hooks are JavaScript functions whose names start with "use" and that may call other Hooks. They allow you to extract reusable stateful logic from a component.</p>
          <h4>Example: <code>useToggle</code> Hook</h4>
          <pre><code class="language-javascript">
// useToggle.js
import { useState, useCallback } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(prevState => !prevState), []);
  return [state, toggle];
};

export default useToggle;

// MyComponent.js
import React from 'react';
import useToggle from './useToggle'; // Assuming useToggle.js is in the same directory

function MyComponent() {
  const [isOn, toggle] = useToggle(false);

  return (
    &lt;div&gt;
      &lt;p&gt;Status: {isOn ? 'ON' : 'OFF'}&lt;/p&gt;
      &lt;button onClick={toggle}&gt;Toggle&lt;/button&gt;
    &lt;/div&gt;
  );
}
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
    likes: 500,
    comments: 80,
    tags: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy"],
    sections: [
      {
        title: 'Python Fundamentals for Data Science',
        content: `
          <p>Review Python syntax, data structures (lists, dictionaries), control flow, and functions, with a focus on their application in data manipulation.</p>
          <h4>Lists:</h4>
          <pre><code class="language-python">
# Creating a list
my_list = [1, 2, 3, "hello", True]
print(my_list)

# Accessing elements
print(my_list[0])
print(my_list[-1])

# Slicing
print(my_list[1:4])

# Modifying elements
my_list[0] = 100
print(my_list)

# Adding elements
my_list.append("world")
print(my_list)
          </code></pre>
          <h4>Dictionaries:</h4>
          <pre><code class="language-python">
# Creating a dictionary
my_dict = {"name": "Alice", "age": 30, "city": "New York"}
print(my_dict)

# Accessing values
print(my_dict["name"])

# Modifying values
my_dict["age"] = 31
print(my_dict)

# Adding new key-value pairs
my_dict["country"] = "USA"
print(my_dict)
          </code></pre>
        `
      },
      {
        title: 'NumPy: Numerical Computing',
        content: `
          <p>Explore NumPy arrays, vectorized operations, and essential functions for high-performance numerical computations.</p>
          <h4>Example: Element-wise Operations</h4>
          <pre><code class="language-python">
import numpy as np

arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])
result = arr1 * arr2 # Element-wise multiplication
print(result) # Output: [ 4 10 18]
          </code></pre>
        `
      },
      {
        title: 'Pandas: Data Manipulation and Analysis',
        content: `
          <p>Master DataFrames, Series, data loading, cleaning, transformation, aggregation, and merging data for robust data analysis.</p>
          <h4>Example: Loading and Inspecting Data</h4>
          <pre><code class="language-python">
import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())
print(df.info())
          </code></pre>
        `
      },
      {
        title: 'Matplotlib & Seaborn: Data Visualization',
        content: `
          <p>Learn to create compelling static, animated, and interactive visualizations to uncover insights from your data.</p>
          <h4>Example: Creating a Scatter Plot</h4>
          <pre><code class="language-python">
import seaborn as sns
import matplotlib.pyplot as plt

# Assuming 'df' is a pandas DataFrame
sns.scatterplot(x='feature1', y='feature2', data=df)
plt.title('Feature 1 vs Feature 2')
plt.show()
          </code></pre>
        `
      },
      {
        title: 'Scikit-learn: Machine Learning Basics',
        content: `
          <p>Introduction to supervised and unsupervised learning algorithms, model training, evaluation, and basic machine learning workflows.</p>
          <h4>Example: Linear Regression</h4>
          <pre><code class="language-python">
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Assuming X and y are your features and target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
print(f"Model R^2 score: {model.score(X_test, y_test):.2f}")
          </code></pre>
        `
      },
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
    likes: 210,
    comments: 40,
    tags: ["Data Structures", "Algorithms", "Trees", "Binary Search Tree"],
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
    likes: 300,
    comments: 60,
    tags: ["Algorithms", "Sorting", "Time Complexity", "Data Structures"],
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
    likes: 280,
    comments: 45,
    tags: ["React", "Patterns", "Frontend", "Architecture"],
    sections: [
      { title: 'Render Props', content: '<p>A technique for sharing code between React components using a prop whose value is a function. This function renders what the component needs to render.</p>' },
      { title: 'Higher-Order Components (HOCs)', content: '<p>HOCs are functions that take a component as an argument and return a new component with enhanced capabilities. They are a powerful pattern for code reuse and logic abstraction.</p>' },
      { title: 'Compound Components', content: '<p>This pattern allows you to build components that work together to share implicit state and logic, providing a flexible and expressive API to users.</p>' },
      { title: 'Controlled vs. Uncontrolled Components', content: '<p>Understand the differences between controlled components (where form data is handled by React state) and uncontrolled components (where form data is handled by the DOM itself).</p>' },
      { title: 'Context API for Global State', content: '<p>While `useContext` is a hook, understanding the broader Context API is crucial for managing global state without prop drilling, especially when combined with reducers for complex state.</p>' },
      { title: 'Performance Optimization Patterns', content: '<p>Explore techniques like memoization (`React.memo`, `useMemo`, `useCallback`), lazy loading (`React.lazy`, `Suspense`), and virtualization to optimize the performance of your React applications.</p>' },
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
    likes: 400,
    comments: 65,
    tags: ["SQL", "Databases", "Querying", "Beginner"],
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
    likes: 250,
    comments: 30,
    tags: ["System Design", "Architecture", "Scalability", "Reliability"],
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
    likes: 600,
    comments: 90,
    tags: ["Web Development", "HTML", "CSS", "JavaScript", "Frontend"],
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
              <li><strong>Inline:</strong> Using the <code>style</code> attribute directly on an HTML element.</li>
              <li><strong>Internal:</strong> Using a <code>&lt;style&gt;</code> tag within the <code>&lt;head&gt;</code> of an HTML document.</li>
              <li><strong>External:</strong> Linking an external <code>.css</code> file (most common and recommended).</li>
            </ul>
            <h4>Basic CSS Syntax:</h4>
            <pre><code class="language-css">
/* Selector { property: value; } */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

h1 {
  color: #333;
  text-align: center;
}

.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}
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
            <p>Using the <code>&lt;script&gt;</code> tag, typically at the end of the <code>&lt;body&gt;</code>.</p>
            <pre><code class="language-html">
&lt;body&gt;
    &lt;h1 id="myHeading"&gt;Hello!&lt;/h1&gt;
    &lt;button onclick="changeText()"&gt;Change Heading&lt;/button&gt;

    &lt;script&gt;
        function changeText() {
            document.getElementById("myHeading").textContent = "Text Changed!";
        }
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
button.addEventListener("click", () => {
  alert("Button clicked!");
});
            </code></pre>
            <h4>Event Handling:</h4>
            <p>Responding to user actions like clicks, hovers, key presses, etc.</p>
          `
      }
    ]
  }
];
