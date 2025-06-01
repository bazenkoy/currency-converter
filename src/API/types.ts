interface Currency {
  name: string;
  short_code: string;
}

export type CurrenciesList = { response: Currency[] };
