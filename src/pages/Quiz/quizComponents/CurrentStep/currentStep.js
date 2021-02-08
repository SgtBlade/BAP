import React from "react";

import ProgressBar from "../Progressbar/progressbar";

//temporary hardcoded value
let currentStep = 3;

const CurrentStep = () => {
  return (
    <>
      <ProgressBar currentStep={currentStep}></ProgressBar>
      <p>CurrentStep</p>
      {/* currentvraagstap */}
      {/* currentvraag */}
      {/* previous & next button */}
    </>
  );
};

export default CurrentStep;
