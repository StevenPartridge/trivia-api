import type { TriviaQuestion } from './TriviaQuestion';
import type { Transaction } from './Transaction';

export interface TriviaRound {
  id: number;
  start_time: Date;
  end_time: Date;
  pot: number;
  status: 'scheduled' | 'active' | 'completed';
  questions: TriviaQuestion[];
  transactions: Transaction[];
  createdAt: Date;
  updatedAt: Date;
  numQuestionsAnswered: number;
  userPlace: number;
  totalEntrants: number;
  setDerivedFields(): Promise<void>;
  getParticipants(): Promise<{ wallet_address: string; totalAmount: number }[]>;
  calculateWinners(): Promise<void>;
  updateStatus(): void;
}
