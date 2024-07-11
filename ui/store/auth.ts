import { defineStore } from 'pinia';
import type { User } from '@/models/User'; // Import the User interface

interface AuthState {
  user: User | null;
  token: string | null;
  walletAddress: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    walletAddress: null,
  }),
  actions: {
    async login(username: string, password: string) {
      // Mock API call
      this.token = 'fake-jwt-token';
      this.user = { id: 1, wallet_address: '', username, createdAt: new Date(), updatedAt: new Date(), transactions: [], userAnswers: [] };
    },
    async register(username: string, password: string) {
      // Mock API call
      this.token = 'fake-jwt-token';
      this.user = { id: 1, wallet_address: '', username, createdAt: new Date(), updatedAt: new Date(), transactions: [], userAnswers: [] };
    },
    async attachWallet(walletAddress: string) {
      // Mock attaching wallet
      if (this.user) {
        this.user.wallet_address = walletAddress;
        this.walletAddress = walletAddress;
      }
    },
    async detachWallet() {
      // Mock detaching wallet
      if (this.user) {
        this.user.wallet_address = '';
        this.walletAddress = null;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.walletAddress = null;
    }
  }
});
