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
      //TODO: construct AddCardInput
      const input = null as AddCardInput;

      const projectAccessToken =
        await this.swanAuthService.retrieveProjectToken();

      const mutation = {
        mutation: ADD_CARD_MUTATION,
        variables: { input },
        context: {
          headers: {
            authorization: `Bearer ${projectAccessToken}`,
            //TODO: retrieve userId to impersonate the user
            //'x-swan-user-id': `${userId}`,
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
    //TODO
    return null;
  }
}
