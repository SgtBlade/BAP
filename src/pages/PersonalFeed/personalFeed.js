import React from "react";
//import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./personalFeed.module.css";
import { Link} from "react-router-dom";
//import Tag from "../../components/Tag/tag.js";
//import COLORS from "../globalStyles/colors";
//import ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";

const PersonalFeed = () => {
  //const { uiStore, /*projectStore*/ } = useStores();


  return useObserver(() => (
    <article className={style.feed}>
      <h1 className={`${style.profileName} ${style.hidden}`}>
        Project feed
      </h1>
        <section className={style.feedContainer}>
            <div className={style.feedContainer__head}>
                <div className={style.feedContainer__head__image__container}>
                    <img className={style.feedContainer__head__image} src="/assets/project/placeholder2.png" alt="project"/>
                </div>
                <div className={style.feedContainer__head__box}>
                    <h2 className={style.head__uitgelicht}>Uitgelicht door DURF2030</h2>
                    <p className={style.head__title}>Vraagstraat</p>
                    <p className={style.head__type}>Stemmen</p>
                    <p className={style.head__description}>Zeg jij je buren vaak goeiendag? Verschil je veel van je directe buur? Zou je eens met je buren van huis willen ruilen?</p>
                    <div className={style.head__tags}>
                        <p className={style.head__tag}><span className={style.head__tag__color}></span>Sociaal</p>
                        <p className={style.head__tag}><span className={style.head__tag__color}></span>Sociaal</p>
                        <p className={style.head__tag}><span className={style.head__tag__color}></span>Sociaal</p>
                    </div>
                    <Link className={style.head__button} to="/">Bekijk vraagstraat</Link>
                </div>
                <div className={style.head__projectSwitch}>
                    <button className={style.head__projectSwitch__button}>
                        <img className={style.head__projectSwitch__button__image} src="/assets/icons/arrowSwitch.svg" alt="icons arrow"/>
                    </button>
                    <button className={style.head__projectSwitch__button}>
                        <img className={`${style.head__projectSwitch__button__image} ${style.head__projectSwitch__button__image__flip}`} src="/assets/icons/arrowSwitch.svg" alt="icons arrow"/>
                    </button>
                </div>
            </div>
            
        </section>
        <div className={style.feedContainer__body}>
                <div className={style.feedContainer__filter__container}>
                    <div className={style.feedContainer__filter__box}>
                        <p>dit is aaaaaa</p> 
                    </div>
                </div>
            </div>
    </article>
  ));
};

export default PersonalFeed;
