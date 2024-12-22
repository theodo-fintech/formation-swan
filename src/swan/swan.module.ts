import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SwanAccountMembershipService } from './account-membership/swan-account-membership.service';
import { SwanAuthService } from './auth/swan-auth.service';
import { SwanBalanceService } from './balance/swan-balance.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    SwanAccountMembershipService,
    SwanAuthService,
    SwanBalanceService,
  ],
  exports: [SwanBalanceService],
})
export class SwanModule {}
