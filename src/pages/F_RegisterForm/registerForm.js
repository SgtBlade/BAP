import React, {useState} from "react";
import Compressor from 'compressorjs';
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./registerForm.module.css";
import { RESPONSE } from "../../consts/responses";


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
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    
    //first if is to ensure the uploaded file is an image, if it's not -> clear the value to remove the image
    //second if is to check if filesize is within bounds
    if (!validImageTypes.includes(fileType) ) {
      alert(RESPONSE.NotAnImage);
      e.currentTarget.value = "";
      return;
    }else if(fileSize > 2) alert(RESPONSE.fileSizeOver2MB);
    else{
      //Creating a new compressor instance to compress the received image, compress by 60% to the set maxwidth and height.
      //Once it's done it outputs a Blob which needs to be converted to Base64 in order to store in the firebase storage 
      //Display the new image in the preview window and replace the old image in the picture parameter
      new Compressor(file, {
        quality: 0.4,
        minWidth: 127,
        minHeight: 127,
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

  //Basic conversion from blob to base64
  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  //On submitting the form an object gets made with the required data for the new user
  //all data gets pushed to the uiStore after which it goes to the userService to create the account
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
    <div className={style.registerContainer}>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleCreateSubmit}>
          <p className={`alertwindow ${style.negative}`}></p>
          <legend className={style.formTitle}>Registreer</legend>
          <br></br>

          <label class={style.label} htmlFor="lname"> Voornaam: <input id="lname" value={lname} onChange={e => setLname(e.currentTarget.value)} className={style.input} type={"text"} placeholder="Type hier uw voornaam"/> </label>          
          <label class={style.label} htmlFor="name"> Achternaam: <input id="name" value={name} onChange={e => setName(e.currentTarget.value)} className={style.input} type={"text"}  placeholder="Type hier uw achternaam"/> </label>
          
          <label class={style.label} htmlFor="createEmail"> E-mail: <input id="createEmail" value={email} onChange={e => setEmail(e.currentTarget.value)} className={style.input} type={"email"} placeholder="voorbeeld@provider.be"/> </label> 
          <label class={style.label} htmlFor="createPassword"> Wachtwoord: <input id="createPassword" value={password} onChange={e => setPassword(e.currentTarget.value)} className={style.input} type={"password"} placeholder="Vul hier het wachtwoord in" /> </label>

          
          <label class={style.label} htmlFor="phone"> Telefoon: <input id="phone" value={phone} onChange={e => setPhone(e.currentTarget.value)} className={style.input} type={"text"} /> </label>
          {/* <label class={`${style.label} ${style.label__checkbox}`} htmlFor="publicPhone"> Het telefoonnummer mag publiek staan <input id="publicPhone" value={publicPhone} onChange={e => setPublicPhone(e.currentTarget.checked)} className={`${style.input} ${style.input__checkbox}`} type={"checkbox"} placeholder="+32 470 12 34 56" /> </label>
          <label class={`${style.label} ${style.label__checkbox}`} htmlFor="publicMail">Het e-mail mag publiek staan<input id="publicMail" value={publicMail} onChange={e => setPublicMail(e.currentTarget.checked)} className={`${style.input} ${style.input__checkbox}`} type={"checkbox"} /> </label> */}
        <label class={style.label} htmlFor="bio"> Korte biografie: <textarea id="bio" value={bio} onChange={e => setBio(e.currentTarget.value)} className={`${style.input} ${style.input__textfield}`} type={"text"} placeholder="Begin hier met typen"/> </label>
          
          <label class={style.label}>
            Upload een profielfoto:
            <div className={style.label__image__container}>
              <input className={`${style.input} ${style.input__image}`}
                  onChange={handleChangePhotoFileInput}
                  type="file"
                />
              <img alt={'preview'} src={'./assets/profile/defaultProfileImage.png'} height='50' width='50' className={`testObject ${style.testObject}`}/>
            </div>
          </label>
          
          <button className={style.confirmButton} type="submit">Wordt nu een Durver</button> 
          
        </form>
      </div>
    </div>
    </>
  ));
};

export default RegisterForm;
