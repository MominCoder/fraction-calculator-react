import { evaluate, format } from "mathjs/number";

export const initialState = {
  expression: "",
  result: "",
  history: [],
  currentOperand: ""
};

export const operators = ["+", "-", "/", "*"];

export const reducer = (state, { type, payload }) => {
  const calculateResult = ({ expression }) => {
    if (!expression) return;

    let res = evaluate(expression);

    function isDecimal(num) {
      return num % 1;
    }

    if (!isDecimal(res)) {
      return res;
    } else {
      // return format(res, 14);
      return res.toPrecision(4);
    }
  };

  switch (type) {
    case "FETCH_HISTORY":
      return {
        history: payload,
        expression: "",
        result: ""
      };

    case "ADD_TO_EXPRESSION":
      if (payload.digit === "0" && state.currentOperand === "0") return state;

      if (
        payload.digit === "." &&
        state.currentOperand &&
        state.currentOperand.includes(".")
      )
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        expression: `${state.expression}${payload.digit}`
      };

    case "CLEAR_SCREEN":
      if (state.expression && state.result) {
        const historyItem = {
          expression: state.expression,
          result: state.result
        };

        const updatedHistory = [...state.history, historyItem].slice(1, 11); // MAX_HISTORY_STORED = 10
        localStorage.setItem(
          "calculatorHistory",
          JSON.stringify(updatedHistory)
        );

        return {
          expression: "",
          result: "",
          history: updatedHistory
        };
      }

      return state;

    case "DEL_DIGIT":
      return {
        ...state,
        expression: state.expression.trim().slice(0, -1),
        currentOperand: state.currentOperand.trim().slice(0, -1)
      };

    case "CHOOSE_OPERATION":
      const lastChar = state.expression.trim().slice(-1);

      const updatedExpressionWithOperator = /[+*/-]/.test(lastChar)
        ? `${state.expression.trim().slice(0, -1)} ${payload.operator} `
        : `${state.expression} ${payload.operator} `;

      return {
        ...state,
        currentOperand: null,
        expression: updatedExpressionWithOperator
      };

    case "CALCULATE":
      if (!state.expression) return;

      return {
        ...state,
        result: calculateResult(state)
      };

    default:
      return state;
  }
};
