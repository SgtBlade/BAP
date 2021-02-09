import React, { useState } from "react";
import style from "./questionOne.module.css";

const QuestionOne = () => {
  const [selectedAnswer, setSelectedAnswer] = useState();

  return (
    <div>
      <p className={style.questionTitle}>
        Hoe sportief ben je in je vrije tijd?
      </p>
      <div className={style.answers}>
        <button
          type="button"
          onClick={() => setSelectedAnswer(1)}
          className={`${style.quizButton} ${style.quizButtonGrey} ${
            selectedAnswer === 1 ? style.active : ""
          }`}
        >
          <img
            src="assets/images/quiz/nothingmeter.svg"
            width="114"
            height="114"
            alt="Lage/lege actiefmeter"
          ></img>
          <span className={style.quizButtonText}>Niet sportief</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedAnswer(2)}
          className={`${style.quizButton} ${style.quizButtonOrange}
          ${selectedAnswer === 2 ? `${style.active}` : ""}`}
        >
          <img
            src="assets/images/quiz/somemeter.svg"
            width="114"
            height="114"
            alt="redelijk lage actiefmeter"
          ></img>
          <span className={style.quizButtonText}>Soms sportief</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedAnswer(3)}
          className={`${style.quizButton} ${style.quizButtonGreen}
          ${selectedAnswer === 3 ? `${style.active}` : ""}`}
        >
          <img
            src="assets/images/quiz/regularmeter.svg"
            width="114"
            height="114"
            alt="normale actiefmeter"
          ></img>
          <span className={style.quizButtonText}>Sportief</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedAnswer(4)}
          className={`${style.quizButton} ${style.quizButtonRed}
          ${selectedAnswer === 4 ? `${style.active}` : ""}`}
        >
          <img
            src="assets/images/quiz/verymeter.svg"
            width="114"
            height="114"
            alt="Hoge actiefmeter"
          ></img>
          <span className={style.quizButtonText}>Heel sportief</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionOne;
