import { defineStore } from 'pinia';

interface LeaderboardEntry {
  user: string;
  score: number;
}

interface LeaderboardState {
  leaderboard: LeaderboardEntry[];
}

export const useLeaderboardStore = defineStore('leaderboard', {
  state: (): LeaderboardState => ({
    leaderboard: [],
  }),
  actions: {
    async fetchLeaderboard() {
      // Mock fetching leaderboard
      this.leaderboard = [
        { user: 'User1', score: 100 },
        { user: 'User2', score: 90 },
        { user: 'User3', score: 80 },
      ];
    }
  }
});
