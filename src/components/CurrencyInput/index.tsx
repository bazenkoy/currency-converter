import "./styles.css";

interface CurrencyInputProps {
  onChange?: (amount: string) => void;
  value?: string;
  placeholder?: string;
}

const numberRegex = /^$|^(0|[1-9]\d*)(\.\d*)?$/;

const CurrencyInput = ({
  value = "",
  onChange,
  placeholder = "0",
}: CurrencyInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    //Restrict input to digits only — prevent characters like '-', '+', and 'e' that type="number" usually permits
    if (numberRegex.test(value) && onChange) {
      onChange(value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="currency-input"
    />
  );
};

export default CurrencyInput;
