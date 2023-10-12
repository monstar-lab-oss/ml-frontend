import { create } from "zustand";

type State = { prev: number[]; curr: number; next: number[] };

type Selectors = {
  getCurr: () => State["curr"];
  hasPrev: () => boolean;
  hasNext: () => boolean;
};

type Actions = {
  undo: () => void;
  redo: () => void;
  set: (value: State["curr"]) => void;
  reset: (value: State["curr"]) => void;
};

export type Store = State & Selectors & Actions;
export const useCountStore = create<Store>((set, get) => ({
  // state
  prev: [],
  curr: 0,
  next: [],

  // selectors
  getCurr: () => get().curr,
  hasPrev: () => get().prev.length > 0,
  hasNext: () => get().next.length > 0,

  // actions
  undo: () =>
    set((state) => ({
      prev: state.prev.slice(0, state.prev.length - 1),
      curr: state.prev[state.prev.length - 1],
      next: [state.curr, ...state.next],
    })),
  redo: () =>
    set((state) => ({
      prev: [...state.prev, state.curr],
      curr: state.next[0],
      next: state.next.slice(1),
    })),
  set: (newCurr) =>
    set((state) => ({
      prev: [...state.prev, state.curr],
      curr: newCurr,
      next: [],
    })),
  reset: (newCurr) =>
    set({
      prev: [],
      curr: newCurr,
      next: [],
    }),
}));
