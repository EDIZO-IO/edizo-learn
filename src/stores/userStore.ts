// src/stores/userStore.ts
import { create } from 'zustand';

interface UserStats {
  totalPoints: number;
  totalQuizzesTaken: number;
  totalArticlesRead: number;
  currentStreak: number;
  level: number;
  badges: string[];
}

interface UserActivity {
  type: 'quiz' | 'tutorial' | 'playground';
  title: string;
  score?: number;
  progress?: number;
  completed?: boolean;
  date: string;
}

interface UserRecommendation {
  type: 'tutorial' | 'quiz' | 'playground';
  title: string;
  difficulty: 'Beginner' | 'Medium' | 'Advanced';
  duration: string;
  description: string;
  link: string;
}

interface UserStore {
  stats: UserStats;
  recentActivities: UserActivity[];
  recommendedContent: UserRecommendation[];

  updateStats: (newStats: Partial<UserStats>) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;

  setActivities: (activities: UserActivity[]) => void;
  setRecommendations: (recs: UserRecommendation[]) => void;
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
  recentActivities: [],
  recommendedContent: [],

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

  setActivities: (activities) => set(() => ({ recentActivities: activities })),
  setRecommendations: (recs) => set(() => ({ recommendedContent: recs })),
}));
