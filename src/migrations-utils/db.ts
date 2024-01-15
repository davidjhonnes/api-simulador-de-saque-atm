import { MongoClient } from 'mongodb';
import { getUrlMongoMigration } from '../config/database.providers';
import 'dotenv/config';
const MONGO_URL = getUrlMongoMigration();

export const getDb = async () => {
  console.log('MONGO_URL', MONGO_URL);
  const client: any = await MongoClient.connect(MONGO_URL);
  const database = process.env['MONGODB_DATABASE'];
  return client.db(database);
};
