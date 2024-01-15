import { Module } from '@nestjs/common';
import { AccountService } from '../../service/account/account.service';
import { AccountController } from './account.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
