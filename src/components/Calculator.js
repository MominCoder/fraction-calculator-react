import { useEffect, useReducer } from "react";
import Keypad from "./Keypad";
import { initialState, reducer } from "../helper/reducer";
import { isValidKeyPress } from "../helper/utils";
import Screen from "./Screen";

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleButtonClick = (value) => {
    if (value === "=") {
      dispatch({ type: "CALCULATE" });
    } else if (value === "AC") {
      dispatch({ type: "CLEAR_SCREEN" });
    } else if (value === "⌫") {
      dispatch({ type: "DEL_DIGIT" });
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      dispatch({ type: "CHOOSE_OPERATION", payload: { operator: value } });
    } else {
      dispatch({ type: "ADD_TO_EXPRESSION", payload: { digit: value } });
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (!key) return;

    if (isValidKeyPress(key)) {
      event.preventDefault();

      if (key === "Enter" || key === "=") {
        dispatch({ type: "CALCULATE" });
      } else if (key === "Backspace") {
        dispatch({ type: "DEL_DIGIT" });
      } else if (key === "Escape") {
        dispatch({ type: "CLEAR_HISTORY" });
      } else if (key === "Delete") {
        dispatch({ type: "CLEAR_SCREEN" });
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        dispatch({ type: "CHOOSE_OPERATION", payload: { operator: key } });
      } else {
        dispatch({ type: "ADD_TO_EXPRESSION", payload: { digit: key } });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      dispatch({ type: "FETCH_HISTORY", payload: parsedHistory });
    }
  }, []);

  return (
    <div className="calc">
      <Screen state={state} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
}
