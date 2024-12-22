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
  user: User;
  account: AccountMembershipAccount;
}

export interface User {
  id: string;
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
          user {
            id
          }
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
