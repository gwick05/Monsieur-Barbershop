import { calOneYearFromNow } from './helpers/calcOneYearFromNow';

export const strongPasswordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
);
export const PAGE_SIZE = 8;
export const ONE_YEAR_FROM_NOW = calOneYearFromNow();
