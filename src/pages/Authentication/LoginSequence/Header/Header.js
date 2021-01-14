import React from "react";
import style from "./Header.module.css";
import RoundArrowButton from "../../../globalComponents/RoundArrowButton.js";
import COLORS from "../../../globalStyles/colors";
//import { ROUTES } from "../../consts";

const Welcome = (props) => {

  return (
    <div className={style.wrapper}>
      {props.Title ? 
      <p className={style.title} style={{color: props.color? props.color: COLORS.white}}>{props.Title}</p>
        :
      ''
      }
      {props.Return ?
        <div className={style.buttonWrap}>
          <RoundArrowButton fillColor={props.fillColor} backgroundColor={props.backgroundColor} onClick={props.function}/>
        </div>
      :
      ''
      }
    </div>
  );
};

export default Welcome;
