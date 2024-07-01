import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Repository,
  getRepository,
  In,
} from 'typeorm';
import { Transaction, TransactionStatus, TransactionType } from './Transaction';
import { TriviaQuestion } from './TriviaQuestion';
import { UserAnswer } from './UserAnswer';

@Entity()
export class TriviaRound {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  start_time!: Date;

  @Column()
  end_time!: Date;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  pot!: number;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'active', 'completed'],
    default: 'scheduled',
  })
  status!: 'scheduled' | 'active' | 'completed';

  @ManyToMany(() => TriviaQuestion)
  @JoinTable()
  questions!: TriviaQuestion[];

  @OneToMany(() => Transaction, (transaction) => transaction.round)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async setDerivedFields() {
    this.pot = await TriviaRound.calculatePot(this);
  }

  // Custom method to calculate the pot
  public static async calculatePot(round: TriviaRound): Promise<number> {
    const transactionRepo: Repository<Transaction> = getRepository(Transaction);
    const transactions = await transactionRepo.find({
      where: {
        round_id: round.id,
        status: TransactionStatus.Confirmed,
        type: TransactionType.Deposit,
      },
    });

    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }

  // Derived method to get participants
  public async getParticipants(): Promise<
    { wallet_address: string; totalAmount: number }[]
  > {
    const transactionRepo: Repository<Transaction> = getRepository(Transaction);
    const transactions = await transactionRepo.find({
      where: {
        round_id: this.id,
        status: TransactionStatus.Confirmed,
      },
    });

    const participantsMap = new Map<string, number>();

    transactions.forEach((tx) => {
      if (participantsMap.has(tx.wallet_address)) {
        participantsMap.set(
          tx.wallet_address,
          participantsMap.get(tx.wallet_address)! + tx.amount,
        );
      } else {
        participantsMap.set(tx.wallet_address, tx.amount);
      }
    });

    return Array.from(participantsMap.entries()).map(
      ([wallet_address, totalAmount]) => ({
        wallet_address,
        totalAmount,
      }),
    );
  }

  public async calculateWinners(): Promise<void> {
    const transactions = await this.getParticipants();
    const userAnswerRepo: Repository<UserAnswer> = getRepository(UserAnswer);

    const userAnswers = await userAnswerRepo.find({
      where: {
        round_id: this.id,
        question_id: In(this.questions.map((q) => q.id)),
      },
      relations: ['user'],
    });

    const scores = transactions.map((tx) => {
      const userAnswersForTx = userAnswers.filter(
        (ua) => ua.wallet_address === tx.wallet_address,
      );
      const correctAnswers = userAnswersForTx.filter(
        (ua) => ua.is_correct,
      ).length;
      const totalAnswers = userAnswersForTx.length;
      const accuracy = correctAnswers / totalAnswers;
      const averageAnswerTime =
        userAnswersForTx.reduce(
          (sum, ua) =>
            sum +
            (new Date(ua.submitted_at).getTime() - this.start_time.getTime()),
          0,
        ) / totalAnswers;

      return {
        wallet_address: tx.wallet_address,
        score: tx.totalAmount * accuracy - averageAnswerTime,
        correctAnswers,
        averageAnswerTime,
      };
    });

    scores.sort((a, b) => b.score - a.score);

    const winners = scores.slice(0, 3);
    const totalPot = this.pot;
    const prizeDistribution = [0.3, 0.15, 0.05];

    winners.forEach((winner, index) => {
      const prize = totalPot * prizeDistribution[index];
      console.log(`Winner: ${winner.wallet_address}, Prize: ${prize}`);
    });

    const remainingPot =
      totalPot -
      winners.reduce(
        (sum, winner, index) => sum + totalPot * prizeDistribution[index],
        0,
      );
    console.log(`Remaining pot: ${remainingPot}`);
  }

  public updateStatus(): void {
    const now = new Date();
    if (now < this.start_time) {
      this.status = 'scheduled';
    } else if (now >= this.start_time && now <= this.end_time) {
      this.status = 'active';
    } else {
      this.status = 'completed';
    }
  }
}
