import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import 'dotenv/config';

const DataBaseProvider = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    uri: `mongodb://${config.get('MONGODB_USER')}:${config.get('MONGODB_PASSWORD')}@${config.get('MONGODB_HOST')}/${config.get('MONGODB_DATABASE')}:${config.get('MONGODB_PORT')}?retryWrites=true&w=majority&authSource=admin`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: config.get('MONGODB_DATABASE'),
  }),
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
