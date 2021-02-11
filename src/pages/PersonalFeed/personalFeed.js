import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./personalFeed.module.css";
import { Link} from "react-router-dom";
import tagStyle from '../globalStyles/main.module.css'
import ProjectCard from "../../components/ProjectCard/projectCard";
import { ROUTES } from "../../consts";

const PersonalFeed = () => {
    const { uiStore, projectStore } = useStores();
    const [filterSort, setFilterSort] = useState('Aanbevolen');
    const [projects, setProjects] = useState(undefined)
    const [spotlightProjects, setSpotlightProjects] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [activeSpotlight, setActiveSpotlight] = useState(0)
    const [firstLoad, setFirstLoad] = useState(false);
  
    const getProject = async () => {
        if(projectStore.initialized){setProjects(projectStore.projects); getSpotlightProjects()}
        else setTimeout(() => {console.log('retrying to fetch the project'); getProject()}, 1200)
    }

    const getSpotlightProjects = () => {
        let projectsTmp = projectStore.getApprovedProjects(projectStore.projects)
        if(projectsTmp.length === 0) setSpotlightProjects(false)
        else {
            let featuredProjects = projectStore.getFeaturedProjects(projectsTmp);
            if(featuredProjects.length > 0) setSpotlightProjects(featuredProjects)
            else setSpotlightProjects(projectsTmp)
        }
        setLoading(false)

    }

  if(projects === undefined)getProject()

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

            {spotlightProjects ?
                <>
                <div className={style.feedContainer__head__image__container}>
                    <img height={268} width={478} className={style.feedContainer__head__image} src={spotlightProjects[activeSpotlight].pictures[0] ? spotlightProjects[activeSpotlight].pictures[0].url : 'https://bap-eight.vercel.app/assets/project/cardPlaceholderLarge.jpg'} alt="project"/>
                </div>
                    <div className={style.feedContainer__head__box}>
                        <h2 className={style.head__uitgelicht}>Uitgelicht door DURF2030</h2>
                        <p className={style.head__title}>{spotlightProjects[activeSpotlight].title}</p>
                       {/*<p className={style.head__type}>Stemmen</p>*/}
                        <p className={style.head__description}>Zeg jij je buren vaak goeiendag? Verschil je veel van je directe buur? Zou je eens met je buren van huis willen ruilen?</p>
                        <div className={style.head__tags}>
                            {spotlightProjects[activeSpotlight].tags.map((tag, index) => {
                                return <p key={`tag_${index}`} className={style.head__tag}><span className={`${style.head__tag__color} ${tagStyle[tag.replace('/', '').replace('+', '')]}`}></span>{tag}</p>
                            })}
                        </div>
                        <Link className={style.head__button} to={`${ROUTES.projectDetail.to}${spotlightProjects[activeSpotlight].id}`}>Bekijk {spotlightProjects[activeSpotlight].title}</Link>
                    </div>
                </>
                :
                loading ?
                    <div className={style.loadingScreen}>
                        <p>Even geduld, we halen even de projecten erbij.</p>
                        <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
                    </div>
                :
                    <div className={style.noProjects}>
                        <p>Er zijn momenteel geen projecten</p>
                    </div>
                }

                <div className={style.head__projectSwitch}>
                    <button onClick={() => { setActiveSpotlight(activeSpotlight-1 < 0 ? spotlightProjects.length-1 : activeSpotlight-1) }} className={style.head__projectSwitch__button}>
                        <img className={style.head__projectSwitch__button__image} src="/assets/icons/arrowSwitch.svg" alt="icons arrow"/>
                    </button>
                    <button onClick={() => { setActiveSpotlight(activeSpotlight+1 > spotlightProjects.length-1 ? 0 : activeSpotlight+1) }}  className={style.head__projectSwitch__button}>
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
                {loading ?
                <div className={style.loadingScreen}>
                    <p>Even geduld, we halen even de projecten erbij.</p>
                    <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
                </div>
                :
                projects.map((project, index) => {
                    if(!project.approved && project.ownerID !== uiStore.currentUser.id) return ''
                    else return <ProjectCard key={`Project_${index}`} project={project}/>
                })
                }
                
                </div>
                    {/*
                    <button className={style.projects__more}>
                        Lees meer
                        <img src='/assets/icons/arrowDown.svg' className={style.projects__more__icon} alt="arrow down"/>
                    </button>
                    */}
                <Link className={style.projects__all} to={ROUTES.discovery}>Bekijk alle projecten</Link>
            </div>
        </div>
    </article>
  ));
};

export default PersonalFeed;
