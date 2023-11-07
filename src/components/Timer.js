import { useEffect } from "react";

function Timer({ secondsRemain, dispatch }) {
  const mins = Math.floor(secondsRemain / 60);
  const secs = secondsRemain % 60;
  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}
    </div>
  );
}

export default Timer;
