import React from "react";
import style from "./projectCard.module.css";

const ProjectCard = () => {
  return (
    <div className={style.projectCardContainer}>
      <br></br>
      <br></br>
      <p className={style.projectCardTitle}>A project card</p>
      <img src="" alt=""></img>
      {/* check for display description */}
      {/* check for project state */}
      {/* loop over tags */}
      <div className={style.projectCardTags}>
        <span>Sociaal</span>
        <span>Diversiteit</span>
        <span>Gezin</span>
      </div>
    </div>
  );
};

export default ProjectCard;
