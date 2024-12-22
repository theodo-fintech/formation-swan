import { Module } from '@nestjs/common';
import { BankAccountModule } from './bank-account/bank-account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SwanModule } from './swan/swan.module';

@Module({
  imports: [ConfigModule.forRoot(), BankAccountModule, SwanModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
