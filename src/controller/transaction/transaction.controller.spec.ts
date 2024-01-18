import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../../schema/transaction.schema';
import { AtmSchema } from '../../schema/atm.schema';
import { MoneyExchangeSchema } from '../../schema/moneyexchange.schema';
import { AccountSchema } from '../../schema/account.schema';
import { TransactionService } from '../../service/transaction/transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
