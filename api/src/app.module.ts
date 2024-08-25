import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { TransactionsModule } from './transactions/transactions.module';
// import { TournamentsModule } from './tournaments/tournaments.module';
// import { RoundsModule } from './rounds/rounds.module';
// import { MiniGamesModule } from './minigames/minigames.module';
import { User } from '../../models/src/entities/User';
import { Transaction } from '../../models/src/entities/Transaction';
import { TriviaRound } from '../../models/src/entities/TriviaRound';
import { TriviaQuestion } from '../../models/src/entities/TriviaQuestion';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Transaction, TriviaRound, TriviaQuestion],
      synchronize: true,
    }),
    AuthModule,
    // TransactionsModule,
    // TournamentsModule,
    // RoundsModule,
    // MiniGamesModule,
  ],
})
export class AppModule {}
