import React, {useState} from "react";
import style from "./NameRequest.module.css";
import Header from "../Header/Header.js";
import GeneralButton from "../../../globalComponents/GeneralButton.js";
import CHARACTERS from "../../../A_userVariables/characters.js";
import ErrorMessage from "../../../globalComponents/ErrorMessage.js";
import COLORS from "../../../A_userVariables/publicColors.js";
import { useObserver } from "mobx-react-lite";
//import { ROUTES } from "../../consts";

const NameRequest = (props) => {

  
  const [error, setError] = useState([false]);
  const [colorList, showColorlist] = useState(false);
  const toggleColors = e => colorList ? showColorlist(false) : showColorlist(true);
  
  const nextCharacter = () => {
    if(props.character.key === CHARACTERS.length-1)props.characterChange({key: 0, character: CHARACTERS[0]})
    else props.characterChange({key: props.character.key+1, character: CHARACTERS[props.character.key+1]})
  }

  const previousCharacter = () => {
    if(props.character.key === 0)props.characterChange({key: CHARACTERS.length-1, character: CHARACTERS[CHARACTERS.length-1]})
    else props.characterChange({key: props.character.key-1, character: CHARACTERS[props.character.key-1]})
  }
  
  if(props.character === "")props.characterChange({key: 0, character: CHARACTERS[0]})
  const handleSubmit = e => {e.preventDefault(); checkStatus()}
  const checkStatus = () => (props.name.length < 3 || props.name.length > 10) ? setError([true, 'gelieve een naam in te geven tussen de 3 en 10 tekens']) : props.nextFunction();


  return useObserver( () => (
    <div onClick={colorList ? toggleColors : null} className={style.container}>
    <Header Title={"Account maken"}/>
    
      <div className={style.mainContent}>
        <form onSubmit={handleSubmit} className={style.nameForm}>
          <label className={style.nameForm__label}>Kies een gebruikersnaam</label>
          <input
          className={style.nameForm__input}
          value={props.name}
          onChange={e => props.nameChange(e.currentTarget.value)}
          type={"text"} 
          />

          <label className={style.nameForm__label}>Kies een kleurtje</label>
          <div onClick={toggleColors} className={style.color} style={{backgroundColor: props.color}}> </div>
          
          {colorList ?
            <ul className={style.colorList}>
            {Object.keys(COLORS).map(function(key) {
                return <li key={key} onClick={() => {props.colorChange(COLORS[key]); toggleColors()}} style={{ backgroundColor: COLORS[key] }} className={`${style.colorList__item} ${props.color === COLORS[key] ? style.activeColor : ''}`}></li>
            })}
            </ul>
          :
          ''
          }
          

          <GeneralButton buttonWidth={"34.5rem"} fontSize={"3.6rem"} onClick={() => {checkStatus()}} icon="save" type="svg" text="Opslaan"/>
        </form>

        <div className={style.avatarWrap}>
          <div onClick={previousCharacter} className={style.button}></div>
          <div className={style.imageWrapper}> <img src={`./assets/illustraties/characters/${props.character.character}.svg`} alt={"avatar"} /></div>
          <div onClick={nextCharacter} className={style.button}></div>
        </div>
      </div>
      {error[0] ? 
      <ErrorMessage closeFunction={() => {setError(false)}} text={`${error[1] ? error[1] : 'Dit is geen geldig email adres'}`}/>
      :
      ''
      }
    </div>
  ));
};

export default NameRequest;
