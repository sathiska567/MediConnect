import { create } from 'zustand';

export const useStore = create((set) => ({
  clickCount: 0,
  incrementCount: () =>
    set((state) => ({ clickCount: state.clickCount + 1 })),
  decrementCount: () =>
    set((state) => ({
      clickCount: state.clickCount > 0 ? state.clickCount - 1 : 0, // Prevent negative values
    })),
  resetCount: () => set({ clickCount: 0 }),
}));
