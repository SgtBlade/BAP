import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./personalFeed.module.css";
import { Link} from "react-router-dom";
//import Tag from "../../components/Tag/tag.js";
//import COLORS from "../globalStyles/colors";
//import ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/projectCard";
//mport ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
import { ROUTES } from "../../consts";
import TAGS from "../../consts/tags";
import Select from 'react-select';

const PersonalFeed = () => {
    const { uiStore, projectStore } = useStores();
    const [filterSort, setFilterSort] = useState('Aanbevolen');
    const [projects, setProjects] = useState(projectStore.projects);
    const [firstLoad, setFirstLoad] = useState(false);
  

    const filter = async ({sort = filterSort}) => {
        let projectstmp = projectStore.getProjects;
    
        switch (sort) {
            case 'Populair':
                console.log('aaaa');
                projectstmp = projectstmp.slice().sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1)
                break;

            case 'Aanbevolen':
                if(uiStore.currentUser)projectstmp = (projectstmp.slice().sort((a, b) => (a.tags.some(elem => uiStore.currentUser.interestedTags.includes(elem))) ? 1 : -1)).reverse()
                break;
            default:
                // if(uiStore.currentUser)projectstmp = (projectstmp.slice().sort((a, b) => (a.tags.some(elem => uiStore.currentUser.interestedTags.includes(elem))) ? 1 : -1)).reverse()

            break;       
        }

        setProjects([...projectstmp])
    }

    if(!firstLoad) {
        setFirstLoad(true);
        filter('Aanbevolen');
    }


    


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
                    <div className={style.feedContainer__filter__options__container}>
                        <p 
                        className={`${style.feedContainer__filter__options} ${filterSort === 'Aanbevolen' ? style.feedContainer__filter__options__active:""}`}
                        onClick={() => {
                            setFilterSort(filterSort !== 'Aanbevolen' ? 'Aanbevolen' : '');
                            filter({sort: (filterSort !== 'Aanbevolen' ? 'Aanbevolen' : '')});
                          }}
                          >Aanbevolen</p> 
                        <p 
                        className={`${style.feedContainer__filter__options} ${filterSort === 'Populair' ? style.feedContainer__filter__options__active:""}`}
                        onClick={() => {
                            setFilterSort(filterSort !== 'Populair' ? 'Populair' : '');
                            filter({sort: (filterSort !== 'Populair' ? 'Populair' : '')});
                          }}
                        >Populair</p> 
                    </div>
                    {/* <div className={style.feedContainer__filter__tags}>
                        <p className={style.tags__label}>Jouw tags</p>
                        <div className={style.tags__container}>
                            <span className={style.tag}></span>
                            <Select 
                            placeholder={'Kies een tag'}
                            isClearable={true}
                            className={style.tags__dropdown}
                            // className={`${style.dropdown} ${filterTag !== '' ? style.dropdownActive : ''}`}
                            // onChange={(e) => {filter({location: e ? e.value:  ''});setFilterLocation(e ? e.value:  ''); }}
                            //options={TAGS}
                            name={"tag"}
                            id={"tag"}/>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className={style.body__projects}>
                <div className={style.body__projects__container}>
                {projects.map((project, index) => {
                    if(!project.approved && project.ownerID !== uiStore.currentUser.id) return ''
                    else return <ProjectCard key={`Project_${index}`} project={project}/>
                })}
                </div>
                <button className={style.projects__more}>
                    Lees meer
                    <img src='/assets/icons/arrowDown.svg' className={style.projects__more__icon} alt="arrow down"/>
                </button>
                <Link className={style.projects__all} to={ROUTES.discovery}>Bekijk alle projecten</Link>
            </div>
        </div>
    </article>
  ));
};

export default PersonalFeed;
