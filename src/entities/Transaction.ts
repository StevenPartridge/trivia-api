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
  wallet_address!: string;

  @Column('decimal', { precision: 18, scale: 8 })
  amount!: number;

  @Column()
  tx_hash!: string;

  @Column({ type: 'enum', enum: TransactionStatus })
  status!: TransactionStatus;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at!: Date | null;

  @Column()
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
