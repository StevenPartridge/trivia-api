import { defineStore } from 'pinia';
import type { TriviaQuestion } from '@/models/TriviaQuestion'; // Import the TriviaQuestion interface
import { TriviaQuestion as Question } from '@/models/TriviaQuestion';
import type { TriviaRound } from '@/models/TriviaRound'; // Import the TriviaRound interface

import exampleQuestions from './mock_trivia-questions'; // Import the exampleQuestions array

interface TriviaState {
  currentRound: TriviaRound | null;
  questions: TriviaQuestion[];
  answers: { questionId: number; selectedOption: string }[];
  currentQuestionIndex: number;
  currentRoundQuestions?: TriviaQuestion[];
}

export const useTriviaStore = defineStore('trivia', {
  state: (): TriviaState => ({
    currentRound: null,
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
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
      console.log('Entered round:', this.currentRound);
      await this.fetchQuestions(); // Fetch questions when entering a round
    },
    async fetchQuestions() {
      // Mock fetching questions
      console.log('Fetching questions...');
      const fetchedQuestions = exampleQuestions.map(question => new Question(question));
      this.questions = fetchedQuestions; // Assign to the questions state
      if (this.currentRound) {
        this.currentRound.questions = fetchedQuestions; // Also assign to the current round's questions
      }
    },
    async submitAnswers() {
      // Mock submitting answers
      console.log('Answers submitted:', this.answers);
    },
    answerQuestion(questionId: number, selectedOption: string) {
      const existingAnswerIndex = this.answers.findIndex(answer => answer.questionId === questionId);
      if (existingAnswerIndex !== -1) {
        this.answers[existingAnswerIndex].selectedOption = selectedOption;
      } else {
        this.answers.push({ questionId, selectedOption });
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    }
  },
  getters: {
    currentRoundQuestions(state): TriviaQuestion[] {
      return state.currentRound?.questions || [];
    },
    currentQuestion(state): TriviaQuestion | null {
      return state.currentRoundQuestions?.[state.currentQuestionIndex] || null;
    }
  }
});
