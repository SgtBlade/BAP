import React from "react";
import style from "./MailSent.module.css";
import Header from "../Header/Header.js"
import COLORS from "../../../globalStyles/colors";
//import { ROUTES } from "../../consts";

const MailSent = (props) => {

  return (
    <div className={style.container}>
    <Header 
    color={COLORS.blueDark}
    fillColor={COLORS.white}
    backgroundColor={COLORS.blue}
    Title={"Mailtje verzonden!"} 
    Return={true} 
    function={props.returnFunction}/>
    <img className={style.plane} src={"./assets/icons/plane.svg"} alt={"vliegtuigje"} />
      <div className={style.mainContent}>
        <img className={style.mailIcon} src={"./assets/icons/mailOpen.svg"} alt={"Open mail icon"} />
        <p className={style.mainContentText}>We hebben u een email verstuurd  waarmee uw kind zich kan aanmelden.</p>
      </div>
      <img className={style.image} src={"./assets/illustraties/uiltje-giggle-login.svg"} alt={"Giegelend uiltje"} />
    </div>


  );
};

export default MailSent;
