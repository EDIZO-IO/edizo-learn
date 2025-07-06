import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme = localStorage.getItem('theme');
  const initialIsDark = savedTheme ? JSON.parse(savedTheme) : false;

  // Set the HTML class once on store creation
  if (initialIsDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDark: initialIsDark,
    toggleTheme: () =>
      set((state) => {
        const newIsDark = !state.isDark;
        localStorage.setItem('theme', JSON.stringify(newIsDark));
        document.documentElement.classList.toggle('dark', newIsDark);
        return { isDark: newIsDark };
      }),
  };
});
