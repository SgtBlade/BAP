import React from "react";
import { useStores } from "../../hooks/useStores";
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


  const { projectStore } = useStores();

  return useObserver(() => (
    <article className={style.projectDetail}>
      <div className={style.breadcrumb}>
        <p className={style.breadcrumb__content}><Link className={style.breadcrumb__content__link} to={ROUTES.discovery}>Projecten</Link> - {projectStore.currentProject.title}</p>
      </div>
      <div className={style.projectDetail__container}>
        <div className={style.projectDetail__head}>
          <div className={style.projectDetail__head__box}>
            <img className={style.projectDetail__head__image} src="./assets/project/placeholder.svg" alt="project afbeelding"/>
            <div className={style.head__information}>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Projectfase</p>

                {projectStore.currentProject.isFundingStage ? 
                  <p className={style.information__content}>
                  <img className={style.information__content__icon} src="./assets/icons/money.svg" alt="icon"/>
                  Geld inzamelen
                  </p>
                  :
                  <p className={style.information__content}>
                    <img className={style.information__content__icon} src="./assets/icons/thumbs-up-black.svg" alt="icon"/>
                    Stemmen verzamelen
                  </p>
                }
                
              </div>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Locatie</p>
                <p className={style.information__content}>
                  <img className={style.information__content__icon} src="./assets/icons/maps.svg" alt="icon"/>
                  {projectStore.currentProject.location}
                </p>
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
              <div>
              <img src="./assets/profile/defaultProfileImage.png" className={style.profilePicture} alt="collaborateurs"/>
              </div>
              <div className={`${style.profilePicture__hoofd__container}`}>
                <img src="./assets/profile/defaultProfileImage.png" className={style.profilePicture__hoofd} alt="collaborateurs"/>
                <span className={style.profilePicture__hoofd__level}>10</span>
              </div>
              <p className={style.collaborateurs}>John Doe</p>
            </div>

            {/*RECEIVED MONEY PROGRESS*/
              projectStore.currentProject.isFundingStage ? 
                <div className={style.receivedMoney__container}>
                <p className={style.receivedMoney__text}><span className={style.receivedMoney__text__big}>€ {projectStore.currentProject.collectedMoney}</span> van de € {projectStore.currentProject.budget} ingezameld</p>
                <progress className={style.receivedMoney__progressBar} value={projectStore.currentProject.collectedMoney} max={projectStore.currentProject.budget}/>
              </div>
              :
              ""
            }


            <p className={style.description}>
              Zeg jij je buren vaak goeiendag? Verschil je veel van je directe buur? Zou je eens met je buren van huis willen ruilen? Deze en nog veel andere vragen stelden wij twee weken lang aan vijf Kortrijkse straten. 
            </p>
            <div className={style.shareContainer}>
              <a className={style.shareContainer__link} href="https://google.be"><img src="./assets/socials/facebook-small.svg" alt="facebook share"/></a>
              <a className={style.shareContainer__link} href="https://google.be"><img src="./assets/socials/twitter-small.svg" alt="twitter share"/></a>
              <a className={style.shareContainer__link} href="https://google.be"><img src="./assets/socials/share-small.svg" alt="share"/></a>
            </div>

            {projectStore.currentProject.isFundingStage ? 
              <div>
                <div className={style.votingButtons__container}>
                  <button className={`${style.votingButtons} ${style.fundingButtons__primary}`}>
                    Steun dit project
                  </button>
                  <a href="#questions" className={`${style.votingButtons} ${style.fundingButtons__secondary}`}>
                    Meld aan als vrijwilliger
                  </a>
                </div>
              </div>
              :
              <div>
                <p className={style.votingTitle}>Mag dit project uitgewerkt worden?</p>
                <div className={style.votingButtons__container}>
                  <button className={`${style.votingButtons} ${style.votingButtons__primary}`}>
                    <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__love}`} src="./assets/icons/love.svg" alt="icon like"/>
                    Ja, ik stem op dit project
                  </button>
                  <button className={`${style.votingButtons} ${style.votingButtons__secondary}`}>
                    <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__dislike}`} src="./assets/icons/dislike.svg" alt="alt icon dislike"/>
                    Nee
                  </button>
                </div>
              </div>
            }

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
