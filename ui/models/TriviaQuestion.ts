export interface TriviaQuestion {
    id: number;
    question: string;
    correct_answer: string;
    wrong_answers: string[];
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
    getAllAnswers(): string[];
  }
  