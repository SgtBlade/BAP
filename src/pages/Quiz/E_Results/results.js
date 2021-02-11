import React from "react";
import style from "./results.module.css";
import Tag from "../../../components/Tag/tag";

const Results = ({ onReveiveButtonText, receivedTags }) => {
  // set prev & next button text
  const prevButtonText = "Vorige Vraag: Ik ben...";
  const nextButtonText = "";
  // pass the button text to the parent component
  onReveiveButtonText(prevButtonText, nextButtonText);

  console.log("receivedTags:");
  const tagsFromAnswers = receivedTags.flat(2);
  console.log("receivedTags");
  console.log(tagsFromAnswers);
  return (
    <div>
      <p className={style.title}>Deze tags verzamelden we voor jou</p>
      <div className={style.collectedTags}>
        {tagsFromAnswers.map(tag => (
          <Tag key={tag} text={tag}></Tag>
        ))}
      </div>
    </div>
  );
};

export default Results;
