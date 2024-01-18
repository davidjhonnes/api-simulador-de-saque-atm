import { Module } from '@nestjs/common';
import { AtmService } from '../../service/atm/atm.service';
import { AtmController } from './atm.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AtmSchema } from '../../schema/atm.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Atm', schema: AtmSchema }])],
  controllers: [AtmController],
  providers: [AtmService],
})
export class AtmModule {}
