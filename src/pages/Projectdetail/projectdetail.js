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

  const { projectStore } = useStores();

  //console.log(uiStore.currentUser);
  const tags = projectStore.currentProject.tags;
  console.log(tags);


  return useObserver(() => (
    <article className={style.projectDetail}>
      <div className={style.breadcrumb}>
        <p className={style.breadcrumb__content}><Link className={style.breadcrumb__content__link} to={ROUTES.discovery}>Projecten</Link> - {projectStore.currentProject.title}</p>
      </div>
      <div className={style.projectDetail__container}>
        <div className={style.projectDetail__head}>
          <div className={style.projectDetail__head__box}>
            <img className={style.projectDetail__head__image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
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
                {tags.map( tag => 
                    <p key={tag}  className={style.tag}>
                    <span  className={style.tag__color}></span>
                    {tag}
                  </p>
                )}
            </div>
          </div>
          <div className={style.projectDetail__head__box}>
            <h1 className={style.projectDetail__title}>{projectStore.currentProject.title}</h1>
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
          <div className={style.images__box}>
            <img className={style.image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
            <img className={style.image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
            <img className={style.image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
            <img className={style.image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
            <img className={style.image} src="./assets/project/placeholder2.png" alt="project afbeelding"/>
          </div>
        </div>
      </div>

      <div className={style.tabs}>
        <SimpleTabs description={projectStore.currentProjectDescription} project={projectStore.currentProject}/>
      </div>
      <div id="questions" className={style.questions}>
        <section className={style.questionsContainer}>
            <h2 className={style.questionsTitle}>Samenwerken</h2>
            <p className={style.questionsInleiding}>Naast financieële steun, kan je ook op andere manieren helpen.
            Geef ons jouw mening, of schrijf je in als vrijwilliger.
            </p>

            <div className={style.questionsContainer__box}>

              <article className={style.questionsContainer__yesno}>
                <h3 className={style.questionsSubtitle}>Geef je mening</h3>
                <div className={style.yesno__container}>
                  <p className={style.yesno__question}>
                    Heb jij ooit al eens aan 
                    crowdfunding gedaan?
                  </p>
                  <div className={style.yesno__answers}>
                    <button className={`${style.answerButtons} ${style.answerButtons__primary}`}>
                      <img className={`${style.answerButtons__icons} ${style.answerButtons__icons__like}`} src="./assets/icons/like.svg" alt="alt icon dislike"/>
                      JA
                    </button>
                    <button className={`${style.answerButtons} ${style.answerButtons__secondary}`}>
                      <img className={`${style.answerButtons__icons} ${style.answerButtons__icons__dislike}`} src="./assets/icons/dislike.svg" alt="alt icon dislike"/>
                      Nee
                    </button>
                  </div>
                </div>
              </article>

              <article className={style.questionsContainer__multipleChoice}>
                <h3 className={style.questionsSubtitle}>Wanneer past het best</h3>
                <p className={style.multipleChoice__question}>
                  Welke datum(s) verkies jij om samen te komen met mensen?
                </p>
                <form className={style.multipleChoice__form}>
                  <label className={style.form__select}>
                    <input className={style.form__select__input} type="checkbox" value="optie1"/>
                    <p className={style.form__select__content}>optie1</p>
                  </label> 
                  <label className={style.form__select}>
                    <input className={style.form__select__input} type="checkbox" value="optie1"/>
                    <p className={style.form__select__content}>optie1</p>
                  </label> 
                </form>
              </article>

              <article className={style.questionsContainer__volunteer}>
                <h3 className={style.questionsSubtitle}>Geef je op als vrijwilliger</h3>
                <p className={style.multipleChoice__question}>
                  Wij hebben vrijwilligers nodig als het project succesvol is, wil jij ons helpen?
                </p>
                
              </article>

              <article className={style.questionsContainer__discussion}>
                <h3 className={style.questionsSubtitle}>Doe mee aan onze discussies</h3>
                <p className={style.multipleChoice__question}>
                  Join ons microsoft teams kanaal om zo het project mee vorm te geven
                </p>
                <a href="https://google.be" className={style.questionsContainer__discussion__link}>
                  Doe mee aan de discussie (Discord) ►
                </a>
              </article>

            </div>
        </section>
      </div>
      <section className={style.reacties}>
          <h2 className={style.reactiesTitle}>Reacties</h2>
          <div className={style.reactiesContainer}>
            <div className={style.reactie}>
              <div className={style.reactiePerson}>
                <div className={style.reactiePerson__box}>
                  <img className={style.reactiePerson__image} src="./assets/profile/defaultProfileImage.png" alt="profiel afbeelding"/>
                  <div className={style.reactiePerson__information}>
                    <p className={style.information__name}>John Doe</p>
                    <p className={style.information__timepast}>2 uur geleden</p>
                  </div>
                  <p className={style.information__owner}>Projecteigenaar</p>
                  <p className={style.information__level}>Level 10</p>
                </div>
                <button className={style.reactiePerson__rapport}>
                  Rapporteer
                  <img className={style.reactiePerson__rapport__icon} src="./assets/icons/rapport.svg" alt="rapporteer"/>
                </button>
              </div>
              <p className={style.reactie__text}>Elke avond zorgden we voor live-entertainment van lokaal talent. Een vuurspuwer, operazanger of rapper. </p>
            </div>
          </div>
          <div className={style.extraQuestion}>
            <p className={style.extraQuestion__title}>Mag dit project verwezenlijkt worden?</p>
            <div className={style.extraQuestion__buttons}>
              <button className={`${style.votingButtons} ${style.votingButtons__primary}`}>
                <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__love}`} src="./assets/icons/love.svg" alt="icon like"/>
                JA
              </button>
              <button className={`${style.votingButtons} ${style.votingButtons__secondary}`}>
                <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__dislike}`} src="./assets/icons/dislike.svg" alt="alt icon dislike"/>
                Nee
              </button>
            </div>
          </div>
        </section>
    </article>
  ));
};

export default ProjectDetail;
