import { defineStore } from 'pinia';
import type { TriviaQuestion } from '@/models/TriviaQuestion'; // Import the TriviaQuestion interface
import type { TriviaRound } from '@/models/TriviaRound'; // Import the TriviaRound interface

interface TriviaState {
  currentRound: TriviaRound | null;
  questions: TriviaQuestion[];
  answers: { questionId: number; answer: string }[];
}

export const useTriviaStore = defineStore('trivia', {
  state: (): TriviaState => ({
    currentRound: null,
    questions: [],
    answers: [],
  }),
  actions: {
    async enterRound(roundId: number) {
      // Mock entering a round
      this.currentRound = {
        id: roundId,
        start_time: new Date(),
        end_time: new Date(new Date().getTime() + 3600000),
        pot: 100.0,
        status: 'scheduled',
        questions: [],
        transactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        async setDerivedFields() {
          this.pot = 100.0;
        },
        async getParticipants() {
          return [
            { wallet_address: '0x1234567890abcdef1234567890abcdef12345678', totalAmount: 50.0 },
            { wallet_address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef', totalAmount: 50.0 }
          ];
        },
        async calculateWinners() {
          console.log('Calculating winners...');
        },
        updateStatus() {
          this.status = 'active';
        }
      };
    },
    async fetchQuestions() {
      // Mock fetching questions
      this.questions = [
        {
          id: 1,
          question: 'Sample Question 1?',
          correct_answer: 'Correct Answer 1',
          wrong_answers: ['Wrong Answer 1.1', 'Wrong Answer 1.2', 'Wrong Answer 1.3'],
          category: 'General Knowledge',
          difficulty: 'easy',
          tags: ['sample', 'test'],
          createdAt: new Date(),
          updatedAt: new Date(),
          getAllAnswers() {
            return [this.correct_answer, ...this.wrong_answers].sort(() => Math.random() - 0.5);
          }
        },
        {
          id: 2,
          question: 'Sample Question 2?',
          correct_answer: 'Correct Answer 2',
          wrong_answers: ['Wrong Answer 2.1', 'Wrong Answer 2.2', 'Wrong Answer 2.3'],
          category: 'Science',
          difficulty: 'medium',
          tags: ['science', 'test'],
          createdAt: new Date(),
          updatedAt: new Date(),
          getAllAnswers() {
            return [this.correct_answer, ...this.wrong_answers].sort(() => Math.random() - 0.5);
          }
        }
      ];
    },
    async submitAnswers() {
      // Mock submitting answers
      console.log('Answers submitted:', this.answers);
    },
    answerQuestion(questionId: number, answer: string) {
      // Record the answer
      this.answers.push({ questionId, answer });
    }
  }
});
