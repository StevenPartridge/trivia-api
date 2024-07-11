import type { Transaction } from './Transaction';
import type { UserAnswer } from './UserAnswer';

export interface User {
  id: number;
  wallet_address: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
  userAnswers: UserAnswer[];
}