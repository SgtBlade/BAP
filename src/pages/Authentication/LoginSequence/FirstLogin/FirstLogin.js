import React from "react";
import style from "./FirstLogin.module.css";
import Header from "../Header/Header.js";
import GeneralButton from "../../../globalComponents/GeneralButton";

const FirstLogin = (props) => {

  return (
    <div className={style.container}>
      
    <Header  Title={"Helemaal klaar!"}/>
    <div className={style.mainContentWrapper}>
      <p className={style.permission__list}>U kan het toestel terug aan uw kind geven.</p>
      <div className={style.nextButton}><GeneralButton buttonWidth={"34.5rem"} fontSize={"3.6rem"} onClick={props.nextFunction} icon="arrowRight" type="svg" text="Personaliseer"/></div>
    </div>
  </div>
  );
};

export default FirstLogin;
