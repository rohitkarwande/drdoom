import { create } from 'zustand';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';
export type IndicatorState = 'off' | 'green' | 'red';
export type ModuleStatus = 'unsolved' | 'active' | 'solved';

export interface IndicatorConfig {
  power: IndicatorState;
  arm: IndicatorState;
  system: IndicatorState;
}

export interface BaseModuleState {
  id: string;
  name: string;
  status: ModuleStatus;
}

// Module specific states will extend BaseModuleState
export interface GameState {
  status: GameStatus;
  difficulty: 'medium';
  startTime: number | null;
  duration: number; // in seconds
  remainingTime: number;
  serialNumber: string;
  indicators: IndicatorConfig;
  strikes: number;
  maxStrikes: number;
  hintsUsed: number;
  
  // Modules state
  modules: {
    wire: ModuleStatus;
    logic: ModuleStatus;
    symbol: ModuleStatus;
    memory: ModuleStatus;
  };

  // Game Actions
  startGame: () => void;
  endGame: (win: boolean) => void;
  tickTimer: () => void;
  addStrike: () => void;
  useHint: () => void;
  resetGame: () => void;
  setModuleStatus: (module: 'wire'|'logic'|'symbol'|'memory', status: ModuleStatus) => void;
  startTimer: () => void;
}

const generateSerialNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let serial = '';
  for (let i = 0; i < 2; i++) serial += chars.charAt(Math.floor(Math.random() * chars.length));
  serial += '-';
  for (let i = 0; i < 2; i++) serial += chars.charAt(Math.floor(Math.random() * chars.length));
  serial += '-';
  for (let i = 0; i < 2; i++) serial += chars.charAt(Math.floor(Math.random() * chars.length));
  return serial;
};

const randomIndicator = (): IndicatorState => {
  const states: IndicatorState[] = ['off', 'green', 'red'];
  return states[Math.floor(Math.random() * states.length)];
};

export const useGameStore = create<GameState>((set, get) => ({
  status: 'idle',
  difficulty: 'medium',
  startTime: null,
  duration: 600, // 10 minutes
  remainingTime: 600,
  serialNumber: '00-00-00',
  indicators: { power: 'off', arm: 'off', system: 'off' },
  strikes: 0,
  maxStrikes: 3,
  hintsUsed: 0,
  modules: {
    wire: 'active',
    logic: 'active',
    symbol: 'active',
    memory: 'active',
  },

  startGame: () => {
    set({
      status: 'playing',
      startTime: null,
      remainingTime: 600,
      serialNumber: generateSerialNumber(),
      indicators: {
        power: randomIndicator(),
        arm: randomIndicator(),
        system: randomIndicator()
      },
      strikes: 0,
      hintsUsed: 0,
      modules: {
        wire: 'active',
        logic: 'active',
        symbol: 'active',
        memory: 'active',
      }
    });
  },
  
  endGame: (win) => set({ status: win ? 'won' : 'lost' }),
  
  startTimer: () => set({ startTime: Date.now() }),
  
  tickTimer: () => {
    const { status, startTime, duration } = get();
    if (status !== 'playing' || !startTime) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, duration - elapsed);
    
    if (remaining === 0) {
      set({ remainingTime: 0, status: 'lost' });
    } else {
      set({ remainingTime: remaining });
    }
  },
  
  addStrike: () => {
    const { strikes, maxStrikes } = get();
    const newStrikes = strikes + 1;
    
    if (newStrikes >= maxStrikes) {
      set({ strikes: newStrikes, status: 'lost' });
    } else if (newStrikes === 2) {
      // Strike 2 time penalty (-20 seconds)
      // Since timer is based on Date.now() - startTime, we need to artificially push startTime back
      set((state) => ({
        strikes: newStrikes,
        startTime: state.startTime ? state.startTime - 20000 : null
      }));
    } else {
      set({ strikes: newStrikes });
    }
  },
  
  useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
  
  resetGame: () => set({
    status: 'idle',
    startTime: null,
    remainingTime: 600,
    strikes: 0,
    hintsUsed: 0,
    modules: {
      wire: 'active',
      logic: 'active',
      symbol: 'active',
      memory: 'active',
    }
  }),

  setModuleStatus: (module, status) => set((state) => ({
    modules: {
      ...state.modules,
      [module]: status
    }
  }))
}));
