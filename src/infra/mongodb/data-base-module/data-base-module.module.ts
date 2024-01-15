import { Module } from '@nestjs/common';
import DataBaseProvider from '../../../config/database.providers';

@Module({
  providers: [DataBaseProvider],
  exports: [DataBaseProvider],
})
export class DataBaseModuleModule {}
