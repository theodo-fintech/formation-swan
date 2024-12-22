import { SwanAuthService } from '../auth/swan-auth.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import {
  AccountMembershipsData,
  AccountMembershipsByEmailQuery,
  AccountMembershipNode,
} from './account-membership-filtered-query.dto';

@Injectable()
export class SwanAccountMembershipService {
  private readonly apolloClient: ApolloClient<any>;
  private readonly swanApiUrl: string;
  private readonly logger = new Logger(SwanAccountMembershipService.name);

  constructor(
    readonly configService: ConfigService,
    private swanAuthService: SwanAuthService,
  ) {
    this.swanApiUrl = this.configService.get<string>('SWAN_API_URL');
    this.apolloClient = new ApolloClient<any>({
      uri: `${this.swanApiUrl}/graphql`,
      cache: new InMemoryCache(),
    });
  }

  async getFirstAccountMembershipDetails(
    email: string,
  ): Promise<AccountMembershipNode> {
    const accountMembershipData: AccountMembershipsData =
      await this.getAccountMembershipData(email);
    return accountMembershipData.accountMemberships.edges[0].node;
  }
  private async getAccountMembershipData(
    email: string,
  ): Promise<AccountMembershipsData> {
    try {
      const projectAccessToken =
        await this.swanAuthService.retrieveProjectToken();

      const accountMembershipsQueryResponse = await this.apolloClient.query({
        query: AccountMembershipsByEmailQuery,
        variables: {
          email,
        },
        context: {
          headers: {
            authorization: `Bearer ${projectAccessToken}`,
          },
        },
        fetchPolicy: 'network-only',
      });
      return accountMembershipsQueryResponse.data;
    } catch (error) {
      this.logger.error(
        `[getAccountMembershipsByEmail] failed to query getAccountMembershipsByEmail with email ${email}`,
        error,
      );
      throw new Error('Error while query account informations');
    }
  }
}
