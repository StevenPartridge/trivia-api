import type { TransactionStatus, TransactionType } from '../../models/src/entities/Transaction';
import type { User } from './User';
import type { TriviaRound } from './TriviaRound';

export interface Transaction {
  id: number;
  wallet_address: string;
  amount: number;
  tx_hash: string;
  status: TransactionStatus;
  type: TransactionType;
  confirmed_at: Date | null;
  round_id: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  round: TriviaRound;
  isSuccessful(): boolean;
}
