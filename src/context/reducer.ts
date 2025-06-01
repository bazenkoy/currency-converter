import { UPDATE_FIELD } from "./actions";
import type { Action, CurrencyState } from "./types";

export const currencyReducer = (
  state: CurrencyState,
  action: Action
): CurrencyState => {
  switch (action.type) {
    case UPDATE_FIELD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
