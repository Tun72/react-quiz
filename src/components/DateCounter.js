import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  // if(action.type === "desc") return state - action.payload;
  // else if(action.type === "asc") return state + action.payload;
  // else if(action.type === "setCount") return  action.payload;
}
function DateCounter() {
  const [state, dispacth] = useReducer(reducer, 0);
  const { count, step } = state;
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispacth({ type: "desc", payload: 1 });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispacth({ type: "asc", payload: 1 });
  };

  const defineCount = function (e) {
    // setCount();
    dispacth({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
