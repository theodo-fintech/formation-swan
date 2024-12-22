import Decimal from 'decimal.js';
import { BankAccountService } from './bank-account.interface';
import { SwanBalanceService } from 'src/swan/balance/swan-balance.service';
import { Injectable } from '@nestjs/common';
import { SwanCardService } from '../swan/card/swan-card.service';

@Injectable()
export class SwanBankAccountService implements BankAccountService {
  constructor(
    private readonly swanBalanceService: SwanBalanceService,
    private readonly swanCardService: SwanCardService,
  ) {}

  async getBalance(email: string): Promise<Decimal> {
    return await this.swanBalanceService.getBalance(email);
  }
}
