// tutorialData.tsx
// This file contains the data for the programming tutorials.

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  content: string; // Full content for the tutorial page
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  image: string;
  author: string;
  isBookmarked: boolean;
  progress: number; // Percentage of completion
  sections: Array<{ title: string; content: string }>; // For detailed tutorial content
}

export const allTutorials: Tutorial[] = [
  {
    id: 1,
    title: 'Complete JavaScript Fundamentals',
    description: 'Master JavaScript from basics to advanced concepts including ES6+, async/await, and more.',
    content: `
      <h2>Introduction to JavaScript</h2>
      <p>JavaScript is a versatile programming language used for web development, server-side applications, mobile apps, and more. This tutorial will guide you through its core concepts.</p>
      
      <h3>Variables and Data Types</h3>
      <p>Learn about different ways to declare variables (var, let, const) and fundamental data types like strings, numbers, booleans, null, and undefined.</p>
      
      <h3>Operators and Control Flow</h3>
      <p>Understand arithmetic, assignment, comparison, and logical operators. Explore conditional statements (if/else, switch) and loops (for, while, do-while).</p>
      
      <h3>Functions and Scope</h3>
      <p>Dive into functions, function expressions, arrow functions, and the concept of scope (global, local, block).</p>
      
      <h3>ES6+ Features</h3>
      <p>Discover modern JavaScript features like template literals, destructuring, spread/rest operators, and modules.</p>
      
      <h3>Asynchronous JavaScript</h3>
      <p>Understand callbacks, Promises, and the powerful async/await syntax for handling asynchronous operations efficiently.</p>
      
      <p>By the end of this tutorial, you will have a solid foundation in JavaScript, enabling you to build dynamic and interactive web applications.</p>
    `,
    category: 'javascript',
    difficulty: 'beginner',
    duration: '4 hours',
    rating: 4.8,
    students: 1250,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    author: 'John Doe',
    isBookmarked: false,
    progress: 0,
    sections: [
      { title: 'Introduction to JavaScript', content: '<p>JavaScript is a versatile programming language used for web development, server-side applications, mobile apps, and more. This tutorial will guide you through its core concepts.</p>' },
      { title: 'Variables and Data Types', content: '<p>Learn about different ways to declare variables (var, let, const) and fundamental data types like strings, numbers, booleans, null, and undefined.</p>' },
      { title: 'Operators and Control Flow', content: '<p>Understand arithmetic, assignment, comparison, and logical operators. Explore conditional statements (if/else, switch) and loops (for, while, do-while).</p>' },
      { title: 'Functions and Scope', content: '<p>Dive into functions, function expressions, arrow functions, and the concept of scope (global, local, block).</p>' },
      { title: 'ES6+ Features', content: '<p>Discover modern JavaScript features like template literals, destructuring, spread/rest operators, and modules.</p>' },
      { title: 'Asynchronous JavaScript', content: '<p>Understand callbacks, Promises, and the powerful async/await syntax for handling asynchronous operations efficiently.</p>' },
    ]
  },
  {
    id: 2,
    title: 'React Hooks Deep Dive',
    description: 'Learn all React hooks with practical examples and build real-world applications.',
    content: `
      <h2>Mastering React Hooks</h2>
      <p>React Hooks allow you to use state and other React features without writing a class. This deep dive covers essential hooks and their advanced use cases.</p>
      
      <h3>useState: State Management</h3>
      <p>The most fundamental hook for adding state to functional components. Learn about its basic usage, lazy initialization, and functional updates.</p>
      
      <h3>useEffect: Side Effects</h3>
      <p>Understand how to perform side effects like data fetching, subscriptions, and manual DOM manipulations. Explore dependency arrays to control effect re-runs.</p>
      
      <h3>useContext: Global State</h3>
      <p>Simplify prop drilling by using useContext to access context values directly in your components.</p>
      
      <h3>useRef: Direct DOM Access & Mutable Values</h3>
      <p>Learn to use useRef for accessing DOM elements, managing focus, and persisting mutable values across renders without triggering re-renders.</p>
      
      <h3>Custom Hooks: Reusable Logic</h3>
      <p>Discover how to create your own custom hooks to encapsulate and reuse stateful logic across multiple components.</p>
      
      <p>This tutorial will equip you with the knowledge to write cleaner, more efficient, and more maintainable React components using Hooks.</p>
    `,
    category: 'react',
    difficulty: 'intermediate',
    duration: '3.5 hours',
    rating: 4.9,
    students: 890,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    author: 'Jane Smith',
    isBookmarked: true,
    progress: 60,
    sections: [
      { title: 'Mastering React Hooks', content: '<p>React Hooks allow you to use state and other React features without writing a class. This deep dive covers essential hooks and their advanced use cases.</p>' },
      { title: 'useState: State Management', content: '<p>The most fundamental hook for adding state to functional components. Learn about its basic usage, lazy initialization, and functional updates.</p>' },
      { title: 'useEffect: Side Effects', content: '<p>Understand how to perform side effects like data fetching, subscriptions, and manual DOM manipulations. Explore dependency arrays to control effect re-runs.</p>' },
      { title: 'useContext: Global State', content: '<p>Simplify prop drilling by using useContext to access context values directly in your components.</p>' },
      { title: 'useRef: Direct DOM Access & Mutable Values', content: '<p>Learn to use useRef for accessing DOM elements, managing focus, and persisting mutable values across renders without triggering re-renders.</p>' },
      { title: 'Custom Hooks: Reusable Logic', content: '<p>Discover how to create your own custom hooks to encapsulate and reuse stateful logic across multiple components.</p>' },
    ]
  },
  {
    id: 3,
    title: 'Python for Data Science',
    description: 'Complete guide to Python programming for data analysis and machine learning.',
    content: `
      <h2>Python for Data Science: A Comprehensive Guide</h2>
      <p>Python has become the de-facto language for data science due to its simplicity and powerful libraries. This tutorial covers everything from Python basics to advanced data science applications.</p>
      
      <h3>Python Fundamentals for Data Science</h3>
      <p>Review Python syntax, data structures (lists, dictionaries), control flow, and functions, with a focus on their application in data manipulation.</p>
      
      <h3>NumPy: Numerical Computing</h3>
      <p>Explore NumPy arrays, vectorized operations, and essential functions for high-performance numerical computations.</p>
      
      <h3>Pandas: Data Manipulation and Analysis</h3>
      <p>Master DataFrames, Series, data loading, cleaning, transformation, aggregation, and merging data for robust data analysis.</p>
      
      <h3>Matplotlib & Seaborn: Data Visualization</h3>
      <p>Learn to create compelling static, animated, and interactive visualizations to uncover insights from your data.</p>
      
      <h3>Scikit-learn: Machine Learning Basics</h3>
      <p>Introduction to supervised and unsupervised learning algorithms, model training, evaluation, and basic machine learning workflows.</p>
      
      <p>By completing this tutorial, you will be well-equipped to tackle various data science problems and build predictive models using Python.</p>
    `,
    category: 'python',
    difficulty: 'intermediate',
    duration: '6 hours',
    rating: 4.7,
    students: 2100,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    author: 'Mike Johnson',
    isBookmarked: false,
    progress: 0,
    sections: [
      { title: 'Python Fundamentals for Data Science', content: '<p>Review Python syntax, data structures (lists, dictionaries), control flow, and functions, with a focus on their application in data manipulation.</p>' },
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
    content: `
      <h2>Understanding Binary Trees</h2>
      <p>Binary trees are fundamental data structures in computer science, widely used for efficient data organization and retrieval. This tutorial covers their structure, properties, and various traversal methods.</p>
      
      <h3>What is a Binary Tree?</h3>
      <p>Learn the definition of a binary tree, its nodes (root, parent, child, leaf), and basic terminology like depth, height, and level.</p>
      
      <h3>Types of Binary Trees</h3>
      <p>Explore different types including full, complete, perfect, balanced, and degenerate binary trees.</p>
      
      <h3>Binary Search Trees (BST)</h3>
      <p>Understand the properties of a Binary Search Tree and how it enables efficient searching, insertion, and deletion operations.</p>
      
      <h3>Tree Traversals</h3>
      <p>Master the three main tree traversal algorithms: Inorder, Preorder, and Postorder. We'll discuss both recursive and iterative approaches for each.</p>
      
      <h3>Applications of Binary Trees</h3>
      <p>Discover real-world applications of binary trees, such as representing hierarchical data, implementing expression parsers, and efficient searching in databases.</p>
      
      <p>This tutorial provides a solid theoretical and practical understanding of binary trees, a crucial topic for competitive programming and software development interviews.</p>
    `,
    category: 'dsa',
    difficulty: 'advanced',
    duration: '2.5 hours',
    rating: 4.6,
    students: 650,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    content: `
      <h2>Demystifying Sorting Algorithms</h2>
      <p>Sorting algorithms are algorithms that put elements of a list in a certain order. This tutorial provides an in-depth look at various sorting techniques, their working principles, and performance characteristics.</p>
      
      <h3>Bubble Sort</h3>
      <p>A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
      
      <h3>Selection Sort</h3>
      <p>The algorithm divides the input list into two parts: a sorted sublist and the remaining unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the sorted sublist.</p>
      
      <h3>Insertion Sort</h3>
      <p>Builds the final sorted array (or list) one item at a time. It iterates through the input elements and grows a sorted output list.</p>
      
      <h3>Merge Sort</h3>
      <p>A divide and conquer algorithm that divides the unsorted list into n sublists, each containing one element, and then repeatedly merges sublists to produce new sorted sublists until there is only one sorted sublist remaining.</p>
      
      <h3>Quick Sort</h3>
      <p>Another divide and conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.</p>
      
      <h3>Heap Sort</h3>
      <p>A comparison-based sorting algorithm that uses a binary heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.</p>
      
      <p>Understanding sorting algorithms is fundamental for optimizing data processing and a common topic in algorithm design and analysis.</p>
    `,
    category: 'algorithms',
    difficulty: 'intermediate',
    duration: '3 hours',
    rating: 4.8,
    students: 980,
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    content: `
      <h2>Advanced React Patterns for Scalable Applications</h2>
      <p>Beyond the basics, advanced React patterns help you build more flexible, reusable, and maintainable components, especially in large-scale applications.</p>
      
      <h3>Render Props</h3>
      <p>A technique for sharing code between React components using a prop whose value is a function. This function renders what the component needs to render.</p>
      
      <h3>Higher-Order Components (HOCs)</h3>
      <p>HOCs are functions that take a component as an argument and return a new component with enhanced capabilities. They are a powerful pattern for code reuse and logic abstraction.</p>
      
      <h3>Compound Components</h3>
      <p>This pattern allows you to build components that work together to share implicit state and logic, providing a flexible and expressive API to users.</p>
      
      <h3>Controlled vs. Uncontrolled Components</h3>
      <p>Understand the differences between controlled components (where form data is handled by React state) and uncontrolled components (where form data is handled by the DOM itself).</p>
      
      <h3>Context API for Global State</h3>
      <p>While \`useContext\` is a hook, understanding the broader Context API is crucial for managing global state without prop drilling, especially when combined with reducers for complex state.</p>
      
      <h3>Performance Optimization Patterns</h3>
      <p>Explore techniques like memoization (\`React.memo\`, \`useMemo\`, \`useCallback\`), lazy loading (\`React.lazy\`, \`Suspense\`), and virtualization to optimize the performance of your React applications.</p>
      
      <p>Mastering these advanced patterns will significantly elevate your React development skills, enabling you to write more robust and performant applications.</p>
    `,
    category: 'react',
    difficulty: 'advanced',
    duration: '4.5 hours',
    rating: 4.9,
    students: 720,
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
    author: 'Emily Davis',
    isBookmarked: false,
    progress: 0,
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
    content: `
      <h2>SQL Fundamentals for Beginners</h2>
      <p>Structured Query Language (SQL) is the standard language for relational database management systems. This tutorial will introduce you to the core concepts of SQL, enabling you to interact with databases effectively.</p>
      
      <h3>Introduction to Databases</h3>
      <p>Understand what databases are, why they are used, and the concept of relational databases.</p>
      
      <h3>Basic SQL Commands: SELECT, FROM, WHERE</h3>
      <p>Learn how to retrieve data from tables using the SELECT and FROM clauses, and how to filter results using the WHERE clause.</p>
      
      <h3>Data Manipulation: INSERT, UPDATE, DELETE</h3>
      <p>Master commands for adding new records (INSERT), modifying existing records (UPDATE), and removing records (DELETE) from your tables.</p>
      
      <h3>Table Creation and Modification: CREATE TABLE, ALTER TABLE, DROP TABLE</h3>
      <p>Understand how to define database schemas by creating new tables, altering their structure, and dropping them.</p>
      
      <h3>Joining Tables: INNER JOIN, LEFT JOIN, RIGHT JOIN</h3>
      <p>Learn to combine data from multiple tables using various JOIN operations to retrieve related information.</p>
      
      <h3>Aggregation and Grouping: COUNT, SUM, AVG, GROUP BY, HAVING</h3>
      <p>Explore aggregate functions to perform calculations on sets of rows and how to group results using GROUP BY and filter groups with HAVING.</p>
      
      <p>By the end of this tutorial, you will be able to write basic to intermediate SQL queries to manage and analyze data in relational databases.</p>
    `,
    category: 'db',
    difficulty: 'beginner',
    duration: '5 hours',
    rating: 4.7,
    students: 1500,
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400',
    author: 'Robert Lee',
    isBookmarked: false,
    progress: 0,
    sections: [
      { title: 'Introduction to Databases', content: '<p>Understand what databases are, why they are used, and the concept of relational databases.</p>' },
      { title: 'Basic SQL Commands: SELECT, FROM, WHERE', content: '<p>Learn how to retrieve data from tables using the SELECT and FROM clauses, and how to filter results using the WHERE clause.</p>' },
      { title: 'Data Manipulation: INSERT, UPDATE, DELETE', content: '<p>Master commands for adding new records (INSERT), modifying existing records (UPDATE), and removing records (DELETE) from your tables.</p>' },
      { title: 'Table Creation and Modification: CREATE TABLE, ALTER TABLE, DROP TABLE', content: '<p>Understand how to define database schemas by creating new tables, altering their structure, and dropping them.</p>' },
      { title: 'Joining Tables: INNER JOIN, LEFT JOIN, RIGHT JOIN', content: '<p>Learn to combine data from multiple tables using various JOIN operations to retrieve related information.</p>' },
      { title: 'Aggregation and Grouping: COUNT, SUM, AVG, GROUP BY, HAVING', content: '<p>Explore aggregate functions to perform calculations on sets of rows and how to group results using GROUP BY and filter groups with HAVING.</p>' },
    ]
  },
  {
    id: 8,
    title: 'Introduction to System Design',
    description: 'Learn the core concepts and principles of designing scalable and reliable systems.',
    content: `
      <h2>System Design Basics</h2>
      <p>System design is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. This tutorial introduces fundamental concepts for designing scalable and reliable software systems.</p>
      
      <h3>Scalability</h3>
      <p>Understand different types of scalability (vertical vs. horizontal) and techniques like load balancing, caching, and database sharding to handle increasing traffic and data.</p>
      
      <h3>Reliability and Availability</h3>
      <p>Explore concepts like fault tolerance, redundancy, and disaster recovery to ensure your system remains operational even in the face of failures.</p>
      
      <h3>Consistency and CAP Theorem</h3>
      <p>Delve into data consistency models (strong, eventual) and the CAP theorem (Consistency, Availability, Partition Tolerance) in distributed systems.</p>
      
      <h3>Distributed Systems Concepts</h3>
      <p>Learn about distributed computing challenges, inter-service communication (RPC, message queues), and distributed consensus algorithms.</p>
      
      <h3>Common System Design Patterns</h3>
      <p>Introduction to frequently used patterns like API Gateway, Service Discovery, Circuit Breaker, and Event Sourcing.</p>
      
      <p>This tutorial provides a foundational understanding of system design principles, essential for aspiring architects and senior engineers.</p>
    `,
    category: 'system',
    difficulty: 'intermediate',
    duration: '4 hours',
    rating: 4.5,
    students: 900,
    image: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=400',
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
];
