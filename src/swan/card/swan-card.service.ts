import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SwanAccountMembershipService } from './../account-membership/swan-account-membership.service';
import { SwanAuthService } from '../auth/swan-auth.service';
import {
  ADD_CARD_MUTATION,
  AddCardInput,
  AddCardMutationData,
  Card,
} from './add-card-mutation.dto';
import {
  VIEW_CARD_NUMBERS_MUTATION,
  ViewCardNumbersInput,
  ViewCardNumbersMutationData,
} from './view-card-numbers-mutation.dto';

@Injectable()
export class SwanCardService {
  private readonly apolloClient: ApolloClient<any>;
  private readonly swanApiUrl: string;
  private readonly logger = new Logger(SwanCardService.name);

  constructor(
    private readonly configService: ConfigService,
    private swanAccountMembershipService: SwanAccountMembershipService,
    private swanAuthService: SwanAuthService,
  ) {
    this.swanApiUrl = this.configService.get<string>('SWAN_API_URL');
    this.apolloClient = new ApolloClient<any>({
      uri: `${this.swanApiUrl}/graphql`,
      cache: new InMemoryCache(),
    });
  }

  async createVirtualCard(email: string): Promise<Card> {
    try {
      const accountMembership =
        await this.swanAccountMembershipService.getFirstAccountMembershipDetails(
          email,
        );

      if (!accountMembership) {
        throw new Error('No account membership found for this email');
      }

      const input: AddCardInput = {
        accountMembershipId: accountMembership.id,
        withdrawal: true,
        international: true,
        nonMainCurrencyTransactions: true,
        eCommerce: true,
        consentRedirectUrl: 'http://localhost:3000/redirect/consent',
      };

      const projectAccessToken =
        await this.swanAuthService.retrieveProjectToken();

      const mutation = {
        mutation: ADD_CARD_MUTATION,
        variables: { input },
        context: {
          headers: {
            authorization: `Bearer ${projectAccessToken}`,
            'x-swan-user-id': `${accountMembership.user.id}`,
          },
        },
      };

      const { data } =
        await this.apolloClient.mutate<AddCardMutationData>(mutation);

      if (!data) {
        throw new Error('No data returned from mutation');
      }

      const result = data.addCard;

      switch (result.__typename) {
        case 'AddCardSuccessPayload':
          return result.card;
        case 'MissingMandatoryFieldRejection':
          throw new Error(result.message);
        case 'ForbiddenRejection':
          throw new Error(result.message);
        case 'AccountMembershipNotAllowedRejection':
          throw new Error(result.message);
        case 'BadAccountStatusRejection':
          throw new Error(`Bad account status: ${result.message}`);
        default:
          throw new Error('Unknown error occurred');
      }
    } catch (error) {
      this.logger.error(
        `[createVirtualCard] failed to create virtual card for email ${email}`,
        error,
      );
      throw new Error('Error while creating virtual card');
    }
  }

  async viewCardNumbers({ email, cardId }: { email: string; cardId: string }) {
    try {
      const accountMembership =
        await this.swanAccountMembershipService.getFirstAccountMembershipDetails(
          email,
        );

      if (!accountMembership) {
        throw new Error('No account membership found for this email');
      }

      const input: ViewCardNumbersInput = {
        cardId,
        consentRedirectUrl: 'http://localhost:3000/redirect/consent',
      };

      const projectAccessToken =
        await this.swanAuthService.retrieveProjectToken();

      const mutation = {
        mutation: VIEW_CARD_NUMBERS_MUTATION,
        variables: { input },
        context: {
          headers: {
            authorization: `Bearer ${projectAccessToken}`,
            'x-swan-user-id': `${accountMembership.user.id}`,
          },
        },
      };

      const { data } =
        await this.apolloClient.mutate<ViewCardNumbersMutationData>(mutation);

      if (!data) {
        throw new Error('No data returned from mutation');
      }

      return data.viewCardNumbers;
    } catch (error) {
      this.logger.error(
        `[viewCardNumbers] failed to run mutation for email ${email}, and card id ${cardId}`,
        error,
      );
      throw new Error('Error while running viewCardNumbers mutation');
    }
  }
}
