import React, { useState } from "react";

import ProgressBar from "../Progressbar/progressbar";

//temporary hardcoded value

const CurrentStep = ({ onSetStep }) => {
  const [curStep, setCurStep] = useState(1);

  return (
    <>
      <ProgressBar currentStep={curStep}></ProgressBar>
      <p>CurrentStep</p>
      <button onClick={() => setCurStep(curStep + 1)}>Add</button>
      {/* currentvraagstap */}
      <button onClick={() => onSetStep(curStep)}>
        Log Call func is in parent
      </button>
      {/* currentvraag */}
      {/* previous & next button */}
    </>
  );
};

export default CurrentStep;
