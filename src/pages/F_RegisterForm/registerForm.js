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
