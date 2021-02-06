import React from "react";
//import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { ROUTES } from "../../consts";
import { Link } from "react-router-dom";
import SimpleTabs from './../../components/SimpleTabs/simpleTabs.js';
import style from "./projectdetail.module.css";
//import Tag from "../../components/Tag/tag.js";
//import COLORS from "../globalStyles/colors";

//import ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";
const ProjectDetail = () => {

  //console.log(uiStore.currentUser);

  return useObserver(() => (
    <article className={style.projectDetail}>
      <div className={style.breadcrumb}>
        <p><Link to={ROUTES.discovery}>Projecten</Link> - Vraagstraat</p>
      </div>
      <div className={style.projectDetail__container}>
        <div className={style.projectDetail__head}>
          <div className={style.projectDetail__head__box}>
            <img src="./assets/project/placeholder.svg" alt="project afbeelding"/>
            <div className={style.head__information}>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Projectfase</p>
                <p className={style.information__content}></p>
              </div>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Locatie</p>
                <p className={style.information__content}></p>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.tags}>
              <p className={style.tag}>
                <span className={style.tag__color}></span>
                Sociaal
              </p>
              <p className={style.tag}>
                <span className={style.tag__color}></span>
                Sociaal
              </p>
              <p className={style.tag}>
                <span className={style.tag__color}></span>
                Sociaal
              </p>
            </div>
          </div>
          <div className={style.projectDetail__head__box}>
            <h1 className={style.projectDetail__title}>Vraagstraat</h1>
            <div className={style.head__collaborators}>
              <span className={style.collaborators__others}>+3</span>
              <img src="./assets/profile/defaultProfileImage.png" className={style.profilePicture} alt="collaborateurs"/>
              <div style={style.profilePicture__hoofd__container}>
                <img src="./assets/profile/defaultProfileImage.png" className={style.profilePicture__hoofd} alt="collaborateurs"/>
                <span className={style.profilePicture__hoofd__level}>10</span>
              </div>
              <p className={style.collaborateurs}>John Doe</p>
            </div>
            <p className={style.description}>
              Zeg jij je buren vaak goeiendag? Verschil je veel van je directe buur? Zou je eens met je buren van huis willen ruilen? Deze en nog veel andere vragen stelden wij twee weken lang aan vijf Kortrijkse straten. 
            </p>
            <div className={style.shareContainer}>
              <a href="https://google.be"><img src="./assets/socials/facebook-small.svg" alt="facebook share"/></a>
              <a href="https://google.be"><img src="./assets/socials/twitter-small.svg" alt="twitter share"/></a>
              <a href="https://google.be"><img src="./assets/socials/share-small.svg" alt="share"/></a>
            </div>
            <p className={style.votingTitle}>Mag dit project uitgewerkt worden?</p>
            <div className={style.votingButtons__container}>
              <button>
                <img src="./assets/icons/love.svg" alt="icon like"/>
                Ja, ik stem op dit project
              </button>
              <button>
                <img src="./assets/icons/dislike.svg" alt="alt icon dislike"/>
                Nee
              </button>
            </div>
          </div>
        </div>
        <div className={style.images__container}>
          <img src="./assets/project/placeholder.svg" alt="project afbeelding"/>
          <img src="./assets/project/placeholder.svg" alt="project afbeelding"/>
          <img src="./assets/project/placeholder.svg" alt="project afbeelding"/>
          <img src="./assets/project/placeholder.svg" alt="project afbeelding"/>
        </div>
      </div>

      <SimpleTabs content="patatzo"/>
    </article>
  ));
};

export default ProjectDetail;
