import { useContext } from "react";
import { ThemeContext } from "../helper/theme";

export default function Keypad({ onButtonClick }) {
  const { theme } = useContext(ThemeContext);

  const buttons = [
    "AC",
    "(",
    ")",
    "⌫",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+"
  ];

  return (
    <div className="keypad">
      {buttons.map((val, i) => (
        <button x={val} onClick={() => onButtonClick(val)} key={i}>
          {val}
        </button>
      ))}
    </div>
  );
}
