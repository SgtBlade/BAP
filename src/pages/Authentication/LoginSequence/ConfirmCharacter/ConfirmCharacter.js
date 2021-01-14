import React from "react";
import { Redirect } from "react-router-dom";
import { ROUTES } from "../../../../consts";
import style from "./ConfirmCharacter.module.css";
import COLORS from "../../../globalStyles/colors.js";
import SoundButton from "../../../globalComponents/SoundButton.js";
import GeneralButton from "../../../globalComponents/GeneralButton";
import { useStores } from "../../../../hooks/useStores";

const ConfirmCharacter = (props) => {
  const { uiStore } = useStores();
  
  const updateUser = () => {
    const result = uiStore.updateUser(props.name, props.character.character, props.color)
    if(result) return <Redirect to={ROUTES.home} />
  }

  return (
    <div className={style.container}>
      <div className={style.warningMessage}>
        <div className={style.warningWrap}>
          <p className={style.warningMessageText}>De gebruikersnaam en het uiltje kunnen later niet meer worden aangepast!</p>
          <img className={style.warningMessageIcon} src={"./assets/icons/warning.svg"} alt={"warning icon"}/>
          <div className={style.soundButton}>
            <SoundButton size={"8.2rem"} reScale={1.2} backgroundColor={COLORS.yellow} play={"welcome"}/></div>
        </div>
      </div>

      <div className={style.mainContent}>
        <img src={`./assets/illustraties/characters/${props.character.character}.svg`} alt={"gekozen uiltje"}/>

        <div className={style.personalDetailsWrap}>
            <p className={style.userNameTitle}>Gebruikersnaam:</p>
            <p className={style.userName}>{props.name}</p>
            <div style={{backgroundColor: props.color}} className={style.userColor}></div>
        </div>

      </div>

      <div className={style.buttonWrapper}>
          <GeneralButton buttonWidth={"34.5rem"} fontSize={"3.6rem"} onClick={props.returnFunction} icon="edit" type="svg" text="Veranderen"/>
          <GeneralButton buttonWidth={"34.5rem"} fontSize={"3.6rem"} onClick={updateUser} icon="save" type="svg" text="Opslaan"/>
        </div>
    </div>
  );
};

export default ConfirmCharacter;
