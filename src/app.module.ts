import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './controller/login/login.module';
import { AccountModule } from './controller/account/account.module';
import { AtmModule } from './controller/atm/atm.module';
import { DataBaseModuleModule } from './infra/mongodb/data-base-module/data-base-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DataBaseModuleModule,
    LoginModule,
    AccountModule,
    AtmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
