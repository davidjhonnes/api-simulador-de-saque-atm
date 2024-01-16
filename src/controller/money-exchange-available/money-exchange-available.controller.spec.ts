import { Test, TestingModule } from '@nestjs/testing';
import { MoneyExchangeAvailableController } from './money-exchange-available.controller';
import { MoneyExchangeAvailableService } from '../../service/money-exchange-available/money-exchange-available.service';

describe('MoneyExchangeAvailableController', () => {
  let controller: MoneyExchangeAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyExchangeAvailableController],
      providers: [MoneyExchangeAvailableService],
    }).compile();

    controller = module.get<MoneyExchangeAvailableController>(MoneyExchangeAvailableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
