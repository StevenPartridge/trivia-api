import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository,
} from 'typeorm';
import { User } from './User';
import { TriviaRound } from './TriviaRound';
import { TriviaQuestion } from './TriviaQuestion';

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  round_id!: number;

  @Column()
  wallet_address!: string;

  @Column()
  question_id!: number;

  @Column()
  answer!: string;

  @Column({ default: false })
  is_correct!: boolean;

  @CreateDateColumn()
  submitted_at!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({
    name: 'wallet_address',
    referencedColumnName: 'wallet_address',
  })
  user!: User;

  @ManyToOne(() => TriviaRound, (round) => round.transactions)
  @JoinColumn({ name: 'round_id' })
  round!: TriviaRound;

  @ManyToOne(() => TriviaQuestion, (question) => question.id)
  @JoinColumn({ name: 'question_id' })
  question!: TriviaQuestion;

  // Methods
  async getCorrectAnswer(): Promise<string | null> {
    const questionRepository = getRepository(TriviaQuestion);
    const question = await questionRepository.findOneBy({
      id: this.question_id,
    });
    return question?.correct_answer || null;
  }

  async validateAnswer(): Promise<boolean> {
    const correctAnswer = await this.getCorrectAnswer();
    this.is_correct = this.answer === correctAnswer;
    await getRepository(UserAnswer).save(this);
    return this.is_correct;
  }
}
