import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  isPageLoaded: false,
  setPageLoaded: (status) => set({ isPageLoaded: status }),
}));
