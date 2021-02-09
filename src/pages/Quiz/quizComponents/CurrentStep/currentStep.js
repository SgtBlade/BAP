import React, { useState } from "react";

import ProgressBar from "../Progressbar/progressbar";
import QuestionOne from "../../A_QuestionOne/questionOne";

import style from "./currentStep.module.css";

//temporary hardcoded value

const swapStepComponent = currentStep => {
  let stepComponent;
  switch (currentStep) {
    case 1:
      stepComponent = <QuestionOne></QuestionOne>;
      break;
    case 2:
      stepComponent = "QuestionTwo";
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

const CurrentStep = ({ onSetStep }) => {
  const [curStep, setCurStep] = useState(1);

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

      <button onClick={() => setCurStep(curStep + 1)}>Add</button>
      {/* currentvraagstap */}
      <button onClick={() => onSetStep(curStep)}>
        Log Call func is in parent
      </button>

      {/* previous & next button */}
    </>
  );
};

export default CurrentStep;
