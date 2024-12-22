import Decimal from 'decimal.js';

export function centsToEuros(cents: Decimal): Decimal {
  return cents.dividedBy(100);
}

export function eurosToCents(euros: Decimal) {
  return euros.mul(100);
}
