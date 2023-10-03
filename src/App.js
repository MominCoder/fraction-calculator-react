import { useContext } from "react";
import Calculator from "./components/Calculator";
import { ThemeContext } from "./helper/theme";
import "./styles.css";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Calculator />
    </div>
  );
}
