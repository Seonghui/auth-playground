import { create } from 'zustand';

interface Bear {
  bears: number;
  increasePopulation: () => any;
  removeAllBears: () => any;
}

export const useBearStore = create<Bear>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
