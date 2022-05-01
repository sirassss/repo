import { InjectionToken } from '@angular/core';

export interface CurrencyMaskConfig {
  align: string;
  allowNegative: boolean;
  decimal: string;
  precision: number;
  prefix: string;
  prec?: number;
  suffix: string;
  thousands: string;
  negative: string;
  autocomplete: string;
}

export let CURRENCY_MASK_CONFIG = new InjectionToken<CurrencyMaskConfig>('currency.mask.config');
