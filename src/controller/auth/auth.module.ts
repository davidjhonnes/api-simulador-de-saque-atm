import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from '../../service/login/login.service';
import { AuthController } from './auth.controller';
import { Account, AccountSchema } from '../../schema/account.schema';
import { Customer, CustomerSchema } from '../../schema/customer.schema';
import { jwtConstants } from '../../config/contants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginService],
})
export class AuthModule {}
