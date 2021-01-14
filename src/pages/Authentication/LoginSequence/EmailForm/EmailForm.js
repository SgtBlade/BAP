import React, {useState} from "react";
import style from "./EmailForm.module.css";
import Header from "../Header/Header.js";
import GeneralButton from "../../../globalComponents/GeneralButton";
import ErrorMessage from "../../../globalComponents/ErrorMessage.js";
import { useStores } from "../../../../hooks/useStores.js";
//import { ROUTES } from "../../consts";

const EmailForm = (props) => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState([false, false]);
  const { uiStore } = useStores();



  const handleSubmit = async () => {
      if(!email.includes('@') || !email.includes('.') || email.length < 3)setError([true, false])
      else {
        localStorage.setItem("emailForSignIn", email)
        const res = await uiStore.loginWithEmail(email);


        if(res)props.nextFunction();
        else setError([true, 'Er is een fout opgetreden'])
      }
  }


  const checkEnter = e => {if(e.keyCode === 13) handleSubmit()}
  return (
    <div className={style.wrapper}>
      <Header 
      Title={props.Title ? props.Title : "Account aanmaken"}
      Return={props.Return ? true : false}
      function={props.returnFunction ? props.returnFunction : null}
      />
        <div className={style.mainContent}>
                    <p className={style.label}>Geef uw emailadres in:</p>
                    <input 
                    value={email} 
                    onKeyUp={checkEnter}
                    onChange={e => setEmail(e.currentTarget.value)}
                    className={style.input} 
                    type={"email"} 
                    />
                    <GeneralButton buttonWidth={"40rem"} fontSize={"3.6rem"} onClick={() => {handleSubmit()}} icon="mail" type="svg" text="Verstuur email"/>
        </div>
        <img className={style.image} src={"./assets/illustraties/uiltje-giggle-login.svg"} alt={"Giegelend uiltje"} />
    
      {error[0] ? 
      <ErrorMessage closeFunction={() => {setError(false)}} text={`${error[1] ? error[1] : 'Dit is geen geldig email adres'}`}/>
      :
      ''
      }
    </div>
  );
};

export default EmailForm;
