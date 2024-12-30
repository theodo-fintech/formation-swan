import Decimal from 'decimal.js';

export const BANK_ACCOUNT_SERVICE = 'BANK_ACCOUNT_SERVICE';

export interface BankAccountService {
  getBalance: (email: string) => Promise<Decimal>;
  createVirtualCard: (
    email: string,
  ) => Promise<{ cardId: string; consentUrl: string }>;
  viewCardNumbers: (
    cardId: string,
    email: string,
  ) => Promise<{ consentUrl: string }>;
}
