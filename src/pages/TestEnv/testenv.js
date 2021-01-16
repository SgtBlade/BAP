import React, {useState} from "react";
import Compressor from 'compressorjs';
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const Testenv = () => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState("migueleken@hotmail.com");
  const [password, setPassword] = useState("test12345");
  const [name, setName] = useState("de pelsmaeker");
  const [surname, setsurName] = useState("miguel");
  const [bio, setBio] = useState("testing the fish in the pond when it is still hot");
  const [picture, setPicture] = useState(false);

  const handleChangePhotoFileInput = async e => {
    const target = e.currentTarget;
    const file = target.files.item(0);
    const fileSize =  target.files[0].size / 1024 / 1024;
    
    if (!file.type.startsWith("image/") || fileSize > 2) {
      alert("Dit is geen jpeg foto of is niet kleiner dan 2 Megabyte");
      e.currentTarget.value = "";
      return;
    }else{
      new Compressor(file, {
        quality: 0.4,
        maxWidth: 440,
        maxHeight: 440,
        success(result) {
          setPicture(result);
          if (URL) {

            blobToBase64(result).then(res => {
              document.querySelector('.testObject').src = res;
              setPicture(res)
              console.log(res);
            });
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }

  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    await uiStore.verifyLogin(email, password);
  }

  const handleCreateSubmit = async e => {
    e.preventDefault();
    const data = {
      name : name,
      surname : surname,
      bio : bio,
      image : picture,
    }
    //await uiStore.createAccount(email, password, data);
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
      <form className={style.form} onSubmit={handleLoginSubmit}> <legend>LoginForm</legend>  <label htmlFor="email"> mail: <input id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> <label htmlFor="password"> password: <input id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label> <button type="submit">Login</button> </form>
      <br></br>
      <form className={style.form} onSubmit={handleCreateSubmit}>
         <legend>createForm</legend>  
         <br></br>
         
         <label htmlFor="createEmail"> mail: <input id="createEmail" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> 
         <label htmlFor="createPassword"> password: <input id="createPassword" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label>

         <label htmlFor="name"> name: <input id="name" value={name} onChange={e => setName(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         <label htmlFor="lname"> surname: <input id="lname" value={surname} onChange={e => setsurName(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         <label htmlFor="bio"> bio: <textarea id="bio" value={bio} onChange={e => setBio(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         
         <br></br>
         <br></br>
         <label>
           Upload een image:
           <input
              onChange={handleChangePhotoFileInput}
              type="file"
            />
         </label>

          <button type="submit">create</button> 
         <img alt={'preview'} className={`testObject ${style.textObject}`}/>
         </form>
      <br></br>
      <button onClick={() => {uiStore.logOut()}}>Logout</button>
      </div>

    </div>
    </>
  ));
};

export default Testenv;
