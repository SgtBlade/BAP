import React from "react";
import style from "./results.module.css";

const Results = ({ onReveiveButtonText }) => {
  // set prev & next button text
  const prevButtonText = "Vorige Vraag: Ik ben...";
  const nextButtonText = "";
  // pass the button text to the parent component
  onReveiveButtonText(prevButtonText, nextButtonText);

  return (
    <div>
      <p className={style.title}>Deze tags verzamelden we voor jou</p>
    </div>
  );
};

export default Results;
