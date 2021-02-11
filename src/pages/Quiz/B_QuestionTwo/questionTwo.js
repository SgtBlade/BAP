import React, { useState } from "react";
import style from "./questionTwo.module.css";

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
          className={`${style.quizButton} ${style.quizButtonGrey} ${
            selectedAnswer === 1 ? style.active : ""
          }`}
        >
          <span className={style.quizButtonText}>
            'T Café{" "}
            <span role="img" aria-label="bier">
              🍻
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(2);
            questionTwoAnswer(["Natuur", "Milieu"]);
          }}
          className={`${style.quizButton} ${style.quizButtonOrange}
          ${selectedAnswer === 2 ? `${style.active}` : ""}`}
        >
          <span className={style.quizButtonText}>
            De natuur{" "}
            <span role="img" aria-label="boom">
              🌳
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(3);

            questionTwoAnswer(["Architectuur", "Commercieel"]);
          }}
          className={`${style.quizButton} ${style.quizButtonGreen}
          ${selectedAnswer === 3 ? `${style.active}` : ""}`}
        >
          <span className={style.quizButtonText}>
            De stad{" "}
            <span role="img" aria-label="stad">
              🏙
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(4);
            questionTwoAnswer("Ontspanning");
          }}
          className={`${style.quizButton} ${style.quizButtonRed}
          ${selectedAnswer === 4 ? `${style.active}` : ""}`}
        >
          <span className={style.quizButtonText}>
            Thuis{" "}
            <span role="img" aria-label="huis">
              🏠
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuestionTwo;
