import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./loginForm.module.css";


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
    <div className={style.container}>
      <form className={style.form} onSubmit={handleLoginSubmit}> 
        {response[0] ? 
        <p className={style[response[1]]}> {response[2]}</p>
          : ''
        }
        <p className={`alertwindow ${style.negative}`}></p>
        <legend>LoginForm</legend>  <label htmlFor="email"> mail: <input id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> 
        <label htmlFor="password"> password: <input id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label> <button type="submit">Login</button> 
        <p onClick={() => {uiStore.resetPassword(email, setResponse)}}>Forgot password</p>
        </form>
     
    </div>
    </>
  ));
};

export default LoginForm;