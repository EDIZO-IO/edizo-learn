export const problems = {
  '1': {
    id: '1',
    title: 'Two Sum',
    difficulty: 'easy',
    frequency: 95,
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
    solution: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    explanation: `We use a hash table to store the value and its index as we iterate through the array. For each element, we calculate the complement (target - current element) and check if it exists in the hash table. If it does, we return the indices of the current element and its complement. This approach has a time complexity of O(n) and space complexity of O(n).`,
    company: 'google',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['Array', 'Hash Table'],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers.",
      "Use a hash table to store the value and index as you iterate."
    ],
    relatedProblems: [
      { id: '4', title: 'Maximum Subarray' }, // Changed to an existing problem ID
      { id: '9', title: 'Product of Array Except Self' } // Changed to an existing problem ID
    ]
  },
  '2': {
    id: '2',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    frequency: 88,
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
    solution: `function reverseList(head: ListNode | null): ListNode | null {
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
    explanation: `We use three pointers: prev, current, and next. We iterate through the list, reversing the links between nodes. The time complexity is O(n) and space complexity is O(1).`,
    company: 'microsoft',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['Linked List', 'Recursion'],
    hints: [
      "Think about how you would reverse a stack of plates one by one.",
      "You need to change the direction of the pointers as you traverse the list."
    ],
    relatedProblems: [
      { id: '5', title: 'Merge Two Sorted Lists' }, // Changed to an existing problem ID
      { id: '7', title: 'Binary Tree Inorder Traversal' } // Changed to an existing problem ID
    ]
  },
   '3': {
    id: '3',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    frequency: 90,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The parentheses are properly closed.'
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All types of brackets are properly closed.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    solution: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (!map[char]) {
      stack.push(char);
    } else if (stack.pop() !== map[char]) {
      return false;
    }
  }
  
  return stack.length === 0;
}`,
    explanation: `We use a stack to keep track of opening brackets. When we encounter a closing bracket, we check if it matches the last opening bracket. Time complexity is O(n) and space complexity is O(n).`,
    company: 'amazon',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['String', 'Stack'],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When a closing bracket is encountered, check if the stack's top matches."
    ],
    relatedProblems: [
      { id: '8', title: 'Valid Anagram' }, // Changed to an existing problem ID
      { id: '1', title: 'Two Sum' } // Changed to an existing problem ID
    ]
  },
  '4': {
    id: '4',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    frequency: 85,
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    solution: `function maxSubArray(nums: number[]): number {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }
  
  return maxGlobal;
}`,
    explanation: `Kadane's algorithm is used to find the maximum subarray sum. We keep track of the maximum sum ending at each position and the global maximum. Time complexity is O(n) and space complexity is O(1).`,
    company: 'facebook',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['Array', 'Dynamic Programming'],
    hints: [
      "Use Kadane's algorithm.",
      "Keep track of the current maximum sum and the overall maximum sum."
    ],
    relatedProblems: [
      { id: '6', title: 'Best Time to Buy and Sell Stock' }, // Changed to an existing problem ID
      { id: '9', title: 'Product of Array Except Self' } // Changed to an existing problem ID
    ]
  },
  '5': {
    id: '5',
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    frequency: 80,
    description: `Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.`,
    examples: [
      {
        input: 'l1 = [1,2,4], l2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'The lists are merged in sorted order.'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100',
      'Both l1 and l2 are sorted in non-decreasing order'
    ],
    solution: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let current = dummy;
  
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 !== null ? l1 : l2;
  return dummy.next;
}`,
    explanation: `We use a dummy node to build the merged list. We compare nodes from both lists and attach the smaller one to the merged list. Time complexity is O(n+m) and space complexity is O(1).`,
    company: 'apple',
    category: 'dsa',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)',
    tags: ['Linked List', 'Recursion'],
    hints: [
      "Use a dummy node to simplify edge cases.",
      "Iterate through both lists, comparing nodes and appending the smaller one."
    ],
    relatedProblems: [
      { id: '2', title: 'Reverse Linked List' }, // Changed to an existing problem ID
      { id: '7', title: 'Binary Tree Inorder Traversal' } // Changed to an existing problem ID
    ]
  },
  '6': {
    id: '6',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    frequency: 82,
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    solution: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  
  return maxProfit;
}`,
    explanation: `We track the minimum price and calculate potential profit at each day. The maximum profit is updated whenever we find a higher profit. Time complexity is O(n) and space complexity is O(1).`,
    company: 'google',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['Array', 'Dynamic Programming'],
    hints: [
      "Keep track of the minimum price encountered so far.",
      "Calculate the profit at each step and update the maximum profit."
    ],
    relatedProblems: [
      { id: '4', title: 'Maximum Subarray' }, // Changed to an existing problem ID
      { id: '1', title: 'Two Sum' } // Changed to an existing problem ID
    ]
  },
  '7': {
    id: '7',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'easy',
    frequency: 75,
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal visits nodes in left-root-right order.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]',
      '-100 <= Node.val <= 100'
    ],
    solution: `function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
    explanation: `We perform a recursive inorder traversal (left-root-right). Time complexity is O(n) and space complexity is O(n) in worst case (skewed tree).`,
    company: 'microsoft',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['Binary Tree', 'Stack'],
    hints: [
      "Understand the definition of inorder traversal (left, root, right).",
      "A recursive approach is often the most straightforward."
    ],
    relatedProblems: [
      { id: '2', title: 'Reverse Linked List' }, // Changed to an existing problem ID
      { id: '5', title: 'Merge Two Sorted Lists' } // Changed to an existing problem ID
    ]
  },
  '8': {
    id: '8',
    title: 'Valid Anagram',
    difficulty: 'easy',
    frequency: 78,
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true',
        explanation: 'Both strings contain the same letters in different order.'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    solution: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  
  const count: Record<string, number> = {};
  
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}`,
    explanation: `We count the frequency of each character in the first string, then verify the second string has the same character counts. Time complexity is O(n) and space complexity is O(1) (fixed size alphabet).`,
    company: 'facebook',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['String', 'Hash Table'],
    hints: [
      "If two strings are anagrams, they must have the same length.",
      "Count the frequency of characters in both strings."
    ],
    relatedProblems: [
      { id: '3', title: 'Valid Parentheses' }, // Changed to an existing problem ID
      { id: '1', title: 'Two Sum' } // Changed to an existing problem ID
    ]
  },
  '9': {
    id: '9',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    frequency: 83,
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.`,
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]',
        explanation: 'Each element is the product of all other elements.'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'
    ],
    solution: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  
  // Calculate left products
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = leftProduct;
    leftProduct *= nums[i];
  }
  
  // Calculate right products and multiply with left products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= rightProduct;
    rightProduct *= nums[i];
  }
  
  return answer;
}`,
    explanation: `We first calculate the product of all elements to the left of each element, then multiply it with the product of all elements to the right. Time complexity is O(n) and space complexity is O(1) (excluding output array).`,
    company: 'amazon',
    category: 'dsa',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['Array', 'Prefix Sum'],
    hints: [
      "Consider calculating prefix products and suffix products separately.",
      "The result for an index `i` is `prefix_product[i-1] * suffix_product[i+1]`."
    ],
    relatedProblems: [
      { id: '4', title: 'Maximum Subarray' }, // Changed to an existing problem ID
      { id: '6', title: 'Best Time to Buy and Sell Stock' } // Changed to an existing problem ID
    ]
  },
  '10': {
    id: '10',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'medium',
    frequency: 79,
    description: `There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
        explanation: 'Target 0 is found at index 4.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.',
      '-10^4 <= target <= 10^4'
    ],
    solution: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) return mid;
    
    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}`,
    explanation: `We use binary search to find the target in the rotated array. We determine which half is sorted and check if the target lies within that range. Time complexity is O(log n) and space complexity is O(1).`,
    company: 'google',
    category: 'dsa',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['Array', 'Binary Search'],
    hints: [
      "This is a modified binary search problem.",
      "Determine which half of the array is sorted and narrow down the search space accordingly."
    ],
    relatedProblems: [
      { id: '1', title: 'Two Sum' }, // Changed to an existing problem ID
      { id: '4', title: 'Maximum Subarray' } // Changed to an existing problem ID
    ]
  }
};


export const interviewQuestions = Object.values(problems).map(problem => ({
  id: problem.id,
  title: problem.title,
  description: problem.description.split('\n')[0], // first line
  company: problem.company,
  difficulty: problem.difficulty,
  category: problem.category,
  timeComplexity: problem.timeComplexity,
  spaceComplexity: problem.spaceComplexity,
  frequency: problem.frequency,
  tags: problem.tags
}));
