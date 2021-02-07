import React from "react";
import style from "./progressbar.module.css";

const ProgressBar = () => {
  return (
    <>
      <p>Progressbar</p>
      <progress className={style.progressbar} value="5" max="6"></progress>
      {/* currentvraagstap */}
      {/* currentvraag */}
      {/* previous & next button */}
    </>
  );
};

export default ProgressBar;
