import { Module } from '@nestjs/common';
import { MoneyExchangeAvailableService } from '../../service/money-exchange-available/money-exchange-available.service';
import { MoneyExchangeAvailableController } from './money-exchange-available.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AtmSchema } from '../../schema/atm.schema';
import { MoneyExchangeSchema } from '../../schema/moneyexchange.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Atm', schema: AtmSchema },
      { name: 'MoneyExchangeAvaiable', schema: MoneyExchangeSchema },
    ]),
  ],
  controllers: [MoneyExchangeAvailableController],
  providers: [MoneyExchangeAvailableService],
})
export class MoneyExchangeAvailableModule {}
