import { Test, TestingModule } from '@nestjs/testing';
import { MoneyExchangeAvailableController } from './money-exchange-available.controller';
import { MoneyExchangeAvailableService } from '../../service/money-exchange-available/money-exchange-available.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Atm, AtmSchema } from '../../schema/atm.schema';
import {
  MoneyExchangeAvaiable,
  MoneyExchangeSchema,
} from '../../schema/moneyexchange.schema';
import { Account } from '../../schema/account.schema';

describe('MoneyExchangeAvailableController', () => {
  let controller: MoneyExchangeAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: 'Atm', schema: AtmSchema },
          { name: 'MoneyExchangeAvaiable', schema: MoneyExchangeSchema },
        ]),
      ],
      controllers: [MoneyExchangeAvailableController],
      providers: [
        MoneyExchangeAvailableService,
        { provide: getModelToken(Atm.name), useValue: jest.fn() },
        {
          provide: getModelToken(MoneyExchangeAvaiable.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<MoneyExchangeAvailableController>(
      MoneyExchangeAvailableController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
