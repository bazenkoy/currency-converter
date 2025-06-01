import axios from "axios";
import type { CurrenciesList } from "./types";

const instance = axios.create({
  baseURL: "https://api.currencybeacon.com/v1",
});

instance.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

export const getCurrenciesList = () =>
  instance.get<CurrenciesList>("/currencies");

export const convertCurrency = (from: string, to: string, amount: string) =>
  instance.get<{ value: number }>(
    `/convert?from=${from}&to=${to}&amount=${amount}`
  );
