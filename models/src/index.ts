import 'reflect-metadata';
import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    // You can perform database operations here
  })
  .catch((error) => console.log('Database connection error: ', error));
