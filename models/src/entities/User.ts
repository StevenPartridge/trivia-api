import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  IsString,
  Length,
  Matches,
  IsOptional,
  validate,
} from 'class-validator';
import { Transaction } from './Transaction';
import { UserAnswer } from './UserAnswer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Wallet address must be a valid Ethereum address',
  })
  wallet_address!: string;

  @Column({ nullable: true, length: 25 })
  @IsOptional()
  @IsString()
  @Length(3, 25, { message: 'Username must be between 3 and 25 characters' })
  username?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.user)
  userAnswers!: UserAnswer[];

  @BeforeInsert()
  @BeforeUpdate()
  async validateEntity() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }
  }
}
