export type LogicRuleID = 'RULE_A' | 'RULE_B' | 'RULE_C' | 'RULE_D' | 'RULE_E';

export interface LogicGridConfig {
  grid: number[]; // 9 numbers (1-9 shuffled)
  rule: LogicRuleID;
  solution: number[]; // Array of the numbers the user needs to select in order
}

const shuffle = (array: number[]): number[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generateLogicGrid = (): LogicGridConfig => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const grid = shuffle(numbers);

  const rules: LogicRuleID[] = ['RULE_A', 'RULE_B', 'RULE_C', 'RULE_D', 'RULE_E'];
  const rule = rules[Math.floor(Math.random() * rules.length)];

  let solution: number[] = [];

  switch (rule) {
    case 'RULE_A':
      // Top-left (0), bottom-right (8), center (4)
      solution = [grid[0], grid[8], grid[4]];
      break;
    case 'RULE_B':
      // Smallest odd, largest even
      const odds = grid.filter(n => n % 2 !== 0);
      const evens = grid.filter(n => n % 2 === 0);
      solution = [Math.min(...odds), Math.max(...evens)];
      break;
    case 'RULE_C':
      // Largest number, smallest number
      solution = [Math.max(...grid), Math.min(...grid)];
      break;
    case 'RULE_D':
      // Center row from left to right (indices 3, 4, 5)
      solution = [grid[3], grid[4], grid[5]];
      break;
    case 'RULE_E':
      // Four corners clockwise from top-left (0, 2, 8, 6)
      solution = [grid[0], grid[2], grid[8], grid[6]];
      break;
  }

  return { grid, rule, solution };
};
