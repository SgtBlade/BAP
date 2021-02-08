import React from "react";
import style from "./progressbar.module.css";

const ProgressBar = ({ currentStep }) => {
  const getBarNumberClass = stepNumber => {
    if (stepNumber < currentStep) {
      return `${style.passed}`;
    } else if (stepNumber === currentStep) {
      return `${style.active}`;
    }
  };

  return (
    <div className={style.progressbarContainer}>
      <progress
        className={style.progressbar}
        value={currentStep}
        max="6"
      ></progress>
      <div className={style.progressbarNumbers}>
        <div className={`${style.progressbarNumber} ${getBarNumberClass(1)}`}>
          1
        </div>
        <div className={`${style.progressbarNumber} ${getBarNumberClass(2)}`}>
          2
        </div>
        <div className={`${style.progressbarNumber} ${getBarNumberClass(3)}`}>
          3
        </div>
        <div className={`${style.progressbarNumber} ${getBarNumberClass(4)}`}>
          4
        </div>
        <div className={`${style.progressbarNumber} ${getBarNumberClass(5)}`}>
          5
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
