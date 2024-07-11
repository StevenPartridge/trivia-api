import type { User } from './User';
import type { TriviaRound } from './TriviaRound';
import type { TriviaQuestion } from './TriviaQuestion';

export interface UserAnswer {
  id: number;
  round_id: number;
  wallet_address: string;
  question_id: number;
  answer: string;
  is_correct: boolean;
  submitted_at: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  round: TriviaRound;
  question: TriviaQuestion;
  getCorrectAnswer(): Promise<string | null>;
  validateAnswer(): Promise<boolean>;
}
