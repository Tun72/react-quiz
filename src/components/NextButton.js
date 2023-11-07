function NextButton({ dispatch, answer, index, numOfQuestion }) {
  if (answer === null) return null;
  return (
    <div>
      {index === numOfQuestion - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "finish" });
          }}
        >
          Finish
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default NextButton;
