import create from "zustand";

export const useStore = create((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      if (next === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return { theme: next };
    }),
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null })
}));
