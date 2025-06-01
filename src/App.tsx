import "./App.css";
import { CurrencyProvider } from "./context/CurrencyContext";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => (
  <CurrencyProvider>
    <h1>Currency Converter</h1>
    <CurrencyConverter />
  </CurrencyProvider>
);

export default App;
