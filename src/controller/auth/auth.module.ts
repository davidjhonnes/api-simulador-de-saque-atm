import { Module } from '@nestjs/common';
import { LoginService } from '../../service/login/login.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../../schema/account.schema';
import { Customer, CustomerSchema } from '../../schema/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [LoginService],
})
export class AuthModule {}
