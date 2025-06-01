import type { ChangeEvent } from "react";
import "./styles.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

const Select = ({ id, label, value, onChange, options }: SelectProps) => (
  <div className="select-wrapper">
    <label htmlFor={id} className="select-label">
      {label}
    </label>
    <select
      id={id}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      value={value}
      className="select-input"
    >
      <option value="" disabled hidden>
        Select...
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
