import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../helper/theme";

export default function Screen({ state }) {
  const { expression, result, history } = state;
  const scollToRef = useRef();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    scollToRef.current.scrollIntoView();
  }, [expression, result]);

  return (
    <div className="screen">
      <button className="toggler" onClick={() => toggleTheme()}>
        {theme}
      </button>
      <div className="history">
        {history &&
          history?.map((obj, i) => (
            <div key={i}>
              <p>{obj?.expression}</p>
              <p>{obj?.result}</p>
            </div>
          ))}
      </div>
      <div ref={scollToRef}>
        <p>{expression}</p>
        <p>{expression && result}</p>
      </div>
    </div>
  );
}
