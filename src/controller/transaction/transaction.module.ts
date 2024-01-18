import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from '../../service/transaction/transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../../schema/transaction.schema';
import { AtmSchema } from '../../schema/atm.schema';
import { MoneyExchangeSchema } from '../../schema/moneyexchange.schema';
import { AccountSchema } from '../../schema/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Atm', schema: AtmSchema },
      { name: 'MoneyExchangeAvaiable', schema: MoneyExchangeSchema },
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
