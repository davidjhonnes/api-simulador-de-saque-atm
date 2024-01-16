import { Test, TestingModule } from '@nestjs/testing';
import { MoneyExchangeAvailableService } from './money-exchange-available.service';

describe('MoneyExchangeAvailableService', () => {
  let service: MoneyExchangeAvailableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyExchangeAvailableService],
    }).compile();

    service = module.get<MoneyExchangeAvailableService>(MoneyExchangeAvailableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
