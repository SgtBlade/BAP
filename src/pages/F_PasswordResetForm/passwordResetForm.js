import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./passwordResetForm.module.css";


const PasswordResetForm = () => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState("migueleken@hotmail.com");
  const [password, setPassword] = useState("test12345");

  const handleLoginSubmit = async e => {
    e.preventDefault();
    await uiStore.verifyLogin(email, password);
  }

  return useObserver(() => (
    <>
    <div className={style.container}>
      <form className={style.form} onSubmit={handleLoginSubmit}> 
        <p className={`alertwindow ${style.negative}`}></p>
        <legend>LoginForm</legend>  <label htmlFor="email"> mail: <input id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> 
        <label htmlFor="password"> password: <input id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label> <button type="submit">Login</button> </form>
    </div>
    </>
  ));
};

export default PasswordResetForm;