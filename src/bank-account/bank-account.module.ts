import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BankAccountController } from './bank-account.controller';
import { BANK_ACCOUNT_SERVICE } from './bank-account.interface';
import { SwanBankAccountService } from './swan-bank-account.service';
import { SwanModule } from '../swan/swan.module';

@Module({
  imports: [HttpModule, ConfigModule, SwanModule],
  controllers: [BankAccountController],
  providers: [
    {
      provide: BANK_ACCOUNT_SERVICE,
      useClass: SwanBankAccountService,
    },
  ],
})
export class BankAccountModule {}
