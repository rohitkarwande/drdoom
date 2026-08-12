export const SYMBOL_GROUPS = [
  ['Ϙ', 'Ѭ', 'Ҩ', 'Ѯ', 'Ӝ', 'Җ'],
  ['Ӭ', 'Ѫ', 'Ҵ', 'Ӷ', 'Ϙ', 'Ѯ'],
  ['Ӻ', 'Ԇ', 'Ѭ', 'Җ', 'Ӭ', 'Ҵ'],
];

export interface SymbolConfig {
  symbols: string[]; // 4 symbols displayed to user (shuffled)
  solution: string[]; // The same 4 symbols sorted according to their order in the matching group
}

export const generateSymbolSequence = (): SymbolConfig => {
  // 1. Pick a random group
  const groupIndex = Math.floor(Math.random() * SYMBOL_GROUPS.length);
  const group = SYMBOL_GROUPS[groupIndex];

  // 2. Pick 4 random distinct symbols from this group
  const shuffledGroup = [...group].sort(() => Math.random() - 0.5);
  const selectedSymbols = shuffledGroup.slice(0, 4);

  // 3. The solution is those 4 symbols ordered by their original appearance in the group
  const solution = [...selectedSymbols].sort((a, b) => group.indexOf(a) - group.indexOf(b));

  // 4. The display is the 4 symbols shuffled again
  const symbols = [...selectedSymbols].sort(() => Math.random() - 0.5);

  return { symbols, solution };
};
