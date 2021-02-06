import React from "react";
import style from "./projectCard.module.css";

const ProjectCard = ({project}) => {
  return (
    <div className={style.projectCardContainer}>
      <br></br>
      <br></br>
      <p className={style.projectCardTitle}>{project.title}d</p>
      <p>Date: {(new Date(project.creationDate)).toString()}</p>
      <img src="" alt=""></img>
      {/* check for display description */}
      {/* check for project state */}
      {/* loop over tags */}
      <div className={style.projectCardTags}>
        {project.tags.map((tag, index) => {
          return <span key={`${project.id}_${index}`}>{tag}</span>
        })}
      </div>
    </div>
  );
};

export default ProjectCard;