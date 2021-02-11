import React, { useState } from "react";
import moduleStyle from "./questionFour.module.css";
import quizGlobalStyle from "../quizGlobalStyles/quizGlobalStyle.module.css";

const style = { ...moduleStyle, ...quizGlobalStyle };

const answersArr = [[], [], [], [], []];

const QuestionFour = ({ onReveiveButtonText, onPickedQuestionFourAnswer }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);

  // // for UI only
  // const [selectedAnswersButtons, setSelectedAnswerButtons] = useState([]);

  // set prev & next button text
  const prevButtonText = "Vorige Vraag: Tijd spenderen";
  const nextButtonText = "Bekijk jouw verzamelde tags";
  // pass the button text to the parent component
  onReveiveButtonText(prevButtonText, nextButtonText);

  //toggle answers (remove answer if already in array, add answer if not)
  const toggleButton = value => {
    const index = selectedButtons.indexOf(value);
    if (index > -1) {
      let buttonsCopy = [...selectedButtons];
      buttonsCopy.splice(index, 1);
      setSelectedButtons([...buttonsCopy]);
    } else {
      setSelectedButtons([...selectedButtons, value]);
    }
  };

  // array/object comparisons are not done by values but by reference
  const toggleAnswers = (arrNum, arrValue) => {
    console.log(answersArr);
    if (answersArr[arrNum].length !== 0) {
      console.log(`Array contained value, remove value`);
      answersArr[arrNum].length = 0;
    } else {
      console.log(`Array did not contain value, insert value`);
      answersArr[arrNum] = arrValue;
      // console.log(answersArr[arrNum]);
    }
    console.log("after");
    setSelectedAnswers(answersArr);
    // send answers to parrent component
    onPickedQuestionFourAnswer(selectedAnswers);
  };

  // Cannot be done with single toggleAnswer([item, item] because array/object comparisons are not done by values)
  // const toggleAnswers = (...values) => {
  //   values.forEach(value => {
  //     const index = selectedAnswers.indexOf(value);
  //   if (index > -1) {
  //     let answersCopy = [...selectedAnswers];
  //     answersCopy.splice(index, 1);
  //     setSelectedAnswers([...answersCopy]);
  //     console.log(`value found: ${value} - index: ${index}`);
  //   } else {
  //     setSelectedAnswers([...selectedAnswers, value]);
  //   }
  //   // send answers to parrent component
  //   onPickedQuestionFourAnswer(selectedAnswers);
  //   });
  // };

  // const toggleAnswers = (answerNum) => {
  //   switch (answerNum) {
  //     case 5:
  //       const index = selectedAnswers.indexOf(value);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  const logAnswers = () => {
   
  };

  return (
    <div>
      <p className={style.questionTitle} onClick={() => logAnswers()}>
        Ik ben...{" "}
        <span className={style.questionTitleInfo}>
          (meerdere opties mogelijk)
        </span>
      </p>
      <div className={style.answers}>
        <button
          type="button"
          onClick={() => {
            toggleAnswers(0, ["Diversiteit"]);
            toggleButton(0);
          }}
          className={`${style.quizButton} ${
            selectedButtons.includes(0) ? style.active : ""
          }`}
        >
          <p className={style.quizButtonText}>
            Exotisch <br />
            <span
              className={style.buttonEmoji}
              role="img"
              aria-label="Palmboom"
            >
              🌴
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAnswers(1, ["Literatuur", "Educatie", "Technologie"]);
            toggleButton(1);
          }}
          className={`${style.quizButton} 
          ${selectedButtons.includes(1) ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Geeky <br />
            <span
              className={style.buttonEmoji}
              role="img"
              aria-label="Geeky persoon"
            >
              🤓
            </span>
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAnswers(2, ["Godsdienst"]);
            toggleButton(2);
          }}
          className={`${style.quizButton}
          ${selectedButtons.includes(2) ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Religieus <br />
            <span className={style.buttonEmoji} role="img" aria-label="Boek">
              📖
            </span>
          </p>
        </button>
        <button
          type="button"
          // Cannot be done with single toggleAnswer([item, item]) like in questionThree.js because array/object comparisons are not done by values)
          onClick={() => {
            toggleAnswers(3, ["Eten", "Drinken"]);
            toggleButton(3);
          }}
          className={`${style.quizButton}
          ${selectedButtons.includes(3) ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Lekkerbek <br />
            <span className={style.buttonEmoji} role="img" aria-label="Koekje">
              🍪
            </span>
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            toggleAnswers(4, ["Kunst", "Fotografie"]);
            toggleButton(4);
          }}
          className={`${style.quizButton}
          ${selectedButtons.includes(4) ? `${style.active}` : ""}`}
        >
          <p className={style.quizButtonText}>
            Artistiek <br />
            <span className={style.buttonEmoji} role="img" aria-label="Kunst">
              🎨
            </span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default QuestionFour;
