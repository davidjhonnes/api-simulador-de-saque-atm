import { Module } from '@nestjs/common';
import { WithdrawService } from '../../service/withdraw/withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AtmSchema } from '../../schema/atm.schema';
import { MoneyExchangeSchema } from '../../schema/moneyexchange.schema';
import { AccountSchema } from '../../schema/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Atm', schema: AtmSchema },
      { name: 'MoneyExchangeAvaiable', schema: MoneyExchangeSchema },
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
  controllers: [WithdrawController],
  providers: [WithdrawService],
})
export class WithdrawModule {}
