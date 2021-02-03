import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./profile.module.css";
import Tag from "../../components/Tag/tag.js";
import COLORS from "../globalStyles/colors";
import ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";

const Profile = () => {
  const { uiStore, projectStore } = useStores();

  console.log(uiStore.currentUser);
  console.log(projectStore.projects);

  return useObserver(() => (
    <article className={style.profile}>
      <h1 className={`${style.profileName} ${style.hidden}`}>
        {uiStore.currentUser.surname} {uiStore.currentUser.name}
      </h1>
      <div className={style.profileHeader}>
        <div className={style.profileData}>
          <p className={style.profileName}>
            {uiStore.currentUser.surname} {uiStore.currentUser.name}
          </p>
          <p>{uiStore.currentUser.bio} </p>
          <span className={style.profileGreenBalk}></span>
          <p className={style.profileEdit}>
            <img src="assets/icons/edit.png" alt="edit" />
          </p>
          <div className={style.profileVisual}>
            {/* <span className={style.profileLevel}>{uiStore.currentUser.exp}</span> */}
            <span className={style.profileLevel}>
              {uiStore.currentUser.level}
            </span>
            <img
              className={style.profileImage}
              alt="profile-pic"
              src={
                uiStore.currentUser.picture
                  ? uiStore.currentUser.picture
                  : "./assets/profile/defaultProfileImage.png"
              }
            />
          </div>
        </div>

        <section className={style.profileTags}>
          <h2 className={style.profileTagsTitle}>
            Geïnteresseerd in{" "}
            <span className={style.profile__total}>
              {uiStore.currentUser.interestedTags.length}
            </span>
          </h2>
          <div className={style.tags}>
            <Tag
              text="lorem"
              color={COLORS.durfGreen}
              margin="0 2.5rem 2.5rem 0"
            />
            <Tag
              text="lorem"
              color={COLORS.durfGreen}
              margin="0 2.5rem 2.5rem 0"
            />
            <Tag
              text="lorem"
              color={COLORS.durfGreen}
              margin="0 2.5rem 2.5rem 0"
            />
            <Tag
              text="lorem"
              color={COLORS.durfGreen}
              margin="0 2.5rem 2.5rem 0"
            />
            <Tag
              text="lorem"
              color={COLORS.durfGreen}
              margin="0 2.5rem 2.5rem 0"
            />
          </div>
        </section>
      </div>

      <section className={style.badges}>
        <div className={style.badgesContainer}>
          <h2 className={style.profileBadgesTitle}>
            Badges
            <span className={style.profile__total}>
              {uiStore.currentUser.unlockedBadges.length}
            </span>
          </h2>
        </div>
        <div className={style.badgesSliderContainer}>
          <div className={style.badgesSlider}>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>

            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
            <div>
              <img
                className={style.badgeImage}
                src="./assets/badges/eersteFunding.svg"
                alt="badge"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={style.profileProjects}>
        <div className={style.profileProjectsContainer}>
          <h2 className={style.profileProjectsTitle}>
            Projecten
            <span className={style.profile__total}>
              {uiStore.currentUser.unlockedBadges.length}
            </span>
          </h2>
        </div>
        <div className={style.profileProjects__container}>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='voting'/>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='funding'/>
          <ProjectPreview type='funding'/>
        </div>
      </section>
    </article>
  ));
};

export default Profile;
