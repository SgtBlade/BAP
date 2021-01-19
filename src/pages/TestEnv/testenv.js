import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
import RegisterForm from "../F_RegisterForm/registerForm.js"
import LoginForm from "../F_LoginForm/loginForm.js";
import Profile from "../profile/profile";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const Testenv = () => {
  const { uiStore } = useStores();
  const [login, setLogin] = useState(true);
  const toggle = () => setLogin(!login);

  const testFunction = () => {
    uiStore.logUserStoreRequests();
    console.log('*********')
    console.log(uiStore.currentUser)
  }


  return useObserver(() => (
    <div className={style.wrap}>
    <div className={style.container}>
      <h1>Dit is de test environment</h1>
      <p className={style.toggleswitch} onClick={toggle}>{login ? 'register' : 'login'}</p>
      <div>
      {login ? <LoginForm/> : <RegisterForm/>}
      <button onClick={() => {uiStore.logOut()}}>Logout</button>
      </div>
    </div>

    <div className={style.userWindow}>
      <p onClick={testFunction}>testButton</p>

      {
        uiStore.currentUser ? 
        <Profile/>
        :
        ''
      }
      
    </div>
    </div>
  ));
};

export default Testenv;