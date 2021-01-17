import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./profile.module.css";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const Profile = () => {
  const { uiStore } = useStores();

  return useObserver(() => (
        <div>
            <p className={style.profileName}>{uiStore.currentUser.surname} {uiStore.currentUser.name}</p>
            <p>{uiStore.currentUser.mail} </p>
            <p>{uiStore.currentUser.phone} </p>
            <p>{uiStore.currentUser.bio} </p>
            <p>Level: {uiStore.currentUser.level} </p>
            <p>Experience: {uiStore.currentUser.exp} </p>
            <img className={style.profileImage} alt='profile-pic' src={uiStore.currentUser.picture ? uiStore.currentUser.picture : './assets/profile/defaultProfileImage.png'} />

        </div>
  ));
};

export default Profile;