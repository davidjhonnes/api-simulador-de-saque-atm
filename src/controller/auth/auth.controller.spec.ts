import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginService } from '../../service/login/login.service';
import { Account, AccountSchema } from '../../schema/account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../../schema/customer.schema';

describe('LoginController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Account.name, schema: AccountSchema },
          { name: Customer.name, schema: CustomerSchema },
        ]),
      ],
      controllers: [AuthController],
      providers: [LoginService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
