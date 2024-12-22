import { gql } from '@apollo/client/core';

export interface AddCardInput {
  accountMembershipId: string;
  withdrawal: boolean;
  international: boolean;
  nonMainCurrencyTransactions: boolean;
  eCommerce: boolean;
  consentRedirectUrl: string;
}

interface CardConsentInfo {
  redirectUrl: string;
  userId: string;
  user: string;
  consentUrl: string;
}

interface CardConsentPendingStatusInfo {
  __typename: 'CardConsentPendingStatusInfo';
  status: string;
  consent: CardConsentInfo;
}

export interface Card {
  id: string;
  statusInfo: CardConsentPendingStatusInfo;
}

interface AddCardSuccessPayload {
  __typename: 'AddCardSuccessPayload';
  card: Card;
}

interface AccountMembershipNotAllowedRejection {
  __typename: 'AccountMembershipNotAllowedRejection';
  message: string;
}

interface BadAccountStatusRejection {
  __typename: 'BadAccountStatusRejection';
  id: string;
  message: string;
}

interface ForbiddenRejection {
  __typename: 'ForbiddenRejection';
  message: string;
}

interface MissingMandatoryFieldRejection {
  __typename: 'MissingMandatoryFieldRejection';
  message: string;
}

export type AddCardResult =
  | AddCardSuccessPayload
  | AccountMembershipNotAllowedRejection
  | BadAccountStatusRejection
  | ForbiddenRejection
  | MissingMandatoryFieldRejection;

export interface AddCardMutationData {
  addCard: AddCardResult;
}

// Mutation GraphQL
export const ADD_CARD_MUTATION = gql`
  mutation AddCard($input: AddCardInput!) {
    addCard(input: $input) {
      ... on AddCardSuccessPayload {
        card {
          id
          statusInfo {
            ... on CardConsentPendingStatusInfo {
              consent {
                consentUrl
              }
            }
            ... on CardCanceledStatusInfo {
              __typename
              reason
            }
            ... on CardCancelingStatusInfo {
              __typename
              reason
            }
            ... on CardEnabledStatusInfo {
              __typename
              status
            }
            ... on CardProcessingStatusInfo {
              __typename
              status
            }
          }
        }
      }
      ... on CardProductDisabledRejection {
        __typename
        message
      }
      ... on CardProductSuspendedRejection {
        __typename
        message
      }
      ... on AccountMembershipNotAllowedRejection {
        __typename
        message
      }
      ... on EnabledCardDesignNotFoundRejection {
        __typename
        message
      }
    }
  }
`;