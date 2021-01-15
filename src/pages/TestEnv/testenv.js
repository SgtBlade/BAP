import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const Testenv = () => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async e => {
    e.preventDefault();
    await uiStore.verifyLogin(email, password);
  }

  const handleCreateSubmit = async e => {
    e.preventDefault();
    await uiStore.createAccount(email, password);
    await uiStore.verifyEmail(email);
  }

  return useObserver(() => (
    <>
    <div className={style.container}>

      <p>Dit is de test environment</p>

      {
        uiStore.verifiedUser ?
        <p className={style.green}>This email is verified!!!!!!</p>
        :
        <p className={style.red}>This email is not verified</p>
      }
      <br></br>
      <div>
      <form onSubmit={handleLoginSubmit}> <legend>LoginForm</legend>  <label htmlFor="email"> mail: <input id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> <label htmlFor="password"> password: <input id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label> <button type="submit">Login</button> </form>
      <br></br>
      <form onSubmit={handleCreateSubmit}> <legend>createForm</legend>  <label htmlFor="createEmail"> mail: <input id="createEmail" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> <label htmlFor="createPassword"> password: <input id="createPassword" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label> <button type="submit">create</button> </form>
      <br></br>
      <button onClick={() => {uiStore.logOut()}}>Logout</button>
      </div>

    </div>
    </>
  ));
};

export default Testenv;
