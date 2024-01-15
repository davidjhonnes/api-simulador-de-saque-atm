import { Module } from '@nestjs/common';
import { LoginService } from '../../service/login/login.service';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
