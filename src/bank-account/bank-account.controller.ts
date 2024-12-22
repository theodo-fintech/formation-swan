import { Controller, Get, Headers, Inject } from '@nestjs/common';

import {
  BANK_ACCOUNT_SERVICE,
  BankAccountService,
} from './bank-account.interface';
import { BalanceResponseDto } from './dto/balance-response.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(
    @Inject(BANK_ACCOUNT_SERVICE)
    private bankAccountService: BankAccountService,
  ) {}

  @Get('balance')
  async getBalance(
    @Headers('email') email: string,
  ): Promise<BalanceResponseDto> {
    return { amount: await this.bankAccountService.getBalance(email) };
  }
}
