export interface TriviaQuestion {
    id: number;
    question: string;
    correct_answer: string;
    wrong_answers: string[];
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    getAllAnswers(): string[];
  }
  

  export class TriviaQuestion {
    id!: number;
  
    question!: string;
  
    correct_answer!: string;
  
    wrong_answers!: string[];
  
    category!: string;
  
    difficulty!: 'easy' | 'medium' | 'hard';
  
    tags!: string[];
  
    createdAt!: Date;
  
    updatedAt!: Date;
  
    constructor(data: Partial<TriviaQuestion>) {
      Object.assign(this, data);
    }

    public getAllAnswers(): string[] {
      return [this.correct_answer, ...this.wrong_answers].sort(
        () => Math.random() - 0.5,
      );
    }
  }
  