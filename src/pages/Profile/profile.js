import React, { useState } from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import style from "./profile.module.css";
import Tag from "../../components/Tag/tag.js";
import { ROUTES } from "../../consts";
import ProjectCard from "../../components/ProjectCard/projectCard";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const { uiStore, projectStore } = useStores();

  const fetchUser = async () => {
      let usr = await uiStore.getUserById(id);
      if(usr === undefined)setUser('NOT FOUND')
      else setUser(usr)
      setLoading(false)
  }

  if(user === undefined){document.querySelector("#root").scrollTop = 0;fetchUser();}
  

  return useObserver(() => (
    user === 'NOT FOUND' || loading ?
      loading ?

      <div className={style.loadingScreen}>
        <p>Even geduld, we zijn op zoek naar deze gebruiker</p>
        <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
      </div>
      :
      <div className={style.notFoundWrap}>
        <p className={style.notFound__title}>We hebben deze gebruiker niet kunnen vinden</p>
          <div className={style.notFound__urlWrap}>
            <Link className={style.notFound__url} to={`${ROUTES.home}`}>Naar home</Link>
            <Link className={style.notFound__url} to={`${ROUTES.discovery}`}>Naar projecten</Link>
          </div>
      </div>
      :
      <article className={style.profile}>
      <h1 className={`${style.profileName} ${style.hidden}`}>
        {user.surname} {user.name}
      </h1>
      <div className={style.profileHeader}>
        <div className={style.profileData}>
          <p className={style.profileName}>
            {user.surname} {user.name}
          </p>
          <p>{user.bio} </p>
          <span className={style.profileGreenBalk}></span>
          {uiStore.currentUser ? 
            uiStore.currentUser.id === user.id ?
            <p className={style.profileEdit}> <img src="/assets/icons/edit.png" alt="edit" /> bewerken </p>
          :'':''}
          

          <div className={style.profileVisual}>
            {/* <span className={style.profileLevel}>{user.exp}</span> */}
            <span className={style.profileLevel}>
              {user.level}
            </span>
            <img
              className={style.profileImage}
              alt="profile-pic"
              src={
                user.picture
                  ? user.picture
                  : "/assets/profile/defaultProfileImage.png"
              }
            />
          </div>
        </div>

        <section className={style.profileTags}>
          <h2 className={style.profileTagsTitle}>
            Geïnteresseerd in{" "}
            <span className={style.profile__total}>
              {user.interestedTags.length}
            </span>
          </h2>
          <div className={style.tags}>
            {user.interestedTags.map((tag, index) => {
              return (<Tag key={`tag${index}`} text={tag} margin="0 2.5rem 2.5rem 0" />)
            })}
          </div>
        </section>
      </div>

      <section className={style.badges}>
        <div className={style.badgesContainer}>
          <h2 className={style.profileBadgesTitle}>
            Badges
            <span className={style.profile__total}>
              {user.unlockedBadges.length}
            </span>
          </h2>
        </div>
        <div className={style.badgesSliderContainer}>
          <div className={style.badgesSlider}>
            
              {user.unlockedBadges.map((badge, index) => {
                return <div key={`badgeNr_${index}`}> <img className={style.badgeImage} src={`/assets/badges/${badge}`} alt="badge" /> </div>
              })}
              
            
          </div>
        </div>
      </section>

      <section className={style.profileProjects}>
        <div className={style.profileProjectsContainer}>
          <h2 className={style.profileProjectsTitle}>
            Projecten
            <span className={style.profile__total}>
              {uiStore.currentUser.id === user.id ? 
              projectStore.projects.filter(proj => proj.ownerID === user.id).length
              :
              projectStore.projects.filter(proj => proj.ownerID === user.id && proj.approved === true).length
              }
            </span>
          </h2>
        </div>
        <div className={style.profileProjects__container}>
         {projectStore.projects.filter(proj => proj.ownerID === user.id).map((project, index) => {
           if(!project.approved && project.ownerID !== uiStore.currentUser.id) return ''
           else return <ProjectCard key={`Project_${index}`} project={project}/>
         })}
        </div>
      </section>
    </article>
  ));
};

export default Profile;
