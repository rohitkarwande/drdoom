export interface MemoryHistory {
  round: number; // 1, 2, 3
  display: number; // 1, 2, 3, 4
  pressed: number; // 1, 2, 3, 4
}

export const getMemoryExpectedLabel = (
  round: number, 
  display: number, 
  history: MemoryHistory[]
): number => {
  if (round === 1) {
    if (display === 1) return 2;
    if (display === 2) return 2;
    if (display === 3) return 3;
    if (display === 4) return 4;
  }
  
  if (round === 2) {
    if (display === 1) return 4;
    if (display === 2) return history[0].pressed;
    if (display === 3) return 1;
    if (display === 4) return history[0].pressed;
  }
  
  if (round === 3) {
    if (display === 1) return history[1].pressed;
    if (display === 2) return history[0].pressed;
    if (display === 3) return 3;
    if (display === 4) return 4;
  }

  return 1; // Fallback
};

export const generateDisplay = (): number => Math.floor(Math.random() * 4) + 1;
