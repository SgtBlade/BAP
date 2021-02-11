import React, { useState } from "react";
import moduleStyle from "./questionThree.module.css";
import quizGlobalStyle from "../quizGlobalStyles/quizGlobalStyle.module.css";

const style = { ...moduleStyle, ...quizGlobalStyle };

const QuestionThree = ({
  onReveiveButtonText,
  onPickedQuestionThreeAnswer,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // set prev & next button text
  const prevButtonText = "Vorige Vraag: Favoriete locatie";
  const nextButtonText = "Volgende vraag: Ik ben...";
  // pass the button text to the parent component
  onReveiveButtonText(prevButtonText, nextButtonText);

  // send the picked answer to the parent component
  //   const questionThreeAnswer = answer => {
  //     onPickedQuestionThreeAnswer(answer);
  //   };

  //toggle answers (remove answer if already in array, add answer if not)
  const toggleAnswer = value => {
    const index = selectedAnswers.indexOf(value);
    if (index > -1) {
      let answersCopy = [...selectedAnswers];
      answersCopy.splice(index, 1);
      setSelectedAnswers([...answersCopy]);
      console.log(`value found: ${value} - index: ${index}`);
    } else {
      setSelectedAnswers([...selectedAnswers, value]);
    }
    // send answers to parrent component
    onPickedQuestionThreeAnswer(selectedAnswers);
  };

  const logAnswers = () => {
    console.log(selectedAnswers);
  };

  return (
    <div>
      <p className={style.questionTitle} onClick={() => logAnswers()}>
        Ik spendeer mijn vrije tijd met...
      </p>
      <div className={style.answers}>
        <button
          type="button"
          onClick={() => {
            toggleAnswer("Gezin");
            // questionThreeAnswer("Gezin");
          }}
          className={`${style.quizButton} ${
            selectedAnswers.indexOf("Gezin") > -1 ? style.active : ""
          }`}
        >
          <p className={style.quizButtonText}>
            Gezin <br />
            <span className={style.buttonEmoji} role="img" aria-label="Gezin">
              👨‍👩‍👧‍👦
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAnswer("Koppel");
            //questionThreeAnswer("Koppel");
          }}
          className={`${style.quizButton} 
          ${selectedAnswers.indexOf("Koppel") > -1 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Partner <br />
            <span className={style.buttonEmoji} role="img" aria-label="hart">
              ❤️
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAnswer("Familie");
            //questionThreeAnswer("Familie");
          }}
          className={`${style.quizButton}
          ${selectedAnswers.indexOf("Familie") > -1 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Familie <br />
            <span className={style.buttonEmoji} role="img" aria-label="Familie">
              👨‍🦳👩👶
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAnswer("Vrienden");
            // questionThreeAnswer("Vrienden");
          }}
          className={`${style.quizButton}
          ${selectedAnswers.indexOf("Vrienden") > -1 ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Vrienden <br />
            <span className={style.buttonEmoji} role="img" aria-label="huis">
              🤜🤛
            </span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default QuestionThree;
