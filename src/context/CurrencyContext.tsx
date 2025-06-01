import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { convertCurrency, getCurrenciesList } from "../API";
import {
  debounce,
  ensureOnlyLastResult,
  ignoreDeprectatedResultError,
} from "../utils";
import { CurrencyOptions, type CurrencyState } from "./types";
import { currencyReducer } from "./reducer";
import { updateField } from "./actions";

const initialState: CurrencyState = {
  fromCurrency: "USD",
  toCurrency: "EUR",
  options: [],
};

const getEnsuredLastCurrencyConvert = ensureOnlyLastResult(convertCurrency); //to prevent outdated results from earlier calls overwriting newer values

const CurrencyContext = createContext<{
  state: CurrencyState;
  onChangeFromAmount: (amount: string) => void;
  onChangeToAmount: (amount: string) => void;
  onChangeToCurrency: (value: string) => void;
  onChangeFromCurrency: (value: string) => void;
} | null>(null);

export const CurrencyProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  useEffect(() => {
    getCurrenciesList()
      .then(({ data }) => {
        const options = data.response.map((item) => ({
          value: item.short_code,
          label: item.name,
        }));
        dispatch(updateField({ options }));
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong. Try again later.");
      });
  }, []);

  const convertAmount = useMemo(
    () =>
      debounce((amount: string, isFrom: boolean) => {
        const from = isFrom ? state.fromCurrency : state.toCurrency;
        const to = isFrom ? state.toCurrency : state.fromCurrency;

        getEnsuredLastCurrencyConvert(from, to, amount)
          .then(({ data }) => {
            const rounded = String(Math.round(data.value * 100) / 100);
            if (isFrom) {
              dispatch(updateField({ toAmount: rounded }));
            } else {
              dispatch(updateField({ fromAmount: rounded }));
            }
          })
          .catch(
            ignoreDeprectatedResultError((err) => {
              console.error(err);
              alert("Something went wrong. Try again later.");
            })
          );
      }, 150),
    [state.fromCurrency, state.toCurrency]
  );

  const onChangeAmount = useCallback(
    (currency: CurrencyOptions, amount: string) => {
      if (currency === CurrencyOptions.TO) {
        dispatch(updateField({ toAmount: amount }));
      } else if (currency === CurrencyOptions.FROM) {
        dispatch(updateField({ fromAmount: amount }));
      }
      convertAmount(amount, currency === CurrencyOptions.FROM ? true : false);
    },
    [convertAmount]
  );

  const onChangeCurrency = useCallback(
    (currency: CurrencyOptions, value: string) => {
      if (currency === CurrencyOptions.TO) {
        dispatch(updateField({ toCurrency: value }));
      } else if (currency === CurrencyOptions.FROM) {
        dispatch(updateField({ fromCurrency: value }));
      }
      if (state.toCurrency && state.fromAmount) {
        convertAmount(state.fromAmount, true);
      }
    },
    [convertAmount, state.fromAmount, state.toCurrency]
  );

  const onChangeToCurrency = useCallback(
    (value: string) => onChangeCurrency(CurrencyOptions.TO, value),
    [onChangeCurrency]
  );

  const onChangeToAmount = useCallback(
    (value: string) => onChangeAmount(CurrencyOptions.TO, value),
    [onChangeAmount]
  );

  const onChangeFromCurrency = useCallback(
    (value: string) => onChangeCurrency(CurrencyOptions.FROM, value),
    [onChangeCurrency]
  );

  const onChangeFromAmount = useCallback(
    (value: string) => onChangeAmount(CurrencyOptions.FROM, value),
    [onChangeAmount]
  );

  const value = useMemo(
    () => ({
      state,
      onChangeFromAmount,
      onChangeToAmount,
      onChangeToCurrency,
      onChangeFromCurrency,
    }),
    [
      onChangeToCurrency,
      onChangeFromAmount,
      onChangeToAmount,
      onChangeFromCurrency,
      state,
    ]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrencyContext must be used within CurrencyProvider");
  return context;
};
