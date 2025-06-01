import type { updateField } from "./actions";

export type CurrencyOption = { value: string; label: string };

export type CurrencyState = {
  fromCurrency: string;
  toCurrency: string;
  options: CurrencyOption[];
  fromAmount?: string;
  toAmount?: string;
};

export type Action = ReturnType<typeof updateField>;

export enum CurrencyOptions {
  FROM = "FROM",
  TO = "TO",
}
