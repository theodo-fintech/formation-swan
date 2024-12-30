import { Controller, Get, Headers, Inject, Param, Post } from '@nestjs/common';

import {
  BANK_ACCOUNT_SERVICE,
  BankAccountService,
} from './bank-account.interface';
import { BalanceResponseDto } from './dto/balance-response.dto';
import { CreateVirtualCardResponseDto } from './dto/create-virtual-card-response.dto';

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

  @Post('virtual-card')
  async createVirtualCard(
    @Headers('email') email: string,
  ): Promise<CreateVirtualCardResponseDto> {
    return await this.bankAccountService.createVirtualCard(email);
  }

  @Get('card-numbers/:id')
  async viewCardSensitiveInformations(
    @Headers('email') email: string,
    @Param('id') cardId: string,
  ): Promise<{ consentUrl: string }> {
    return await this.bankAccountService.viewCardNumbers(cardId, email);
  }
}
