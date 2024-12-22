import Decimal from 'decimal.js';
import { BankAccountService } from './bank-account.interface';
import { SwanBalanceService } from 'src/swan/balance/swan-balance.service';
import { Injectable } from '@nestjs/common';
import { SwanCardService } from '../swan/card/swan-card.service';
import { Card } from '../swan/card/add-card-mutation.dto';

@Injectable()
export class SwanBankAccountService implements BankAccountService {
  constructor(
    private readonly swanBalanceService: SwanBalanceService,
    private readonly swanCardService: SwanCardService,
  ) {}

  async getBalance(email: string): Promise<Decimal> {
    return await this.swanBalanceService.getBalance(email);
  }

  async createVirtualCard(
    email: string,
  ): Promise<{ cardId: string; consentUrl: string }> {
    const card: Card = await this.swanCardService.createVirtualCard(email);
    return { cardId: card.id, consentUrl: card.statusInfo.consent.consentUrl };
  }
}
