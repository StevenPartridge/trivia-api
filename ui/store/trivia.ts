import { defineStore } from 'pinia';
import type { TriviaQuestion } from '@/models/TriviaQuestion';
import { TriviaQuestion as Question } from '@/models/TriviaQuestion';
import type { TriviaRound } from '@/models/TriviaRound';

import exampleQuestions from './mock_trivia-questions';

const mockExtras = {
  async setDerivedFields() {
    return;
  },
  async getParticipants() {
    return [
      { wallet_address: '0x1234567890abcdef1234567890abcdef12345678', totalAmount: 50.0 },
      { wallet_address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef', totalAmount: 50.0 }
    ];
  },
  async calculateWinners() {
    return;
  },
  updateStatus() {
    return;
  }
};

interface TriviaState {
  currentRound: TriviaRound | null;
  questions: TriviaQuestion[];
  answers: { questionId: number; selectedOption: string }[];
  currentQuestionIndex: number;
  currentRoundQuestions?: TriviaQuestion[];
  userInTournament: boolean;
  completedRounds: TriviaRound[]; // Track completed rounds
}

export const useTriviaStore = defineStore('trivia', {
  state: (): TriviaState => ({
    currentRound: null,
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    userInTournament: false,
    completedRounds: [
      {
        id: 0,
        start_time: new Date('2024-07-01T12:00:00Z'),
        end_time: new Date('2024-07-01T12:30:00Z'),
        pot: 100.0,
        status: 'completed',
        questions: [],
        transactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        numQuestionsAnswered: 10,
        userPlace: 3,
        totalEntrants: 50,
        ...mockExtras
      },
      {
        id: -1,
        start_time: new Date('2024-07-02T12:00:00Z'),
        end_time: new Date('2024-07-02T12:30:00Z'),
        pot: 200.0,
        status: 'completed',
        questions: [],
        transactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        numQuestionsAnswered: 8,
        userPlace: 1,
        totalEntrants: 40,
        ...mockExtras,
      },
    ],
  }),
  actions: {
    async enterRound(roundId: number) {
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
        numQuestionsAnswered: 0,
        userPlace: 0,
        totalEntrants: Math.floor(Math.random() * 1000) + 1,
        ...mockExtras
      };
      console.log('Entered round:', this.currentRound);
      
      this.userInTournament = true;
      await this.fetchQuestions();
    },
    async fetchQuestions() {
      const fetchedQuestions = exampleQuestions.map(question => new Question(question));
      this.questions = fetchedQuestions;
      if (this.currentRound) {
        this.currentRound.questions = fetchedQuestions;
      }
    },
    completeRound() {
      if (this.currentRound) {
        this.currentRound.status = 'completed';
        this.completedRounds.push(this.currentRound);
        this.currentRound = null;
        this.userInTournament = false;
        console.log('Round completed and stored:', this.completedRounds);
      }
    },
    async submitAnswers() {
      console.log('Answers submitted:', this.answers);
    },
    answerQuestion(questionId: number, selectedOption: string) {
      const question = this.questions.find(q => q.id === questionId);
      if (!question) return;

      const isCorrect = question.correct_answer === selectedOption;

      if (isCorrect) {
        this.answers.push({ questionId, selectedOption });
        this.currentRound!.numQuestionsAnswered++;
        this.nextQuestion();
      } else {
        this.currentRound!.userPlace = this.currentRound!.totalEntrants - this.answers.length;
        console.log(`Incorrect answer. You finished in place ${this.currentRound!.userPlace}`);
        this.completeRound(); // Eliminate the user immediately
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
    },
    nextRoundStartTime(): number {
      const now = Math.floor(Date.now() / 1000);
      const nextInterval = Math.ceil(now / 600) * 600;
      return nextInterval * 1000;
    },
    isUserInTournament(state): boolean {
      return state.userInTournament;
    }
  }
});
