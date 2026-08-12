import type { IndicatorState } from '../../game/store';

export type WireColor = 'RED' | 'BLUE' | 'WHITE' | 'BLACK' | 'YELLOW';

export interface WireGridConfig {
  wires: WireColor[];
  solutionIndex: number; // 0-indexed
}

export const generateWireGrid = (serial: string, arm: IndicatorState, pwr: IndicatorState): WireGridConfig => {
  const numWires = Math.floor(Math.random() * 3) + 4; // 4, 5, or 6
  const availableColors: WireColor[] = ['RED', 'BLUE', 'WHITE', 'BLACK', 'YELLOW'];
  
  let wires: WireColor[] = [];
  for (let i = 0; i < numWires; i++) {
    wires.push(availableColors[Math.floor(Math.random() * availableColors.length)]);
  }

  // Ensure deterministic answer based on the generated wires and current game state
  let solutionIndex = 0;

  // RULE A: 4 WIRES
  if (numWires === 4) {
    const hasRed = wires.includes('RED');
    const serialHasVowel = /[AEIOU]/.test(serial);
    const hasBlue = wires.includes('BLUE');

    if (hasRed && serialHasVowel) {
      // Cut the last RED wire
      solutionIndex = wires.lastIndexOf('RED');
    } else if (!hasBlue) {
      // Cut the first wire
      solutionIndex = 0;
    } else {
      // Cut the last wire
      solutionIndex = 3;
    }
  } 
  // RULE B: 5 WIRES
  else if (numWires === 5) {
    if (arm === 'green') {
      const serialHas7 = /7/.test(serial);
      if (serialHas7 && wires.includes('RED')) {
        // Cut the second RED wire if it exists. (Fallback to first red if only one, or just second wire if no red)
        // Wait, to make it perfectly deterministic, we should generate wires that MATCH the rule.
        // Instead of pure random, we can force a valid state, or handle edge cases safely.
        // Let's implement robust safe-fallbacks for the engine evaluation.
        const redIndices = wires.map((w, i) => w === 'RED' ? i : -1).filter(i => i !== -1);
        if (redIndices.length >= 2) {
          solutionIndex = redIndices[1]; // Second RED
        } else if (redIndices.length === 1) {
          solutionIndex = redIndices[0]; // First RED
        } else {
          solutionIndex = 1; // Second wire
        }
      } else {
        // Cut the YELLOW wire. (If multiple, cut the first. If none, cut the last).
        const yellowIndex = wires.indexOf('YELLOW');
        solutionIndex = yellowIndex !== -1 ? yellowIndex : 4;
      }
    } else {
      // RULE B2: ARM IS NOT GREEN
      const hasBlack = wires.includes('BLACK');
      if (hasBlack) {
        solutionIndex = 0; // Cut first wire
      } else {
        solutionIndex = 1; // Cut second wire
      }
    }
  }
  // RULE C: 6 WIRES
  else if (numWires === 6) {
    if (!wires.includes('RED')) {
      solutionIndex = 3; // Cut the fourth wire
    } else if (pwr === 'green') {
      solutionIndex = 4; // Cut the fifth wire
    } else {
      solutionIndex = 0; // Cut the first wire
    }
  }

  return {
    wires,
    solutionIndex
  };
};
