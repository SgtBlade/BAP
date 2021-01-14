import React from "react";
import style from "./PermissionDetail.module.css";
import Header from "../Header/Header.js";
import GeneralButton from "../../../globalComponents/GeneralButton";
import { useObserver } from "mobx-react-lite";
//import { ROUTES } from "../../consts";

const PermissionDetail = (props) => {

  return useObserver( () => (
    <div className={style.container}>
      
      <Header  Return={true} function={props.returnFunction} Title={"Geef het toestel even aan een volwassene"}/>
      <div className={style.mainContentWrapper}>
        <h2 className={style.permission__head}>Toestemming van de ouder of voogd is vereist om:</h2>
        <ul className={style.permission__list}>
          <li className={style.persmission__list__item}>Account aan te maken via email</li>
          <li className={style.persmission__list__item}>Camera te gebruiken</li>
          <li className={style.persmission__list__item}>Afbeeldingen en persoonlijke gegevens op te slaan</li>
          <li className={style.persmission__list__item}>Online activiteit beheren</li>
        </ul>
        <div className={style.nextButton}><GeneralButton buttonWidth={"34.5rem"} fontSize={"3.6rem"} onClick={props.nextFunction} icon="arrowRight" type="svg" text="Voor ouders"/></div>
      </div>
    </div>
  ));
};

export default PermissionDetail;