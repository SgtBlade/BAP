import React, {useState} from "react";
import Compressor from 'compressorjs';
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./registerForm.module.css";


const RegisterForm = () => {
  const { uiStore } = useStores();
  const [email, setEmail] = useState("migueleken@hotmail.com");
  const [password, setPassword] = useState("test12345");
  const [name, setName] = useState("de pelsmaeker");
  const [lname, setLname] = useState("miguel");
  const [phone, setPhone] = useState("+32 478 32 99 38");
  const [publicPhone, setPublicPhone] = useState(false);
  const [publicMail, setPublicMail] = useState(false);
  const [bio, setBio] = useState("testing the fish in the pond when it is still hot");
  const [picture, setPicture] = useState('');

  const handleChangePhotoFileInput = async e => {
    const target = e.currentTarget;
    const file = target.files.item(0);
    const fileSize =  target.files[0].size / 1024 / 1024;
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    
    if (!validImageTypes.includes(fileType) ) {
      alert("Dit is geen jpg/png foto bestand");
      e.currentTarget.value = "";
      return;
    }else if(fileSize > 2) alert("De foto moet kleiner zijn dan 2 Megabyte");
    else{
      new Compressor(file, {
        quality: 0.4,
        maxWidth: 127,
        maxHeight: 127,
        success(result) {
          setPicture(result);
          if (URL) {
            blobToBase64(result).then(res => {
              document.querySelector('.testObject').src = res;
              setPicture(res)
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

  const handleCreateSubmit = async e => {
    e.preventDefault();
    const data = {
      name : name,
      surname : lname,
      bio : bio,
      image : picture,
      publicMail: publicMail,
      publicPhone: publicPhone,
      phone: phone,
    }
    await uiStore.createAccount(email, password, data);
  }

  return useObserver(() => (
    <>
    <div className={style.container}>
      <form className={style.form} onSubmit={handleCreateSubmit}>
        <p className={`alertwindow ${style.negative}`}></p>
         <legend>Register form</legend>
         <br></br>
         
         <label htmlFor="createEmail"> mail: <input id="createEmail" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} /> </label> 
         <label htmlFor="createPassword"> password: <input id="createPassword" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} /> </label>

         <label htmlFor="name"> name: <input id="name" value={name} onChange={e => setName(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         <label htmlFor="lname"> surname: <input id="lname" value={lname} onChange={e => setLname(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         <label htmlFor="phone"> phone: <input id="phone" value={phone} onChange={e => setPhone(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
         <label htmlFor="publicPhone"> Set phone public: <input id="publicPhone" value={publicPhone} onChange={e => setPublicPhone(e.currentTarget.checked)} className={style.input} type={"checkbox"} /> </label>
         <label htmlFor="publicMail"> Set mail public: <input id="publicMail" value={publicMail} onChange={e => setPublicMail(e.currentTarget.checked)} className={style.input} type={"checkbox"} /> </label>
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
         <img alt={'preview'} src={'./assets/profile/defaultProfileImage.png'} height='50' width='50' className={`testObject ${style.testObject}`}/>
         </form>
      </div>
    </>
  ));
};

export default RegisterForm;
