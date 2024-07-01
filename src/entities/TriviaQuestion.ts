import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TriviaQuestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  question!: string;

  @Column('text')
  correct_answer!: string;

  @Column('simple-array')
  wrong_answers!: string[];

  @Column('text')
  category!: string;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  })
  difficulty!: 'easy' | 'medium' | 'hard';

  @Column('simple-array', { nullable: true })
  tags!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  public getAllAnswers(): string[] {
    return [this.correct_answer, ...this.wrong_answers].sort(() => Math.random() - 0.5);
  }
}
