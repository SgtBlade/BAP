import React from "react";
// import { useStores } from "../../hooks/useStores";
// import { useObserver } from "mobx-react-lite";

import moduleStyle from "./quiz.module.css";
import globalStyle from "../globalStyles/main.module.css";

import CurrentStep from "./quizComponents/CurrentStep/currentStep";

const style = { ...moduleStyle, ...globalStyle };

const Quiz = () => {
  return (
    <div className={style.container}>
      <h1 className="hidden">Durf2030 - Quiz</h1>
      <h2 className={style.title}>
        Krijg jouw gerpersonaliseerde aanbevelingen
      </h2>
      {/* progressbarcomponent */}
      <CurrentStep></CurrentStep>
      {/* previous & next button */}
    </div>
  );
};

export default Quiz;
