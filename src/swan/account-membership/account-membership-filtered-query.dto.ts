import { gql } from '@apollo/client/core';

export interface AccountMembershipAccount {
  balances: AccountMembershipBalances;
}

export interface AccountMembershipBalances {
  available: AccountMembershipAvailableBalanceInfo;
}

export interface AccountMembershipAvailableBalanceInfo {
  currency: string;
  value: number;
}

export interface AccountMembershipNode {
  id: string;
  account: AccountMembershipAccount;
}

export interface AccountMembershipsEdge {
  node: AccountMembershipNode;
}

export interface AccountMembershipsData {
  accountMemberships: {
    edges: AccountMembershipsEdge[];
  };
}

export const AccountMembershipsByEmailQuery = gql`
  query AccountMembershipsByEmail($email: String!) {
    accountMemberships(filters: { email: $email }) {
      edges {
        node {
          id
          account {
            balances {
              available {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`;
