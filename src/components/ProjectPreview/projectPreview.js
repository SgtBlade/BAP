import React from "react";
import style from "./projectPreview.module.css";
import COLORS from "./../../pages/globalStyles/colors.js";

const ProjectPreview = (props, tags) => {
  let color;
  let textColor;
  let typeText;

  // Checks wich type project it is and changes the colors according to the type of project
  switch (props.type) {
    case "success":
      color = COLORS.durfYellow;
      textColor = "black";
      typeText = "Afgerond";
      break;

    case "failed":
      color = COLORS.durfRed;
      textColor = "white";
      typeText = "Afgelast";
      break;

    case "funding":
      color = COLORS.durfGreen;
      textColor = "white";
      typeText = "Funding";
      break;

    case "voting":
      color = COLORS.lightGrey;
      textColor = "black";
      typeText = "Stemmen";
      break;

    default:
      color = "black";
      textColor = "white";
      break;
  }

  return (
    <article className={style.projectCard}>
      <span
        className={style.borderLeft}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <div className={style.projectCard__container}>
        <img
          className={style.projectCard__image}
          src="/assets/project/placeholder2.png"
          alt="projectImage"
        />
        <div className={style.projectCard__container__content}>
          <div className={style.projectCard__container__content__title}>
            <h3 className={style.projectCard__title}>The Rope</h3>
            <p
              className={style.projectCard__type}
              style={{
                backgroundColor: color,
                color: textColor,
              }}
            >
              {typeText}
            </p>
          </div>

          {props.type === "funding" ? (
            <div className={style.projectCard__funding}>
              <div className={style.projectCard__funding__progressValues}>
                <p
                  className={
                    style.projectCard__funding__progressValues__content
                  }
                >
                  € 1250
                </p>
                <p
                  className={
                    style.projectCard__funding__progressValues__content
                  }
                >
                  € 2500
                </p>
              </div>
              <progress
                className={`${style.projectCard__funding__progressBar}`}
                value="50"
                max="100"
              />
              <p className={style.projectCard__time}>22 dagen resterend</p>
            </div>
          ) : (
            ""
          )}

          {props.type === "voting" ? (
            <div className={style.projectCard__voting}>
              <p className={style.projectCard_voting_text}>
                Beoordeel dit project
              </p>
              <p className={style.projectCard__time}>22 dagen resterend</p>
              <div className={style.projectCard__voting__container}>
                <img src="/assets/icons/thumbs-up.svg" alt="duim omhoog" />
                <p className={style.projectCard__voting__amount}>40</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {props.type === "failed" ? (
            <div className={style.projectCard__voting}>
              <p className={style.projectCard_voting_text}>
                De stemmenteller staat op:
              </p>
              <p className={style.projectCard__time}>22 dagen resterend</p>
              <div className={style.projectCard__voting__container}>
                <img src="/assets/icons/thumbs-up.svg" alt="duim omhoog" />
                <p className={style.projectCard__voting__amount}>40</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <p className={style.projectCard__description}>
            {props.description ? props.description : ""}
          </p>

          <div className={style.projectCard__tags}>
            <p className={style.projectCard__tag}>
              <span className={style.projectCard__tag__color}></span>
              {/* tags.text */}
              Sociaal
            </p>
            <p className={style.projectCard__tag}>
              <span className={style.projectCard__tag__color}></span>
              Sociaal
            </p>
            <p className={style.projectCard__tag}>
              <span className={style.projectCard__tag__color}></span>
              Sociaal
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectPreview;
