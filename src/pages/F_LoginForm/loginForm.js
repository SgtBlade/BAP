import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./loginForm.module.css";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";


const LoginForm = () => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState("migueleken@hotmail.com");
  const [password, setPassword] = useState("test12345");
  const [response, setResponse] = useState([false])

  const handleLoginSubmit = async e => {
    e.preventDefault();
    await uiStore.verifyLogin(email, password);
  }

  return useObserver(() => (
    <>
    <div className={style.loginContainer}>
      <div className={style.formContainer}>      
        <form className={style.form} onSubmit={handleLoginSubmit}> 
          <p className={`alertwindow ${style.negative}`}></p>
          <legend className={style.formTitle}>Meld je hier aan</legend>  
          <NavLink exact className={style.register} to={ROUTES.registreer}>Nog geen account?</NavLink>
          {response[0] ? 
          <p className={style[response[1]]}> {response[2]}</p>
            : ''
          }
          <div className={style.inputFieldsContrainer}>
            <label className={style.label} htmlFor="email">E-mail: 
              <input id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} placeholder="Vul hier je e-mail in"/> 
            </label> 
            <label className={style.label} htmlFor="password">Wachtwoord: 
              <input id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> 
              </label> 
            <button className={style.confirmButton} type="submit">Meld me aan</button> 
            <p className={style.resetPassword} onClick={() => {uiStore.resetPassword(email, setResponse)}}>Doeme, ik ben mijn wachtwoord vergeten</p>
          </div>
          </form>
        </div>
    </div>
    </>
  ));
};

export default LoginForm;