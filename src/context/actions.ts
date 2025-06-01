import type { CurrencyState } from "./types";

export const UPDATE_FIELD = "UPDATE_FIELD";

export const updateField = (payload: Partial<CurrencyState>) => ({
  type: UPDATE_FIELD,
  payload,
});
