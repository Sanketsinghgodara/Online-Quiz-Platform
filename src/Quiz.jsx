import { useState, useEffect } from "react";
import { resultInitailState } from "./Constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState({
    ...resultInitailState,
    notAnswered: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!showResult) {
      setTimer(30);

      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentQuestion, showResult]);

  useEffect(() => {
    if (timer === 0 && !showResult) {
      onClickNext();
    }
  }, [timer, showResult]);

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);

    setResult((prev) => {
      if (answerIdx === null) {
        return {
          ...prev,
          notAnswered: prev.notAnswered + 1,
        };
      } else if (answer) {
        return {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        };
      } else {
        return {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        };
      }
    });

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult({
      ...resultInitailState,
      notAnswered: 0,
    });
    setShowResult(false);
    setCurrentQuestion(0);
  };

  return (
    <>
      <div className="quiz-container">
        {!showResult && (
          <div className="timer-container">
            <h3>Time Left: {timer} seconds</h3>
          </div>
        )}
        {!showResult ? (
          <>
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-questions">/{questions.length}</span>
            <h2>{question}</h2>

            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerClick(answer, index)}
                  key={answer}
                  className={answerIdx === index ? "selected-answer" : null}
                >
                  {answer}
                </li>
              ))}
            </ul>

            <div className="footer">
              <button
                onClick={onClickNext}
                disabled={answerIdx === null && timer > 0}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <p>
              Not Answered: <span>{result.notAnswered}</span>
            </p>
            <button onClick={onTryAgain}>Try again</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
