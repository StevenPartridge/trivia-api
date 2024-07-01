import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Transaction } from './entities/Transaction';
import { TriviaRound } from './entities/TriviaRound';
import { TriviaQuestion } from './entities/TriviaQuestion';
import { UserAnswer } from './entities/UserAnswer';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase',
  synchronize: true,
  logging: false,
  entities: [User, Transaction, TriviaRound, TriviaQuestion, UserAnswer],
  migrations: [],
  subscribers: [],
});
