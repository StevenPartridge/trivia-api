import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { TriviaRound } from './TriviaRound';
import { IsEnum, IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';

export enum TransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Failed = 'failed',
}

export enum TransactionType {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  wallet_address!: string;

  @Column('decimal', { precision: 18, scale: 8 })
  @IsDecimal()
  amount!: number;

  @Column()
  @IsNotEmpty()
  tx_hash!: string;

  @Column({ type: 'enum', enum: TransactionStatus })
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;

  @Column({ type: 'enum', enum: TransactionType })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  confirmed_at!: Date | null;

  @Column()
  @IsNotEmpty()
  round_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user!: User;

  @ManyToOne(() => TriviaRound, (round) => round.transactions)
  round!: TriviaRound;

  public isSuccessful(): boolean {
    return this.status === TransactionStatus.Confirmed;
  }
}
