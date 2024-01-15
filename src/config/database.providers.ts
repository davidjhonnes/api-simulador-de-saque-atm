import { ConfigService } from '@nestjs/config';
import mongoose, { Connection } from 'mongoose';
import * as process from 'process';
import 'dotenv/config';

const DataBaseProvider = {
  provide: 'DATABASE_CONNECTION',
  async useFactory(config: ConfigService): Promise<Connection> {
    const user = config.get('MONGODB_USER');
    const pass = config.get('MONGODB_PASSWORD');
    const host = config.get('MONGODB_HOST');
    const port = config.get('MONGODB_PORT');
    const database = config.get('MONGODB_DATABASE');
    const uri = `mongodb://${user}:${pass}@${host}/${database}:${port}?retryWrites=true&w=majority`;
    console.log('URL', uri);
    const mongConnection = await mongoose.connect(uri);

    return mongConnection.connection;
  },
  inject: [ConfigService],
};

export const getUrlMongoMigration = () => {
  const user = process.env['MONGODB_USER'];
  const pass = process.env['MONGODB_PASSWORD'];
  const host = process.env['MONGODB_HOST'];
  const port = process.env['MONGODB_PORT'];
  const uri = `mongodb://${user}:${pass}@${host}:${port}?retryWrites=true&w=majority`;
  return uri;
};

export default DataBaseProvider;
