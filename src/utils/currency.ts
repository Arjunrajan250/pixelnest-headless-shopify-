import { Currency } from '../types';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  rateAgainstUSD: number;
  flag: string;
  fractionDigits: number;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateAgainstUSD: 1.0,
    flag: '🇺🇸',
    fractionDigits: 2
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateAgainstUSD: 0.92,
    flag: '🇪🇺',
    fractionDigits: 2
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateAgainstUSD: 0.79,
    flag: '🇬🇧',
    fractionDigits: 2
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rateAgainstUSD: 1.36,
    flag: '🇨🇦',
    fractionDigits: 2
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    rateAgainstUSD: 1.52,
    flag: '🇦🇺',
    fractionDigits: 2
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rateAgainstUSD: 84.0,
    flag: '🇮🇳',
    fractionDigits: 0
  }
};

/**
 * Converts a base USD amount to the target currency and formats it with the appropriate currency symbol.
 */
export function formatPrice(amountInUSD: number, targetCurrency: Currency = 'USD'): string {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = amountInUSD * config.rateAgainstUSD;

  if (targetCurrency === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }

  const formattedNumber = converted.toLocaleString(undefined, {
    minimumFractionDigits: config.fractionDigits,
    maximumFractionDigits: config.fractionDigits
  });

  return `${config.symbol}${formattedNumber}`;
}

/**
 * Convert USD to raw amount in target currency
 */
export function convertPrice(amountInUSD: number, targetCurrency: Currency = 'USD'): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = amountInUSD * config.rateAgainstUSD;
  return targetCurrency === 'INR' ? Math.round(converted) : parseFloat(converted.toFixed(2));
}
