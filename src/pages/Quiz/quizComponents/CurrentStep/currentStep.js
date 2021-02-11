import React, { useState, useEffect } from "react";

import ProgressBar from "../Progressbar/progressbar";
import QuestionOne from "../../A_QuestionOne/questionOne";
import QuestionTwo from "../../B_QuestionTwo/questionTwo";
import QuestionThree from "../../C_QuestionThree/questionThree";
import QuestionFour from "../../D_QuestionFour/questionFour";
import Results from "../../E_Results/results";

import moduleStyle from "./currentStep.module.css";
import globalStyle from "../../../globalStyles/main.module.css";

const style = { ...moduleStyle, ...globalStyle };

// let tags = [];
// const calcAnswers = answer => {
//   tags.push(answer);
//   console.log(tags);
// };

// create an empty array with room for all the question answers
const selectedTags = [[], [], [], []];

// get the answer(s) from  specific questions
// Q1
const pickedQuestionOneAnswers = answer => {
  console.log(answer);
  selectedTags[0] = answer;
};
//Q2
const pickedQuestionTwoAnswers = answer => {
  console.log(answer);
  selectedTags[1] = answer;
};
//Q3
const pickedQuestionThreeAnswers = answer => {
  console.log(answer);
  selectedTags[2] = answer;
};
//Q4
const pickedQuestionFourAnswers = answer => {
  console.log(answer);
  selectedTags[3] = answer;
};

const CurrentStep = ({ onSetStep }) => {
  const [curStep, setCurStep] = useState(1);

  const [prevButtonText, setPrevButtonText] = useState("Prev rendered yet");
  const [nextButtonText, setNextButtonText] = useState("Next not rendered yey");

  // create empty vars to pass updated data in updateButtonText()
  let prevButtonVar;
  let nextButtonVar;

  const receivedButtonText = (prev, next) => {
    prevButtonVar = prev;
    nextButtonVar = next;
  };

  const swapStepComponent = currentStep => {
    let stepComponent;
    switch (currentStep) {
      case 1:
        stepComponent = (
          <QuestionOne
            onReveiveButtonText={receivedButtonText}
            onPickedQuestionOneAnswer={pickedQuestionOneAnswers}
          ></QuestionOne>
        );
        break;
      case 2:
        stepComponent = (
          <QuestionTwo
            onReveiveButtonText={receivedButtonText}
            onPickedQuestionTwoAnswer={pickedQuestionTwoAnswers}
          ></QuestionTwo>
        );
        break;
      case 3:
        stepComponent = (
          <QuestionThree
            onReveiveButtonText={receivedButtonText}
            onPickedQuestionThreeAnswer={pickedQuestionThreeAnswers}
          ></QuestionThree>
        );
        break;
      case 4:
        stepComponent = (
          <QuestionFour
            onReveiveButtonText={receivedButtonText}
            onPickedQuestionFourAnswer={pickedQuestionFourAnswers}
          ></QuestionFour>
        );
        break;
      case 5:
        stepComponent = (
          <Results onReveiveButtonText={receivedButtonText}></Results>
        );
        break;
      default:
        stepComponent =
          "Vragen laden... duurt het langer dan 1min? Laad dan de pagina opnieuw";
        break;
    }
    return stepComponent;
  };

  // trigger update after (every) render
  useEffect(() => {
    console.log("useEffect Triggered");
    updateButtonText();
    console.log(selectedTags);
  });

  const updateButtonText = () => {
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
        {prevButtonText ? (
          <button
            className={style.previousButton}
            type="button"
            // onSetStep passes step info to quiz component, setCurStep changes the actual step
            onClick={() => {
              onSetStep(curStep - 1);
              setCurStep(curStep - 1);
            }}
          >
            {`${prevButtonText}`}
          </button>
        ) : (
          <button className={style.skipButton} onClick={() => setCurStep(5)}>
            Sla de vragenreeks over
          </button>
        )}
        <button
          type="button"
          className={style.mainButton}
          onClick={() => {
            onSetStep(curStep + 1);
            setCurStep(curStep + 1);
            // sendAnswers("test");
          }}
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
