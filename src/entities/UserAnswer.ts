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
import {
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsString,
  IsNumber,
} from 'class-validator';

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  round_id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  wallet_address!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  question_id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  answer!: string;

  @Column({ default: false })
  @IsBoolean()
  is_correct!: boolean;

  @CreateDateColumn()
  @IsDate()
  submitted_at!: Date;

  @CreateDateColumn()
  @IsDate()
  createdAt!: Date;

  @UpdateDateColumn()
  @IsDate()
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
