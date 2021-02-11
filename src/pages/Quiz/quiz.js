import React, { useState } from "react";
// import { useObserver } from "mobx-react-lite";

import moduleStyle from "./quiz.module.css";
import globalStyle from "../globalStyles/main.module.css";

import CurrentStep from "./quizComponents/CurrentStep/currentStep";
const style = { ...moduleStyle, ...globalStyle };

const Quiz = () => {
  const [stepNum, setStepNum] = useState(1);

  const receivedStep = step => {
    // receive step from child component
    setStepNum(step);
  };


  return (
    <div className={style.container}>
      <h1 className="hidden">Durf2030 - Quiz</h1>
      <h2 className={style.title}>
        Krijg jouw gerpersonaliseerde aanbevelingen
        {/* show current step: {stepNum} */}
      </h2>
      {/* send function reference to child component (when a step is set)*/}
      <CurrentStep onSetStep={receivedStep} currentStep={stepNum}></CurrentStep>
      {/* previous & next button */}
    </div>
  );
};

export default Quiz;
