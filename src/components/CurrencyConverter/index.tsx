import Select from "../Select";
import CurrencyInput from "../CurrencyInput";
import { useCurrencyContext } from "../../context/CurrencyContext";
import "./styles.css";

const CurrencyConverter: React.FC = () => {
  const {
    state: { fromAmount, toAmount, fromCurrency, toCurrency, options },
    onChangeFromAmount,
    onChangeToAmount,
    onChangeToCurrency,
    onChangeFromCurrency,
  } = useCurrencyContext();
  return (
    <div className="container">
      {fromAmount && (
        <>
          <div className="conversion-result">
            <h3 className="amount-value">{fromAmount}</h3>
            &nbsp;
            <h3>{fromCurrency}</h3>
          </div>
          <div className="conversion-result">
            <h3 className="amount-value">is equal to {toAmount}</h3>
            &nbsp;
            <h3>{toCurrency}</h3>
          </div>
        </>
      )}
      <div className="currency-converter">
        <div className="currency-converter__block">
          <Select
            id="from-currency"
            onChange={onChangeFromCurrency}
            value={fromCurrency}
            label="Choose curency"
            options={options}
          />
          <CurrencyInput value={fromAmount} onChange={onChangeFromAmount} />
        </div>
        <div className="currency-converter__block">
          <Select
            id="to-currency"
            onChange={onChangeToCurrency}
            value={toCurrency}
            label="Choose curency"
            options={options}
          />
          <CurrencyInput onChange={onChangeToAmount} value={toAmount} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
