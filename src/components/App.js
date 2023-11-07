import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // 'loading
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemain: 10,
};

const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemain: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemain: state.secondsRemain - 1,
        status: state.secondsRemain === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highScore, secondsRemain } =
    state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        const request = await fetch("http://localhost:7000/questions");
        const data = await request.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              index={index}
              numOfQuestion={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemain={secondsRemain} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestion={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            highscore={highScore}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
