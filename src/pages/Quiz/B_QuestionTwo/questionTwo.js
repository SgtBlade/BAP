import React, { useState } from "react";
import moduleStyle from "./questionTwo.module.css";
import quizGlobalStyle from "../quizGlobalStyles/quizGlobalStyle.module.css";

const style = { ...moduleStyle, ...quizGlobalStyle };

const QuestionTwo = ({ onReveiveButtonText, onPickedQuestionTwoAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();

  // set prev & next button text
  const prevButtonText = "Vorige Vraag: Hoe sportief";
  const nextButtonText = "Volgende vraag: Spendeer tijd met";
  // pass the button text to the parent component
  onReveiveButtonText(prevButtonText, nextButtonText);

  // send the picked answer to the parent component
  const questionTwoAnswer = answer => {
    onPickedQuestionTwoAnswer(answer);
  };

  return (
    <div>
      <p className={style.questionTitle}>Mijn favoriete locatie is...</p>
      <div className={style.answers}>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(1);
            questionTwoAnswer("Sociaal");
          }}
          className={`${style.quizButton} ${style.quizButtonRed} ${
            selectedAnswer === 1 ? style.active : ""
          }`}
        >
          <p className={style.quizButtonText}>
            'T Café{" "}
            <span className={style.buttonEmoji} role="img" aria-label="bier">
              🍻
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(2);
            questionTwoAnswer(["Natuur", "Milieu"]);
          }}
          className={`${style.quizButton} ${style.quizButtonGreen}
          ${selectedAnswer === 2 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            De natuur{" "}
            <span className={style.buttonEmoji} role="img" aria-label="boom">
              🌳
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(3);

            questionTwoAnswer(["Architectuur", "Commercieel"]);
          }}
          className={`${style.quizButton} ${style.quizButtonBlue}
          ${selectedAnswer === 3 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            De stad{" "}
            <span className={style.buttonEmoji} role="img" aria-label="stad">
              🏙
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(4);
            questionTwoAnswer("Ontspanning");
          }}
          className={`${style.quizButton} ${style.quizButtonYellow}
          ${selectedAnswer === 4 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Thuis{" "}
            <span className={style.buttonEmoji} role="img" aria-label="huis">
              🏠
            </span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default QuestionTwo;
