import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controller/auth/auth.module';
import { AccountModule } from './controller/account/account.module';
import { AtmModule } from './controller/atm/atm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneyExchangeAvailableModule } from './controller/money-exchange-available/money-exchange-available.module';
import { WithdrawModule } from './controller/withdraw/withdraw.module';
import DataBaseProvider from './config/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync(DataBaseProvider),
    AuthModule,
    AccountModule,
    AtmModule,
    MoneyExchangeAvailableModule,
    WithdrawModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
