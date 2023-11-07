function ProgressBar({ index, points, numOfQuestion, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numOfQuestion} />
      <p>
        Questions <strong>{index + 1}</strong> / {numOfQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressBar;
