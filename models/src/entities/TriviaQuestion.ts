import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

@Entity()
export class TriviaQuestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  @IsNotEmpty()
  question!: string;

  @Column('text')
  @IsNotEmpty()
  correct_answer!: string;

  @Column('simple-array')
  @IsArray()
  @ArrayNotEmpty()
  wrong_answers!: string[];

  @Column('text')
  @IsNotEmpty()
  category!: string;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  })
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty!: 'easy' | 'medium' | 'hard';

  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  tags!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  public getAllAnswers(): string[] {
    return [this.correct_answer, ...this.wrong_answers].sort(
      () => Math.random() - 0.5,
    );
  }
}
