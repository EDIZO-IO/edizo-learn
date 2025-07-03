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
    tags: ['Array', 'Hash Table']
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
    tags: ['Linked List', 'Recursion']
  }
  // Add more problems as needed
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