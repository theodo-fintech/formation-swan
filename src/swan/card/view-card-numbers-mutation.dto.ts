import { gql } from '@apollo/client/core';

export interface ViewCardNumbersInput {
  cardId: string;
  consentRedirectUrl: string;
}

interface CardConsentInfo {
  consentUrl: string;
}

export interface ViewCardNumbersSuccessPayload {
  __typename: 'ViewCardNumbersSuccessPayload';
  consent: CardConsentInfo;
}

export type ViewCardNumbersResult = ViewCardNumbersSuccessPayload;

export interface ViewCardNumbersMutationData {
  viewCardNumbers: ViewCardNumbersResult;
}

// Mutation GraphQL
export const VIEW_CARD_NUMBERS_MUTATION = gql`
  mutation ViewCardNumbers($input: ViewCardNumbersInput!) {
    viewCardNumbers(input: $input) {
      ... on ViewCardNumbersSuccessPayload {
        __typename
        consent {
          consentUrl
        }
      }
    }
  }
`;