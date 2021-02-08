import React, { useState } from "react";
// import { useStores } from "../../hooks/useStores";
// import { useObserver } from "mobx-react-lite";

import moduleStyle from "./quiz.module.css";
import globalStyle from "../globalStyles/main.module.css";

import CurrentStep from "./quizComponents/CurrentStep/currentStep";

const style = { ...moduleStyle, ...globalStyle };

// let curStepNum = 1;
// const setCurStep = stepNum => {
//   console.log(stepNum);
// };

const Quiz = () => {
  const [stepNum, setCurStep] = useState(1);

  const receivedStep = step => {
    // receive nextStep from child component
    setCurStep(step);
    console.log(step);
  };

  return (
    <div className={style.container}>
      <h1 className="hidden">Durf2030 - Quiz</h1>
      <h2 className={style.title}>
        Krijg jouw gerpersonaliseerde aanbevelingen
      </h2>
      {/* send function reference to child component*/}
      <CurrentStep onSetStep={receivedStep} currentStep={stepNum}></CurrentStep>
      {/* previous & next button */}
    </div>
  );
};

export default Quiz;
