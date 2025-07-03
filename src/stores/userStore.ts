import { create } from 'zustand';

interface UserStats {
  totalPoints: number;
  totalQuizzesTaken: number;
  totalArticlesRead: number;
  currentStreak: number;
  level: number;
  badges: string[];
}

interface UserStore {
  stats: UserStats;
  updateStats: (newStats: Partial<UserStats>) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  stats: {
    totalPoints: 0,
    totalQuizzesTaken: 0,
    totalArticlesRead: 0,
    currentStreak: 0,
    level: 1,
    badges: [],
  },
  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
  addPoints: (points) =>
    set((state) => ({
      stats: { ...state.stats, totalPoints: state.stats.totalPoints + points },
    })),
  addBadge: (badge) =>
    set((state) => ({
      stats: { ...state.stats, badges: [...state.stats.badges, badge] },
    })),
}));