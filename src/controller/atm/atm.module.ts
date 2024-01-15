import { Module } from '@nestjs/common';
import { AtmService } from '../../service/atm/atm.service';
import { AtmController } from './atm.controller';

@Module({
  controllers: [AtmController],
  providers: [AtmService],
})
export class AtmModule {}
