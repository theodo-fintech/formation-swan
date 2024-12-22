import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SwanAccountMembershipService } from './account-membership/swan-account-membership.service';
import { SwanAuthService } from './auth/swan-auth.service';
import { SwanBalanceService } from './balance/swan-balance.service';
import { SwanController } from './swan-controller';
import { SwanCardService } from './card/swan-card.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SwanController],
  providers: [
    SwanAccountMembershipService,
    SwanAuthService,
    SwanBalanceService,
    SwanCardService,
  ],
  exports: [SwanBalanceService, SwanCardService],
})
export class SwanModule {}
