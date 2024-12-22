import { SwanAccountMembershipService } from './../account-membership/swan-account-membership.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Decimal from 'decimal.js';

@Injectable()
export class SwanBalanceService {
  constructor(
    private swanAccountMembershipService: SwanAccountMembershipService,
  ) {}

  async getBalance(email: string): Promise<Decimal> {
    const accountMembership =
      await this.swanAccountMembershipService.getFirstAccountMembershipDetails(
        email,
      );
    return new Decimal(accountMembership.account.balances.available.value);
  }
}
