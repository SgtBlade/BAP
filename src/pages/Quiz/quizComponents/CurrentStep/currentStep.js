import React, { useState, useEffect } from "react";

import ProgressBar from "../Progressbar/progressbar";
import QuestionOne from "../../A_QuestionOne/questionOne";
import QuestionTwo from "../../B_QuestionTwo/questionTwo";

import moduleStyle from "./currentStep.module.css";
import globalStyle from "../../../globalStyles/main.module.css";

const style = { ...moduleStyle, ...globalStyle };

const CurrentStep = ({ onSetStep }) => {
  const [curStep, setCurStep] = useState(1);

  const [prevButtonText, setPrevButtonText] = useState("Prev rendered yet");
  const [nextButtonText, setNextButtonText] = useState("Next not rendered yey");

  // create empty vars to pass updated data in updateButtonText()
  let prevButtonVar;
  let nextButtonVar;

  const receivedButtonText = (prev, next) => {
    console.log(`${prev} - ${next}`);
    console.log(`prev B4: ${prevButtonVar}  - next B4: ${nextButtonVar}`);
    prevButtonVar = prev;
    nextButtonVar = next;
    console.log(`prev now: ${prevButtonVar} - next now: ${nextButtonVar}`);
  };

  const swapStepComponent = currentStep => {
    let stepComponent;
    switch (currentStep) {
      case 1:
        stepComponent = (
          <QuestionOne onReveiveButtonText={receivedButtonText}></QuestionOne>
        );
        break;
      case 2:
        stepComponent = (
          <QuestionTwo onReveiveButtonText={receivedButtonText}></QuestionTwo>
        );
        break;
      case 3:
        stepComponent = "QuestionThree";
        break;
      case 4:
        stepComponent = "QuestionFour";
        break;
      case 5:
        stepComponent = "Results";
        break;
      default:
        stepComponent =
          "Vragen laden... duurt het langer dan 1min? Laad dan de pagina opnieuw";
        break;
    }
    return stepComponent;
  };

  //trigger update after every render
  useEffect(() => {
    console.log("useEffect Triggered");
    updateButtonText();
  });

  const updateButtonText = () => {
    console.log(`prev: ${prevButtonVar}`);
    console.log(`next: ${nextButtonVar}`);
    setPrevButtonText(prevButtonVar);
    setNextButtonText(nextButtonVar);
  };

  return (
    <>
      <ProgressBar currentStep={curStep}></ProgressBar>

      <div className={style.stepQuestionContainer}>
        <p className={style.currentQuestionTitle}>
          {curStep <= 4 ? `${`Vraag ${curStep} van 4`}` : ""}
        </p>

        {/* Load the correct step component */}
        {swapStepComponent(curStep)}
      </div>

      <div className={style.quizStepButtons}>
        <button
          className={style.previousButton}
          type="button"
          onClick={() => onSetStep(curStep)}
        >
          {`${prevButtonText}`}
        </button>
        <button
          type="button"
          className={style.mainButton}
          onClick={() => setCurStep(curStep + 1)}
        >
          {`${nextButtonText}`}
        </button>
        {/* currentvraagstap */}

        {/* previous & next button */}
      </div>
    </>
  );
};

export default CurrentStep;
