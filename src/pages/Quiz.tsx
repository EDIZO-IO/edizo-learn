import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react';

// Mocking external dependencies for a self-contained example
// --- Mock useThemeStore ---
const useThemeStore = () => {
  const [isDark, setIsDark] = useState(false); // Default to light theme for clarity
  return { isDark };
};

// --- Mock useUserStore ---
const useUserStore = () => {
  const [userPoints, setUserPoints] = useState(0);

  const addPoints = (points) => {
    setUserPoints(prevPoints => prevPoints + points);
    console.log(`User earned ${points} points. Total points: ${userPoints + points}`);
  };

  return { userPoints, addPoints };
};

// --- Mock toast (react-hot-toast) ---
const toast = {
  success: (message) => console.log('Toast Success:', message),
  error: (message) => console.error('Toast Error:', message),
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

// --- Question Interface ---
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Hard';
}

// --- Main Quiz Component ---
const App = () => { // Renamed Quiz to App for default export
  const { isDark } = useThemeStore();
  const { addPoints } = useUserStore();
  const [selectedCategory, setSelectedCategory] = useState('javascript');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Hard'>('All');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const categories = [
    { id: 'javascript', name: 'JavaScript', questions: 30 },
    { id: 'react', name: 'React', questions: 30 },
    { id: 'python', name: 'Python', questions: 30 },
    { id: 'dsa', name: 'Data Structures', questions: 30 },
    { id: 'algorithms', name: 'Algorithms', questions: 30 },
  ];

  const questions: Question[] = [
    // --- JavaScript Questions (30) ---
    { id: 1, question: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "static"], correct: 2, explanation: "`const` declares a block-scoped, immutable constant.", category: "javascript", level: "Beginner" },
    { id: 2, question: "What is the output of `typeof null`?", options: ["'object'", "'null'", "'undefined'", "'number'"], correct: 0, explanation: "This is a long-standing bug in JavaScript, `typeof null` returns 'object'.", category: "javascript", level: "Beginner" },
    { id: 3, question: "How do you comment a single line in JavaScript?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"], correct: 0, explanation: "Single-line comments start with `//`.", category: "javascript", level: "Beginner" },
    { id: 4, question: "Which operator is used for strict equality in JavaScript?", options: ["==", "=", "===", "!="], correct: 2, explanation: "`===` checks for both value and type equality.", category: "javascript", level: "Beginner" },
    { id: 5, question: "What is the purpose of `addEventListener`?", options: ["To create a new event", "To remove an event listener", "To attach an event handler to an element", "To dispatch an event"], correct: 2, explanation: "`addEventListener` attaches an event handler to the specified element.", category: "javascript", level: "Beginner" },
    { id: 6, question: "Which built-in method removes the last element from an array and returns that element?", options: ["last()", "getEnd()", "pop()", "splice()"], correct: 2, explanation: "The `pop()` method removes the last element from an array.", category: "javascript", level: "Beginner" },
    { id: 7, question: "What is the correct syntax for an arrow function?", options: ["function() => {}", "() => {}", "func => {}", "=> function() {}"], correct: 1, explanation: "Arrow functions provide a shorter syntax for writing function expressions.", category: "javascript", level: "Beginner" },
    { id: 8, question: "How do you convert a string to an integer in JavaScript?", options: ["parseInt()", "stringToInt()", "toNumber()", "convertInt()"], correct: 0, explanation: "`parseInt()` parses a string argument and returns an integer.", category: "javascript", level: "Beginner" },
    { id: 9, question: "Which object is the top-level object in a browser environment?", options: ["Document", "Window", "Navigator", "Location"], correct: 1, explanation: "The `Window` object represents the browser's window and is the global object.", category: "javascript", level: "Beginner" },
    { id: 10, question: "What does `NaN` stand for?", options: ["Not a Number", "No and No", "New and Null", "None at all"], correct: 0, explanation: "`NaN` represents 'Not-a-Number'.", category: "javascript", level: "Beginner" },

    { id: 11, question: "Explain event bubbling and event capturing.", options: ["They are the same concept.", "Bubbling goes up, Capturing goes down.", "Capturing goes up, Bubbling goes down.", "They are unrelated to event propagation."], correct: 1, explanation: "Event capturing goes from the window down to the target, while bubbling goes from the target up to the window.", category: "javascript", level: "Intermediate" },
    { id: 12, question: "What is a closure in JavaScript?", options: ["A way to close a function.", "A function having access to its outer function's scope even after the outer function has finished executing.", "A type of loop.", "A method to prevent memory leaks."], correct: 1, explanation: "A closure is the combination of a function bundled together with references to its surrounding state.", category: "javascript", level: "Intermediate" },
    { id: 13, question: "Differentiate between `let`, `const`, and `var`.", options: ["`var` is block-scoped, `let` and `const` are function-scoped.", "`let` and `const` are block-scoped, `var` is function-scoped.", "All are block-scoped.", "All are function-scoped."], correct: 1, explanation: "`var` is function-scoped, while `let` and `const` are block-scoped. `const` also prevents re-assignment.", category: "javascript", level: "Intermediate" },
    { id: 14, question: "What are Promises in JavaScript?", options: ["A guarantee that a function will run.", "Objects representing the eventual completion or failure of an asynchronous operation.", "A type of loop for asynchronous code.", "A way to handle synchronous errors."], correct: 1, explanation: "Promises provide a cleaner way to handle asynchronous operations than callbacks.", category: "javascript", level: "Intermediate" },
    { id: 15, question: "Explain `hoisting` in JavaScript.", options: ["Moving declarations to the top of their scope during compilation.", "Moving variable assignments to the top.", "A type of error handling.", "A method for optimizing code execution."], correct: 0, explanation: "Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their scope before code execution.", category: "javascript", level: "Intermediate" },
    { id: 16, question: "What is the purpose of `bind()` method?", options: ["To create a new function that, when called, has its `this` keyword set to the provided value.", "To execute a function immediately.", "To attach an event listener.", "To merge two objects."], correct: 0, explanation: "`bind()` creates a new function with a `this` context bound to a specific object.", category: "javascript", level: "Intermediate" },
    { id: 17, question: "How does `async/await` work?", options: ["They make asynchronous code run synchronously.", "They are syntactic sugar over Promises, making asynchronous code look synchronous.", "They replace Promises entirely.", "They are used for parallel execution."], correct: 1, explanation: "`async/await` simplifies working with Promises, allowing asynchronous code to be written in a more readable, synchronous-like style.", category: "javascript", level: "Intermediate" },
    { id: 18, question: "What is the difference between `null` and `undefined`?", options: ["They are interchangeable.", "`null` means no value, `undefined` means variable not declared.", "`null` is an assigned value, `undefined` means a variable has been declared but not yet assigned a value.", "They are both primitive types."], correct: 2, explanation: "`null` is an assignment value, `undefined` means a variable has been declared but not yet assigned a value.", category: "javascript", level: "Intermediate" },
    { id: 19, question: "What is the event loop in JavaScript?", options: ["A loop that continuously checks for events.", "A mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel.", "A type of `for` loop.", "A way to handle recursion."], correct: 1, explanation: "The event loop is crucial for JavaScript's asynchronous nature, handling the execution of tasks.", category: "javascript", level: "Intermediate" },
    { id: 20, question: "Describe `prototype` and `prototypal inheritance`.", options: ["`prototype` is a class, inheritance is from classes.", "Objects inherit properties and methods from a `prototype` object.", "It's a way to create private variables.", "It's a form of classical inheritance."], correct: 1, explanation: "JavaScript uses prototypal inheritance, where objects can inherit properties directly from other objects.", category: "javascript", level: "Intermediate" },

    { id: 21, question: "Implement a deep clone function for a JavaScript object.", options: ["Using `JSON.parse(JSON.stringify(obj))`", "Using spread operator `{...obj}`", "Using `Object.assign({}, obj)`", "Using `obj.clone()`"], correct: 0, explanation: "`JSON.parse(JSON.stringify(obj))` is a common, though limited, way to deep clone. More robust solutions handle functions, dates, etc.", category: "javascript", level: "Hard" },
    { id: 22, question: "Explain `debounce` and `throttle`.", options: ["They both limit function calls, but `debounce` calls after a delay, `throttle` calls at intervals.", "They are used for animation.", "They are error handling techniques.", "They are only for network requests."], correct: 0, explanation: "`Debounce` ensures a function is called only after a certain period of inactivity. `Throttle` limits the rate at which a function can be called.", category: "javascript", level: "Hard" },
    { id: 23, question: "How do you handle errors in asynchronous JavaScript using `async/await`?", options: ["Using `.catch()` only", "Using `try...catch` blocks", "Using `if/else` statements", "Errors are automatically handled"], correct: 1, explanation: "`try...catch` blocks are used to handle errors within `async` functions.", category: "javascript", level: "Hard" },
    { id: 24, question: "What is the purpose of `Proxy` and `Reflect` in ES6?", options: ["For network requests.", "For metaprogramming: intercepting and customizing fundamental operations.", "For debugging only.", "For creating new data types."], correct: 1, explanation: "`Proxy` allows you to create an object that can be used in place of another object, but which can intercept and redefine fundamental operations. `Reflect` provides methods for interceptable JavaScript operations.", category: "javascript", level: "Hard" },
    { id: 25, question: "Describe the concept of `currying`.", options: ["A way to flatten arrays.", "Transforming a function with multiple arguments into a sequence of functions each taking a single argument.", "A method for optimizing loops.", "A type of data structure."], correct: 1, explanation: "Currying is a transformation of functions that translates a function from callable as `f(a, b)` into callable as `f(a)(b)`.", category: "javascript", level: "Hard" },
    { id: 26, question: "How would you implement a custom `Promise.all` equivalent?", options: ["Using `setTimeout`", "Using `Promise.race`", "Iterating through promises and using `Promise.resolve` and `Promise.reject` with a counter.", "It's not possible without native support."], correct: 2, explanation: "A custom `Promise.all` would involve iterating through promises, tracking resolution/rejection, and resolving/rejecting the main promise when all are settled.", category: "javascript", level: "Hard" },
    { id: 27, question: "Explain `WeakMap` and `WeakSet`.", options: ["They are like `Map` and `Set` but hold strong references.", "They are like `Map` and `Set` but hold weak references, allowing garbage collection.", "They are only for numbers.", "They are deprecated."], correct: 1, explanation: "`WeakMap` and `WeakSet` store weak references to their keys/values, meaning if the key/value is no longer referenced elsewhere, it can be garbage collected.", category: "javascript", level: "Hard" },
    { id: 28, question: "What is `memoization` and how can it be implemented in JavaScript?", options: ["A type of encryption.", "An optimization technique where the results of expensive function calls are cached and returned when the same inputs occur again.", "A way to store data in local storage.", "A method for error logging."], correct: 1, explanation: "Memoization can be implemented by storing function results in an object or Map, keyed by the function arguments.", category: "javascript", level: "Hard" },
    { id: 29, question: "Describe `Service Workers` and their use cases.", options: ["They are like web workers but run in the main thread.", "They are client-side programmable proxies that sit between web apps and the network.", "They are used only for server-side rendering.", "They are a new type of JavaScript framework."], correct: 1, explanation: "Service Workers enable features like offline experiences, push notifications, and background sync by intercepting network requests.", category: "javascript", level: "Hard" },
    { id: 30, question: "How would you optimize a large list rendering in JavaScript for performance?", options: ["Using `setTimeout` for each item.", "Using virtualization/windowing techniques (rendering only visible items).", "Loading all items at once.", "Using a simple `for` loop."], correct: 1, explanation: "Virtualization (or windowing) is key for large lists, rendering only the items currently in the viewport to improve performance.", category: "javascript", level: "Hard" },

    // --- React Questions (30) ---
    { id: 31, question: "What is React?", options: ["A JavaScript library for building user interfaces.", "A backend framework.", "A database management system.", "A programming language."], correct: 0, explanation: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces.", category: "react", level: "Beginner" },
    { id: 32, question: "What is JSX?", options: ["JavaScript XML", "JavaScript Extension", "JSON XChange", "JavaScript eXecutable"], correct: 0, explanation: "JSX is a syntax extension for JavaScript, used with React to describe what the UI should look like.", category: "react", level: "Beginner" },
    { id: 33, question: "How do you create a functional component in React?", options: ["class MyComponent extends Component {}", "function MyComponent() {}", "new MyComponent()", "<MyComponent />"], correct: 1, explanation: "Functional components are JavaScript functions that return JSX.", category: "react", level: "Beginner" },
    { id: 34, question: "What is the purpose of `useState` hook?", options: ["To perform side effects.", "To manage state in functional components.", "To fetch data.", "To optimize performance."], correct: 1, explanation: "`useState` allows functional components to have state.", category: "react", level: "Beginner" },
    { id: 35, question: "How do you pass data from a parent to a child component?", options: ["Using state", "Using props", "Using context", "Using ref"], correct: 1, explanation: "Props (short for properties) are used to pass data from parent to child components.", category: "react", level: "Beginner" },
    { id: 36, question: "What is a 'prop drilling'?", options: ["A method to optimize props.", "Passing data through multiple layers of components.", "A way to access DOM elements directly.", "A type of state management."], correct: 1, explanation: "Prop drilling refers to the process of passing data from a parent component down to a deeply nested child component through intermediate components that don't directly use the data.", category: "react", level: "Beginner" },
    { id: 37, question: "Which method is called after a component is rendered in a class component?", options: ["componentDidMount", "componentWillMount", "render", "componentDidUpdate"], correct: 0, explanation: "`componentDidMount` is invoked immediately after a component is mounted (inserted into the tree).", category: "react", level: "Beginner" },
    { id: 38, question: "What is the virtual DOM?", options: ["A real DOM that is hidden.", "A lightweight copy of the actual DOM.", "A server-side rendering technique.", "A database for React components."], correct: 1, explanation: "The virtual DOM is a programming concept where a virtual representation of the UI is kept in memory and synced with the 'real' DOM.", category: "react", level: "Beginner" },
    { id: 39, question: "How do you conditionally render content in React?", options: ["Using `if/else` statements in JSX", "Using ternary operator or logical `&&`", "Using CSS `display: none`", "Both A and B"], correct: 3, explanation: "Conditional rendering in React is achieved using JavaScript `if/else` statements, ternary operators, or logical `&&` operator.", category: "react", level: "Beginner" },
    { id: 40, question: "What is the purpose of `key` prop in lists?", options: ["To uniquely identify elements", "To apply styles", "To store data", "To define component type"], correct: 0, explanation: "Keys help React identify which items have changed, are added, or are removed. They should be unique among siblings.", category: "react", level: "Beginner" },

    { id: 41, question: "Explain the `useEffect` hook and its dependency array.", options: ["It's for fetching data only; dependency array is for re-rendering.", "It's for side effects; dependency array controls when the effect re-runs.", "It replaces `render` method; dependency array is for props.", "It's for state management; dependency array is for initial values."], correct: 1, explanation: "`useEffect` handles side effects. The dependency array specifies values that, if changed, will cause the effect to re-run.", category: "react", level: "Intermediate" },
    { id: 42, question: "What is the difference between controlled and uncontrolled components?", options: ["Controlled components manage their own state, uncontrolled don't.", "Uncontrolled components manage their own state, controlled don't.", "Controlled components are faster.", "Uncontrolled components use hooks."], correct: 1, explanation: "Controlled components have their state managed by React, while uncontrolled components manage their own state internally (e.g., via refs).", category: "react", level: "Intermediate" },
    { id: 43, question: "When would you use `useContext`?", options: ["For local component state.", "For global state that needs to be accessed by many components at different nesting levels.", "For performing side effects.", "For optimizing component rendering."], correct: 1, explanation: "`useContext` provides a way to pass data through the component tree without having to pass props down manually at every level.", category: "react", level: "Intermediate" },
    { id: 44, question: "What is a Higher-Order Component (HOC)?", options: ["A component that renders another component.", "A function that takes a component and returns a new component with enhanced functionality.", "A component with higher priority.", "A component that fetches data."], correct: 1, explanation: "HOCs are an advanced technique in React for reusing component logic.", category: "react", level: "Intermediate" },
    { id: 45, question: "Explain the concept of `lifting state up`.", options: ["Moving state to a child component.", "Moving state to a common ancestor component.", "Lifting state to the global scope.", "Lifting state to a Redux store."], correct: 1, explanation: "Lifting state up means moving the state from a child component to its nearest common ancestor, allowing multiple children to share and synchronize that state.", category: "react", level: "Intermediate" },
    { id: 46, question: "What is `React.memo` and when should you use it?", options: ["It memoizes functions; use it always.", "It memoizes functional components to prevent re-renders if props haven't changed.", "It memoizes state; use it for large state objects.", "It's for class components only."], correct: 1, explanation: "`React.memo` is a HOC that memoizes functional components, preventing unnecessary re-renders if their props are the same.", category: "react", level: "Intermediate" },
    { id: 47, question: "Describe the React component lifecycle phases.", options: ["Mounting, Updating, Unmounting", "Creation, Destruction", "Loading, Displaying, Hiding", "Setup, Run, Teardown"], correct: 0, explanation: "React components go through mounting (initial render), updating (re-renders), and unmounting (removal from DOM) phases.", category: "react", level: "Intermediate" },
    { id: 48, question: "What are `Refs` in React and when are they useful?", options: ["References to external libraries.", "A way to access DOM nodes or React elements created in the render method.", "For managing component state.", "For passing props between components."], correct: 1, explanation: "Refs provide a way to access DOM nodes or React elements directly, useful for managing focus, text selection, or media playback.", category: "react", level: "Intermediate" },
    { id: 49, question: "How do you optimize performance in a React application?", options: ["Using `setState` frequently.", "Using `React.memo`, `useCallback`, `useMemo`, lazy loading, and code splitting.", "Avoiding hooks.", "Rendering everything on every update."], correct: 1, explanation: "Performance optimization in React involves techniques like memoization, lazy loading, and efficient state updates.", category: "react", level: "Intermediate" },
    { id: 50, question: "What is `Redux` and why is it used?", options: ["A React routing library.", "A predictable state container for JavaScript apps, used for managing global application state.", "A styling framework.", "A build tool for React."], correct: 1, explanation: "Redux helps manage complex application state in a predictable way, especially in large applications.", category: "react", level: "Intermediate" },

    { id: 51, question: "Implement a custom `useReducer` hook from scratch.", options: ["It's not possible to implement custom hooks.", "By using `useState` and a reducer function.", "By directly manipulating the DOM.", "By using `useEffect` only."], correct: 1, explanation: "A custom `useReducer` can be built using `useState` internally, managing state updates via a reducer function.", category: "react", level: "Hard" },
    { id: 52, question: "Explain `Server-Side Rendering (SSR)` and `Client-Side Rendering (CSR)` in React.", options: ["SSR renders on the client, CSR on the server.", "SSR renders on the server, CSR on the client.", "They are the same concept.", "SSR is for APIs, CSR is for UI."], correct: 1, explanation: "SSR generates HTML on the server for the initial load, improving SEO and perceived performance. CSR renders the entire application in the browser.", category: "react", level: "Hard" },
    { id: 53, question: "What are `Error Boundaries` and how do they work?", options: ["Components that catch JavaScript errors anywhere in their child component tree.", "Functions that throw errors.", "A way to prevent re-renders.", "A type of security feature."], correct: 0, explanation: "Error Boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI.", category: "react", level: "Hard" },
    { id: 54, question: "Discuss the pros and cons of using `Context API` vs. `Redux` for state management.", options: ["Context is always better than Redux.", "Redux is always better than Context.", "Context is simpler for small to medium apps, Redux for large, complex apps with strict state management needs.", "They are for different purposes entirely."], correct: 2, explanation: "Context API is good for simpler, less frequent updates or prop drilling. Redux offers more powerful debugging, middleware, and predictable state for complex applications.", category: "react", level: "Hard" },
    { id: 55, question: "How would you implement a drag-and-drop feature in React without external libraries?", options: ["It's impossible without a library.", "Using `onMouseDown`, `onMouseMove`, `onMouseUp` events and state management.", "Using CSS only.", "Using `useEffect` with an empty dependency array."], correct: 1, explanation: "Drag-and-drop can be implemented by tracking mouse events (`mousedown`, `mousemove`, `mouseup`) and updating element positions based on mouse coordinates.", category: "react", level: "Hard" },
    { id: 56, question: "Explain `Suspense` and `React.lazy`.", options: ["They are for data fetching only.", "They enable code-splitting and deferring rendering of a component until it's loaded.", "They are for server-side rendering.", "They replace `useEffect`."], correct: 1, explanation: "`React.lazy` allows you to render a dynamic import as a regular component. `Suspense` lets you 'wait' for some code to load and display a fallback while it's happening.", category: "react", level: "Hard" },
    { id: 57, question: "What is `reconciliation` in React?", options: ["The process of rendering components.", "The algorithm React uses to update the DOM efficiently by comparing the new virtual DOM with the previous one.", "A way to handle errors.", "A method for prop validation."], correct: 1, explanation: "Reconciliation is the process where React updates the browser's DOM to match the new React tree, using a diffing algorithm.", category: "react", level: "Hard" },
    { id: 58, question: "How do `useCallback` and `useMemo` improve performance?", options: ["They force re-renders.", "They prevent unnecessary re-creation of functions and re-computation of values, respectively, preventing child component re-renders.", "They are for state management.", "They are for fetching data."], correct: 1, explanation: "`useCallback` memoizes functions, and `useMemo` memoizes values, preventing unnecessary re-renders of child components that depend on them.", category: "react", level: "Hard" },
    { id: 59, question: "Describe the concept of `Portals` in React.", options: ["A way to navigate between pages.", "A way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.", "A method for creating reusable components.", "A type of higher-order component."], correct: 1, explanation: "Portals are useful for modals, tooltips, or anything that needs to break out of its parent's overflow or z-index.", category: "react", level: "Hard" },
    { id: 60, question: "How would you test a React component (unit, integration, end-to-end)?", options: ["Only unit testing is needed.", "Using Jest for unit, React Testing Library for integration, Cypress/Playwright for E2E.", "Manual testing only.", "Testing is not necessary in React."], correct: 1, explanation: "Different testing types (unit, integration, E2E) cover different aspects of component functionality and interaction.", category: "react", level: "Hard" },

    // --- Python Questions (30) ---
    { id: 61, question: "Which of the following is used to define a block of code in Python?", options: ["Parentheses", "Curly braces", "Indentation", "Keywords"], correct: 2, explanation: "Python uses indentation to define code blocks, unlike other languages that use curly braces.", category: "python", level: "Beginner" },
    { id: 62, question: "What is the correct way to comment a single line in Python?", options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"], correct: 1, explanation: "Single-line comments in Python start with `#`.", category: "python", level: "Beginner" },
    { id: 63, question: "Which data type is ordered and changeable, and allows duplicate members?", options: ["Tuple", "Set", "Dictionary", "List"], correct: 3, explanation: "Lists are ordered, changeable, and allow duplicate members.", category: "python", level: "Beginner" },
    { id: 64, question: "How do you create a function in Python?", options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"], correct: 1, explanation: "Functions in Python are defined using the `def` keyword.", category: "python", level: "Beginner" },
    { id: 65, question: "What is the output of `print(type([]))`?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0, explanation: "An empty square bracket `[]` denotes a list, and `type()` returns its class.", category: "python", level: "Beginner" },
    { id: 66, question: "Which of the following is NOT a built-in data type in Python?", options: ["int", "float", "char", "str"], correct: 2, explanation: "Python does not have a separate `char` data type; single characters are treated as strings.", category: "python", level: "Beginner" },
    { id: 67, question: "How do you import a module named `math`?", options: ["include math", "import math", "use math", "get math"], correct: 1, explanation: "The `import` statement is used to bring modules into the current namespace.", category: "python", level: "Beginner" },
    { id: 68, question: "What is the purpose of the `if __name__ == '__main__':` block?", options: ["To define a main function.", "To indicate the start of a program.", "To execute code only when the script is run directly, not when imported as a module.", "To handle errors."], correct: 2, explanation: "This block ensures code runs only when the script is executed as the main program.", category: "python", level: "Beginner" },
    { id: 69, question: "Which loop is used to iterate over a sequence (like a list, tuple, string) or other iterable objects?", options: ["while loop", "do-while loop", "for loop", "until loop"], correct: 2, explanation: "The `for` loop is commonly used for iterating over collections.", category: "python", level: "Beginner" },
    { id: 70, question: "What is the correct way to open a file in read mode?", options: ["open('file.txt', 'w')", "open('file.txt', 'r')", "open('file.txt', 'a')", "open('file.txt', 'x')"], correct: 1, explanation: "The 'r' mode opens a file for reading.", category: "python", level: "Beginner" },

    { id: 71, question: "Explain the difference between `append()`, `extend()`, and `insert()` for lists.", options: ["All add elements to the end.", "`append` adds a single element, `extend` adds elements from an iterable, `insert` adds at a specific index.", "They are interchangeable.", "`append` and `extend` are for tuples."], correct: 1, explanation: "`append()` adds a single item to the end. `extend()` adds all items from an iterable. `insert()` adds an item at a specified index.", category: "python", level: "Intermediate" },
    { id: 72, question: "What is a decorator in Python?", options: ["A function that modifies a class.", "A function that takes another function as an argument and extends its behavior without explicitly modifying it.", "A type of variable.", "A design pattern for creating singletons."], correct: 1, explanation: "Decorators are a powerful and unique feature in Python that allows adding functionality to an existing code.", category: "python", level: "Intermediate" },
    { id: 73, question: "Differentiate between `shallow copy` and `deep copy`.", options: ["Shallow copies duplicate all nested objects, deep copies don't.", "Deep copies duplicate all nested objects, shallow copies only copy references.", "They are the same.", "Shallow copy is faster."], correct: 1, explanation: "A shallow copy creates a new compound object and then inserts references into it to the objects found in the original. A deep copy creates a new compound object and then, recursively, inserts copies into it of the objects found in the original.", category: "python", level: "Intermediate" },
    { id: 74, question: "Explain `GIL (Global Interpreter Lock)` in Python.", options: ["It allows multiple threads to execute Python bytecodes simultaneously.", "It prevents multiple threads from executing Python bytecodes simultaneously in the same process.", "It's a security feature.", "It's a memory management tool."], correct: 1, explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once.", category: "python", level: "Intermediate" },
    { id: 75, question: "What is a `generator` in Python?", options: ["A function that generates random numbers.", "A function that returns an iterator that produces a sequence of values when iterated over.", "A class that generates objects.", "A keyword for creating loops."], correct: 1, explanation: "Generators are functions that use the `yield` keyword to produce a sequence of values, pausing execution and resuming on demand.", category: "python", level: "Intermediate" },
    { id: 76, question: "Describe `*args` and `**kwargs`.", options: ["They are used for defining fixed arguments.", "`*args` passes a variable number of non-keyword arguments, `**kwargs` passes a variable number of keyword arguments.", "They are used for unpacking lists.", "They are only for class methods."], correct: 1, explanation: "`*args` allows a function to accept any number of positional arguments, and `**kwargs` allows it to accept any number of keyword arguments.", category: "python", level: "Intermediate" },
    { id: 77, question: "What is `list comprehension`?", options: ["A way to create lists using a `for` loop inside square brackets.", "A method for sorting lists.", "A way to convert lists to dictionaries.", "A function for list manipulation."], correct: 0, explanation: "List comprehensions provide a concise way to create lists.", category: "python", level: "Intermediate" },
    { id: 78, question: "Explain `polymorphism` in Python.", options: ["The ability of an object to take on many forms.", "A way to restrict access to methods.", "A type of inheritance.", "A method for error handling."], correct: 0, explanation: "Polymorphism allows objects of different classes to be treated as objects of a common type, often through method overriding.", category: "python", level: "Intermediate" },
    { id: 79, question: "What is `MRO (Method Resolution Order)`?", options: ["The order in which methods are defined.", "The order in which Python searches for a method in a class hierarchy.", "A way to resolve naming conflicts.", "A method for optimizing method calls."], correct: 1, explanation: "MRO determines the order in which base classes are searched when executing a method in a class hierarchy with multiple inheritance.", category: "python", level: "Intermediate" },
    { id: 80, question: "How do you handle exceptions in Python?", options: ["Using `if/else` statements.", "Using `try`, `except`, `else`, `finally` blocks.", "Using `throw` and `catch`.", "Python does not have exception handling."], correct: 1, explanation: "Python uses `try-except` blocks to handle runtime errors.", category: "python", level: "Intermediate" },

    { id: 81, question: "Implement a custom context manager using `__enter__` and `__exit__`.", options: ["Using a decorator.", "By defining `__enter__` and `__exit__` methods in a class.", "Using a generator function.", "It's not possible without a library."], correct: 1, explanation: "Context managers allow you to allocate and release resources precisely using the `with` statement.", category: "python", level: "Hard" },
    { id: 82, question: "Explain the difference between `__init__`, `__new__`, and `__call__`.", options: ["`__init__` is for initialization, `__new__` for instance creation, `__call__` for making objects callable.", "They are all constructors.", "They are only for inheritance.", "They are interchangeable."], correct: 0, explanation: "`__new__` is called to create the instance, `__init__` to initialize it. `__call__` makes an instance callable like a function.", category: "python", level: "Hard" },
    { id: 83, question: "Describe how Python's garbage collection works.", options: ["It uses reference counting and a cyclic garbage collector.", "It uses only reference counting.", "It uses only a mark-and-sweep algorithm.", "Python does not have garbage collection."], correct: 0, explanation: "Python uses reference counting and a generational cyclic garbage collector to manage memory.", category: "python", level: "Hard" },
    { id: 84, question: "Implement a custom iterator for a sequence of numbers.", options: ["Using `for` loop.", "By defining `__iter__` and `__next__` methods in a class.", "Using a generator function only.", "By converting to a list."], correct: 1, explanation: "Custom iterators require implementing `__iter__` to return `self` and `__next__` to return the next item.", category: "python", level: "Hard" },
    { id: 85, question: "Explain `metaclasses` in Python.", options: ["Classes that define other classes.", "Classes that are used for inheritance.", "Classes that cannot be instantiated.", "A type of abstract class."], correct: 0, explanation: "A metaclass is the class of a class. It defines how a class behaves.", category: "python", level: "Hard" },
    { id: 86, question: "What is `descriptor` in Python?", options: ["A variable that describes an object.", "An object attribute with 'binding behavior', whose access has been overridden by methods in the descriptor protocol (`__get__`, `__set__`, `__delete__`).", "A type of decorator.", "A way to define properties."], correct: 1, explanation: "Descriptors are powerful, reusable objects that control how attributes are accessed.", category: "python", level: "Hard" },
    { id: 87, question: "How would you implement a thread-safe counter in Python?", options: ["Using a global variable.", "Using `threading.Lock` or `threading.Semaphore`.", "Using a list.", "It's not possible due to GIL."], correct: 1, explanation: "Even with GIL, threads can be preempted. Locks are necessary for thread-safe operations on shared resources.", category: "python", level: "Hard" },
    { id: 88, question: "Describe `asyncio` and `async/await` in Python.", options: ["They are for parallel processing.", "They are for concurrent programming using coroutines, allowing non-blocking I/O.", "They are for multithreading.", "They are for distributed computing."], correct: 1, explanation: "`asyncio` is a library to write concurrent code using the `async/await` syntax, primarily for I/O-bound and high-level structured network code.", category: "python", level: "Hard" },
    { id: 89, question: "Explain `Monkey Patching` in Python.", options: ["A way to fix bugs in code.", "Dynamically modifying or extending a class or module at runtime.", "A technique for code obfuscation.", "A method for code review."], correct: 1, explanation: "Monkey patching is the dynamic modification of a class or module at runtime, often used to inject or modify behavior.", category: "python", level: "Hard" },
    { id: 90, question: "What is the difference between `__slots__` and `__dict__`?", options: ["`__slots__` saves memory by preventing `__dict__` creation.", "`__dict__` saves memory by preventing `__slots__` creation.", "They are interchangeable.", "They are for different purposes."], correct: 0, explanation: "`__slots__` allows you to explicitly declare data members, preventing the creation of `__dict__` for each instance and saving memory.", category: "python", level: "Hard" },

    // --- Data Structures Questions (30) ---
    { id: 91, question: "What is the primary characteristic of an array?", options: ["Unordered elements", "Fixed size, contiguous memory locations", "Dynamic size, non-contiguous memory", "Key-value pairs"], correct: 1, explanation: "Arrays store elements of the same type in contiguous memory locations, allowing for efficient random access.", category: "dsa", level: "Beginner" },
    { id: 92, question: "In a Stack, which operation adds an element?", options: ["enqueue", "pop", "push", "insert"], correct: 2, explanation: "The `push` operation adds an element to the top of the stack (LIFO - Last In, First Out).", category: "dsa", level: "Beginner" },
    { id: 93, question: "Which data structure follows the FIFO principle?", options: ["Stack", "Queue", "Tree", "Linked List"], correct: 1, explanation: "Queue follows FIFO (First In, First Out), where the first element added is the first one to be removed.", category: "dsa", level: "Beginner" },
    { id: 94, question: "What is a node in a Linked List?", options: ["An array element", "A data element and a pointer to the next node", "A key-value pair", "A root element"], correct: 1, explanation: "Each node in a linked list typically contains data and a reference (or link) to the next node in the sequence.", category: "dsa", level: "Beginner" },
    { id: 95, question: "Which of these is a non-linear data structure?", options: ["Array", "Linked List", "Queue", "Tree"], correct: 3, explanation: "Trees are non-linear data structures because elements are not stored sequentially.", category: "dsa", level: "Beginner" },
    { id: 96, question: "What is a Hash Table primarily used for?", options: ["Sorting data", "Storing data in a fixed order", "Efficient key-value pair storage and retrieval", "Representing hierarchical data"], correct: 2, explanation: "Hash tables provide efficient data retrieval, insertion, and deletion based on keys.", category: "dsa", level: "Beginner" },
    { id: 97, question: "What is a Root Node in a Tree data structure?", options: ["Any node in the tree.", "The node with no children.", "The topmost node with no parent.", "The lowest node in the tree."], correct: 2, explanation: "The root node is the starting point of a tree, from which all other nodes descend.", category: "dsa", level: "Beginner" },
    { id: 98, question: "What is the worst-case time complexity for searching an element in an unsorted array?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correct: 2, explanation: "In the worst case, you might have to check every element in an unsorted array.", category: "dsa", level: "Beginner" },
    { id: 99, question: "Which data structure is best suited for implementing 'undo' functionality?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1, explanation: "A stack is ideal for undo operations because the last action performed is the first one to be undone (LIFO).", category: "dsa", level: "Beginner" },
    { id: 100, question: "What is the difference between a singly and doubly linked list?", options: ["Singly has two pointers, doubly has one.", "Singly has one pointer (next), doubly has two (next and previous).", "Doubly linked lists are always faster.", "Singly linked lists can only store numbers."], correct: 1, explanation: "A doubly linked list allows traversal in both forward and backward directions.", category: "dsa", level: "Beginner" },

    { id: 101, question: "Explain the concept of `collision resolution` in hash tables.", options: ["How to sort elements.", "Methods to handle when two different keys hash to the same index.", "How to encrypt data.", "How to resize the table."], correct: 1, explanation: "Collision resolution techniques include separate chaining (linked lists) and open addressing (linear probing, quadratic probing).", category: "dsa", level: "Intermediate" },
    { id: 102, question: "Differentiate between `BFS (Breadth-First Search)` and `DFS (Depth-First Search)` traversal in graphs.", options: ["BFS uses a stack, DFS uses a queue.", "BFS explores level by level, DFS explores as far as possible down each branch.", "They are the same.", "BFS is only for trees."], correct: 1, explanation: "BFS uses a queue, DFS uses a stack (or recursion). BFS is good for finding the shortest path in an unweighted graph.", category: "dsa", level: "Intermediate" },
    { id: 103, question: "What is a `Binary Search Tree (BST)` and its properties?", options: ["A tree where each node has at most one child.", "A tree where the left child is less than the parent, and the right child is greater than the parent.", "A tree used for sorting.", "A tree with fixed depth."], correct: 1, explanation: "BSTs allow for efficient searching, insertion, and deletion of nodes while maintaining sorted order.", category: "dsa", level: "Intermediate" },
    { id: 104, question: "Explain the concept of `Adjacency Matrix` vs. `Adjacency List` for graph representation.", options: ["Matrix is better for sparse graphs, List for dense.", "List is better for sparse graphs, Matrix for dense.", "They are interchangeable.", "Matrix is only for directed graphs."], correct: 1, explanation: "Adjacency List is space-efficient for sparse graphs. Adjacency Matrix is better for dense graphs and quick checking of edge existence.", category: "dsa", level: "Intermediate" },
    { id: 105, question: "What is a `Heap` data structure?", options: ["A type of linked list.", "A tree-based data structure that satisfies the heap property (min-heap or max-heap).", "A hash table.", "A sorted array."], correct: 1, explanation: "Heaps are used in priority queues and heap sort algorithms.", category: "dsa", level: "Intermediate" },
    { id: 106, question: "Describe the operations and time complexity of a `Deque (Double-Ended Queue)`.", options: ["Only add/remove from front.", "Add/remove from both ends, O(1) for most operations.", "Only add/remove from back.", "Slow operations."], correct: 1, explanation: "A Deque allows efficient insertion and deletion at both ends.", category: "dsa", level: "Intermediate" },
    { id: 107, question: "What is a `Trie` (Prefix Tree) and its main advantage?", options: ["A type of binary tree.", "A tree-like data structure used for efficient retrieval of a key in a dataset of strings.", "A data structure for numbers.", "A type of graph."], correct: 1, explanation: "Tries are very efficient for prefix matching and autocomplete features.", category: "dsa", level: "Intermediate" },
    { id: 108, question: "Explain the concept of `AVL Tree`.", options: ["A self-balancing binary search tree.", "A tree with fixed height.", "A tree that is always full.", "A tree with no duplicates."], correct: 0, explanation: "AVL trees ensure that the heights of the two child subtrees of any node differ by at most one, maintaining balance.", category: "dsa", level: "Intermediate" },
    { id: 109, question: "What is a `Disjoint Set Union (DSU)` data structure?", options: ["For finding shortest paths.", "For managing a collection of disjoint sets, supporting union and find operations.", "For sorting elements.", "For storing unique elements."], correct: 1, explanation: "DSU (also known as Union-Find) is used to keep track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.", category: "dsa", level: "Intermediate" },
    { id: 110, question: "Describe the use case for a `Segment Tree`.", options: ["For searching in unsorted arrays.", "For efficiently querying ranges (e.g., sum, min, max) and updating elements in an array.", "For graph traversal.", "For managing a queue."], correct: 1, explanation: "Segment trees are powerful for range queries and point updates on arrays.", category: "dsa", level: "Intermediate" },

    { id: 111, question: "Design a data structure to implement a `LRU (Least Recently Used) Cache`.", options: ["Using a stack and an array.", "Using a doubly linked list and a hash map.", "Using two arrays.", "Using a binary search tree."], correct: 1, explanation: "A doubly linked list maintains the order of usage, and a hash map provides O(1) lookup for keys.", category: "dsa", level: "Hard" },
    { id: 112, question: "Explain the properties and operations of a `Red-Black Tree`.", options: ["A self-balancing binary search tree with specific coloring rules to ensure balance.", "A tree that is always red.", "A tree with only two nodes.", "A tree used for network routing."], correct: 0, explanation: "Red-Black Trees are complex self-balancing BSTs that guarantee O(log n) time complexity for insertions, deletions, and lookups.", category: "dsa", level: "Hard" },
    { id: 113, question: "How would you implement a `Skip List`?", options: ["Using multiple sorted linked lists with different levels of 'express lanes'.", "Using a single linked list.", "Using an array of arrays.", "Using a hash table."], correct: 0, explanation: "Skip lists are probabilistic data structures that allow O(log n) average time complexity for search, insertion, and deletion operations by maintaining multiple levels of sorted linked lists.", category: "dsa", level: "Hard" },
    { id: 114, question: "Describe the concept of `Fenwick Tree (Binary Indexed Tree)` and its applications.", options: ["For graph traversal.", "A data structure that can efficiently update elements and calculate prefix sums in a table of numbers.", "For string matching.", "For managing a stack."], correct: 1, explanation: "Fenwick Trees are used for efficient range sum queries and point updates, often in competitive programming.", category: "dsa", level: "Hard" },
    { id: 115, question: "What is a `B-Tree` and where is it commonly used?", options: ["A binary tree for small datasets.", "A self-balancing tree data structure that keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time.", "Used primarily in main memory.", "A tree with no branches."], correct: 1, explanation: "B-Trees are optimized for systems that read and write large blocks of data, like databases and file systems.", category: "dsa", level: "Hard" },
    { id: 116, question: "Explain the `Trie` data structure's space and time complexity for insertion and search.", options: ["O(N) for both, where N is number of strings.", "O(L) for both, where L is length of key.", "O(1) for both.", "O(log N) for both."], correct: 1, explanation: "Trie operations are proportional to the length of the key, making them efficient for string operations.", category: "dsa", level: "Hard" },
    { id: 117, question: "How can you detect a cycle in a linked list?", options: ["By sorting the list.", "Using two pointers (Floyd's Cycle-Finding Algorithm).", "By converting to an array.", "It's not possible."], correct: 1, explanation: "Floyd's algorithm uses a slow pointer and a fast pointer; if they meet, there's a cycle.", category: "dsa", level: "Hard" },
    { id: 118, question: "Describe the `Skip List` data structure's probabilistic nature.", options: ["It uses random numbers to determine element values.", "It uses random numbers to determine the number of levels for each element, affecting performance probabilistically.", "It randomly sorts elements.", "It randomly deletes elements."], correct: 1, explanation: "The levels of elements in a skip list are chosen randomly, leading to probabilistic logarithmic performance.", category: "dsa", level: "Hard" },
    { id: 119, question: "What is a `Treap` data structure?", options: ["A tree that is also a heap.", "A binary search tree that also satisfies heap properties for priorities.", "A type of graph.", "A hash map with priorities."], correct: 1, explanation: "Treaps combine the properties of binary search trees (keys) and heaps (priorities) to ensure balance.", category: "dsa", level: "Hard" },
    { id: 120, question: "When would you use a `Suffix Tree` or `Suffix Array`?", options: ["For numerical data.", "For efficient string matching, pattern searching, and bioinformatics applications.", "For sorting arrays.", "For managing network connections."], correct: 1, explanation: "Suffix trees/arrays are advanced data structures for complex string operations, especially substring searching.", category: "dsa", level: "Hard" },

    // --- Algorithms Questions (30) ---
    { id: 121, question: "Which sorting algorithm has a worst-case time complexity of O(n^2)?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], correct: 2, explanation: "Bubble Sort, Insertion Sort, and Selection Sort all have O(n^2) worst-case time complexity.", category: "algorithms", level: "Beginner" },
    { id: 122, question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1, explanation: "Binary Search repeatedly divides the search interval in half.", category: "algorithms", level: "Beginner" },
    { id: 123, question: "Which algorithm finds the shortest path in an unweighted graph?", options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Breadth-First Search (BFS)", "Depth-First Search (DFS)"], correct: 2, explanation: "BFS guarantees the shortest path in terms of number of edges for unweighted graphs.", category: "algorithms", level: "Beginner" },
    { id: 124, question: "What is the main idea behind `Divide and Conquer` algorithms?", options: ["Solving a problem by breaking it into smaller subproblems.", "Solving a problem by iterating through all possibilities.", "Solving a problem using recursion only.", "Solving a problem by directly finding the solution."], correct: 0, explanation: "Divide and Conquer involves dividing a problem into smaller subproblems, solving them, and combining their solutions.", category: "algorithms", level: "Beginner" },
    { id: 125, question: "Which algorithm is used to find the minimum spanning tree in a graph?", options: ["Floyd-Warshall", "Prim's or Kruskal's Algorithm", "Topological Sort", "Linear Search"], correct: 1, explanation: "Prim's and Kruskal's are greedy algorithms for finding MSTs.", category: "algorithms", level: "Beginner" },
    { id: 126, question: "What is `recursion`?", options: ["A function calling itself.", "A loop that never ends.", "A way to optimize code.", "A method for sorting arrays."], correct: 0, explanation: "Recursion is a programming technique where a function calls itself to solve a problem.", category: "algorithms", level: "Beginner" },
    { id: 127, question: "What is the worst-case time complexity of Quick Sort?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], correct: 1, explanation: "Quick Sort's worst-case is O(n^2) if the pivot selection is consistently bad.", category: "algorithms", level: "Beginner" },
    { id: 128, question: "Which algorithm is used for searching an element in a sorted array?", options: ["Linear Search", "Binary Search", "Jump Search", "Both B and C"], correct: 3, explanation: "Binary Search is the most common, but Jump Search is also for sorted arrays.", category: "algorithms", level: "Beginner" },
    { id: 129, question: "What is the purpose of `Dynamic Programming`?", options: ["Solving problems by breaking them into overlapping subproblems and storing results.", "Solving problems by brute force.", "Solving problems by random guessing.", "Solving problems by recursion only."], correct: 0, explanation: "Dynamic Programming optimizes problems by storing results of subproblems to avoid re-computation.", category: "algorithms", level: "Beginner" },
    { id: 130, question: "Which algorithm is used to find all pairs shortest paths in a weighted graph?", options: ["Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Prim's Algorithm", "BFS"], correct: 1, explanation: "Floyd-Warshall finds the shortest paths between all pairs of vertices in a weighted graph.", category: "algorithms", level: "Beginner" },

    { id: 131, question: "Explain `Dijkstra's Algorithm` and its limitations.", options: ["Finds shortest paths in graphs with negative edge weights.", "Finds shortest paths in graphs with non-negative edge weights; fails with negative cycles.", "Finds longest paths.", "Sorts elements in a graph."], correct: 1, explanation: "Dijkstra's algorithm efficiently finds the shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights.", category: "algorithms", level: "Intermediate" },
    { id: 132, question: "What is the `Knapsack Problem` and its typical solution approach?", options: ["A sorting problem; solved with Quick Sort.", "An optimization problem; solved with Dynamic Programming or Greedy approach (for fractional).", "A graph traversal problem; solved with BFS.", "A search problem; solved with Binary Search."], correct: 1, explanation: "The Knapsack Problem is a classic optimization problem, often solved using dynamic programming for the 0/1 version.", category: "algorithms", level: "Intermediate" },
    { id: 133, question: "Differentiate between `Greedy Algorithms` and `Dynamic Programming`.", options: ["Greedy makes locally optimal choices, DP solves overlapping subproblems.", "Greedy is always better than DP.", "DP is always better than Greedy.", "They are the same."], correct: 0, explanation: "Greedy algorithms make locally optimal choices in the hope that they will lead to a globally optimal solution. Dynamic Programming solves problems by breaking them into subproblems and storing their solutions.", category: "algorithms", level: "Intermediate" },
    { id: 134, question: "Explain the `Traveling Salesperson Problem (TSP)` and its complexity.", options: ["Finding the shortest path between two cities; P-complete.", "Finding the shortest possible route that visits each city exactly once and returns to the origin city; NP-hard.", "A sorting problem; O(n log n).", "A search problem; O(log n)."], correct: 1, explanation: "TSP is a classic NP-hard optimization problem.", category: "algorithms", level: "Intermediate" },
    { id: 135, question: "What is `Topological Sort` and when is it used?", options: ["Sorting numbers in ascending order.", "Linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge uv, vertex u comes before v in the ordering.", "For sorting cyclic graphs.", "For finding shortest paths."], correct: 1, explanation: "Topological sort is used for scheduling tasks with dependencies.", category: "algorithms", level: "Intermediate" },
    { id: 136, question: "Describe the `Bellman-Ford Algorithm` and its use case.", options: ["Finds shortest paths in graphs with non-negative edge weights.", "Finds shortest paths from a single source in a weighted graph, even with negative edge weights, and can detect negative cycles.", "Finds longest paths.", "Used for sorting only."], correct: 1, explanation: "Bellman-Ford is more robust than Dijkstra's for graphs with negative edge weights.", category: "algorithms", level: "Intermediate" },
    { id: 137, question: "What is `Backtracking` and give an example.", options: ["A technique for undoing operations.", "A general algorithm for finding all (or some) solutions to computational problems, notably constraint satisfaction problems, by incrementally building candidates to the solutions, and abandoning a candidate ('backtracking') as soon as it determines that the candidate cannot possibly be completed to a valid solution.", "A type of sorting algorithm.", "A method for graph traversal."], correct: 1, explanation: "Examples include N-Queens, Sudoku solver, subset sum.", category: "algorithms", level: "Intermediate" },
    { id: 138, question: "Explain the `Kadane's Algorithm`.", options: ["For finding the shortest path in a graph.", "For finding the maximum sum subarray in a given array of integers.", "For sorting an array.", "For searching an element."], correct: 1, explanation: "Kadane's algorithm is a dynamic programming approach to solve the maximum subarray problem in O(n) time.", category: "algorithms", level: "Intermediate" },
    { id: 139, question: "What is `Branch and Bound`?", options: ["A technique for solving optimization problems, often used for NP-hard problems, by systematically enumerating all candidate solutions.", "A type of sorting algorithm.", "A graph traversal method.", "A search algorithm for sorted arrays."], correct: 0, explanation: "Branch and Bound explores a search space by dividing it into smaller subproblems and pruning branches that cannot lead to an optimal solution.", category: "algorithms", level: "Intermediate" },
    { id: 140, question: "Describe the `Floyd-Warshall Algorithm`.", options: ["Finds shortest path from a single source.", "Finds shortest paths between all pairs of vertices in a weighted graph.", "Finds minimum spanning tree.", "Used for topological sort."], correct: 1, explanation: "Floyd-Warshall is a dynamic programming algorithm for all-pairs shortest path problem.", category: "algorithms", level: "Intermediate" },

    { id: 141, question: "Implement `Merge Sort` and analyze its time and space complexity.", options: ["O(n^2) time, O(1) space.", "O(n log n) time, O(n) space.", "O(n) time, O(log n) space.", "O(log n) time, O(n) space."], correct: 1, explanation: "Merge Sort is a stable, efficient, comparison-based sorting algorithm with O(n log n) time and O(n) space complexity.", category: "algorithms", level: "Hard" },
    { id: 142, question: "Explain the `A* Search Algorithm` and its components.", options: ["A blind search algorithm.", "An informed search algorithm that finds the shortest path in a graph using a heuristic function and cost from start.", "A sorting algorithm.", "A random search algorithm."], correct: 1, explanation: "A* search combines Dijkstra's (cost from start) with Greedy Best-First Search (heuristic to goal) for optimal pathfinding.", category: "algorithms", level: "Hard" },
    { id: 143, question: "How would you implement `Kruskal's Algorithm` for MST?", options: ["Using BFS.", "Using a Disjoint Set Union (DSU) data structure to detect cycles while adding edges sorted by weight.", "Using DFS.", "Using a priority queue only."], correct: 1, explanation: "Kruskal's algorithm works by adding edges in increasing order of weight, avoiding cycles, using DSU for cycle detection.", category: "algorithms", level: "Hard" },
    { id: 144, question: "Describe the `Convex Hull` problem and a common algorithm to solve it.", options: ["Finding the largest circle in a set of points; solved by BFS.", "Finding the smallest convex polygon that encloses a given set of points; solved by algorithms like Graham Scan or Monotone Chain.", "Finding the shortest path between two points.", "A sorting problem."], correct: 1, explanation: "Convex Hull has applications in computational geometry, pattern recognition, and image processing.", category: "algorithms", level: "Hard" },
    { id: 145, question: "Explain the `Maximum Flow Minimum Cut Theorem`.", options: ["It states that the maximum flow through a network is equal to the minimum capacity of a cut separating the source and sink.", "It's about sorting networks.", "It's about finding shortest paths.", "It's a theorem for graph coloring."], correct: 0, explanation: "This theorem is fundamental in network flow problems and has applications in various fields like transportation and logistics.", category: "algorithms", level: "Hard" },
    { id: 146, question: "How does `Dynamic Programming` differ from `Memoization`?", options: ["They are the same.", "DP is a method for solving problems by breaking them into overlapping subproblems, while memoization is a specific optimization technique (caching) used within DP or recursion.", "Memoization is a type of recursion.", "DP is only for graphs."], correct: 1, explanation: "Memoization is a top-down approach (recursion with caching), while DP is typically bottom-up (iterative).", category: "algorithms", level: "Hard" },
    { id: 147, question: "Describe the `Suffix Array` construction algorithm (e.g., DC3 or Suffix Tree conversion).", options: ["A simple sorting algorithm.", "Complex algorithms used to build an array containing the starting positions of all suffixes of a string, sorted lexicographically.", "For numerical data only.", "For graph traversal."], correct: 1, explanation: "Suffix arrays are powerful for string matching and text indexing, often more space-efficient than suffix trees.", category: "algorithms", level: "Hard" },
    { id: 148, question: "Explain the `Z-Algorithm` for string matching.", options: ["A simple brute-force string matching.", "An efficient linear-time string matching algorithm that computes the Z-array for a given string.", "A sorting algorithm for strings.", "A hashing algorithm."], correct: 1, explanation: "The Z-Algorithm finds all occurrences of a pattern in a text in linear time.", category: "algorithms", level: "Hard" },
    { id: 149, question: "What is `Linear Programming` and its basic components?", options: ["A programming language.", "A mathematical method for determining a way to achieve the best outcome (such as maximum profit or lowest cost) in a given mathematical model for some list of requirements represented as linear relationships.", "A type of data structure.", "A graphical algorithm."], correct: 1, explanation: "Linear programming is used in operations research, economics, and engineering.", category: "algorithms", level: "Hard" },
    { id: 150, question: "Describe the `Closest Pair of Points` problem and an efficient algorithm to solve it.", options: ["A brute-force approach.", "Finding the two points in a set that are closest to each other, typically solved using a divide-and-conquer approach (e.g., O(n log n)).", "A sorting problem.", "A graph problem."], correct: 1, explanation: "The closest pair problem is a classic computational geometry problem.", category: "algorithms", level: "Hard" },
  ];

  // Filter questions based on selected category and level
  const filteredQuestions = questions.filter(q => 
    q.category === selectedCategory && 
    (selectedLevel === 'All' || q.level === selectedLevel)
  );

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
      toast.error(`No questions available for ${selectedCategory} - ${selectedLevel}. Please select another category or level.`);
      return;
    }
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(filteredQuestions.length).fill(null));
    setSelectedAnswer(null);
    setShowResults(false);
    setTimeLeft(300); // Reset timer for each quiz start
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
    
    const correctAnswers = newAnswers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correct
    ).length;
    
    const score = Math.round((correctAnswers / filteredQuestions.length) * 100);
    const points = score * 10;
    addPoints(points);
    
    toast.success(`Quiz completed! You scored ${score}% and earned ${points} points!`);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setTimeLeft(300);
    setSelectedLevel('All'); // Reset level selection
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

  if (!quizStarted) {
    return (
      <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Programming Quiz
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Test your programming knowledge and earn points
            </p>
          </motion.div>

          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Select Category:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {category.questions} questions
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Select Difficulty:</h2>
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['All', 'Beginner', 'Intermediate', 'Hard'].map(level => (
              <Button
                key={level}
                onClick={() => setSelectedLevel(level as 'All' | 'Beginner' | 'Intermediate' | 'Hard')}
                variant={selectedLevel === level ? 'primary' : 'outline'}
                className={`min-w-[120px] ${selectedLevel === level ? 'bg-blue-600 text-white' : ''}`}
              >
                {level}
              </Button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Card className="max-w-md mx-auto">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quiz Rules
              </h3>
              <ul className={`text-left space-y-2 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• 5 minutes time limit</li>
                <li>• Multiple choice questions</li>
                <li>• Earn points based on your score</li>
                <li>• You can navigate between questions</li>
              </ul>
              <Button onClick={startQuiz} size="lg" className="w-full">
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = answers.filter((answer, index) => 
      answer === filteredQuestions[index]?.correct
    ).length;
    const score = Math.round((correctAnswers / filteredQuestions.length) * 100);

    return (
      <div className={`min-h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <Card className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quiz Completed!
              </h2>
              <div className={`text-4xl font-bold mb-4 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                You got {correctAnswers} out of {filteredQuestions.length} questions correct
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()}> {/* Reload to reset all states */}
                  New Quiz
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <Card key={question.id}>
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
                    <h3 className={`font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
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
              </Card>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h1 className={`text-2xl font-bold text-center sm:text-left mb-2 sm:mb-0 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {categories.find(c => c.id === selectedCategory)?.name} Quiz ({selectedLevel} Level)
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
          
          {/* Progress Bar */}
          <div className={`w-full bg-gray-200 rounded-full h-2 ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8">
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
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <Button
            onClick={currentQuestion === filteredQuestions.length - 1 ? handleSubmitQuiz : handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === filteredQuestions.length - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
