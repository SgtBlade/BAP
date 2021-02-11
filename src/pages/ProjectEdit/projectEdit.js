import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import {useParams} from "react-router-dom";
//import { ROUTES } from "../../consts";
import style from "./projectEdit.module.css";
import { Select } from "@material-ui/core";
import ReactQuill from 'react-quill';

//import { useObserver } from "mobx-react-lite";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const ProjectEdit = () => {
    const { id } = useParams();
    const {projectStore, uiStore} = useStores();
    const [project, setProject] = useState(projectStore.currentProject ? projectStore.currentProject.id === id ? projectStore.currentProject : undefined : undefined)
    
    //The booleans to know if we need to show the "form" to add the things the user want
    // const [allowYesNo, setAllowYesNo] = useState(projectData.questions ? projectData.questions.length > 0 ? true: false : false);
    // const [allowMultipleChoice, setAllowMultipleChoice] = useState(projectData.multipleChoice ? projectData.multipleChoice.length > 0 ? true: false : false);
    // const [allowRequirements, setAllowRequirements] = useState(projectData.requirements ? projectData.requirements.length > 0 ? true: false : false);
    // const [allowDiscussion, setAllowDiscussion] = useState(projectData.discussions ? projectData.discussions.length > 0 ? true: false : false);

    //The actual data variables
    // const [questions, setQuestions] = useState(projectData.questions ?? [])
    // const [multipleChoice, setMultiplechoice] = useState(projectData.multipleChoice ?? [])
    // const [requirements, setRequirements] = useState(projectData.requirements ?? [])
    // const [discussions, setDiscussions] = useState(projectData.discussions ?? [])

    const getProject = async () => {
        if(projectStore.initialized){
            const proj = await projectStore.getProjectById(id);
            if(proj === undefined){setProject(false)}
            else if(proj.approved === false) {
                if(uiStore.currentUser)
                    if(uiStore.currentUser.id === proj.ownerID)setProject(proj)
                    else setProject(false)
                else setProject(false)
            }else setProject(proj)}
        else setTimeout(() => {console.log('test'); getProject()}, 1000)
    }
    if(project === undefined)getProject();



    return (
        <section className={style.edit}>
            <h1 className={style.hidden}>Bewerken van Project</h1>
            
            <div className={style.editContainer}>
                <article className={style.editContainer__algemeen}>
                    <h2 className={style.editContainer__sectionTitle}>Algemene informatie</h2>
                    <p className={style.project__title}>Jouw super coole projectnaam</p>
                    <input type='text' className={style.project__title__input} placeholder="Projectnaam" value=""/>
                    <div className={style.editContainer__algemeen__container}>
                        <div className={style.editContainer__algemeen__box}>
                            <p className={style.project__subtitle}>Het budget</p>
                            <input type='text' className={style.project__subtitle__input} placeholder="1500" value=""/>
                        </div>
                        <div className={style.editContainer__algemeen__box}>
                            <p className={style.project__subtitle}>De tags</p>
                            <div className={style.editContainer__algemeen__tags}>
                                <div className={style.editContainer__algemeen__tags__container}>
                                    <p className={style.editContainer__algemeen__tag}>
                                        <span className={style.editContainer__algemeen__tag__color}></span>
                                        Natuur
                                        <span className={style.editContainer__algemeen__tag__delete}>x</span>
                                    </p>
                                    <p className={style.editContainer__algemeen__tag}>
                                        <span className={style.editContainer__algemeen__tag__color}></span>
                                        Natuur
                                        <span className={style.editContainer__algemeen__tag__delete}>x</span>
                                    </p>
                                    <p className={style.editContainer__algemeen__tag}>
                                        <span className={style.editContainer__algemeen__tag__color}></span>
                                        Natuur
                                        <span className={style.editContainer__algemeen__tag__delete}>x</span>
                                    </p>
                                    <p className={style.editContainer__algemeen__tag}>
                                        <span className={style.editContainer__algemeen__tag__color}></span>
                                        Natuur
                                        <span className={style.editContainer__algemeen__tag__delete}>x</span>
                                    </p>
                                    <p className={style.editContainer__algemeen__tag}>
                                        <span className={style.editContainer__algemeen__tag__color}></span>
                                        Natuur
                                        <span className={style.editContainer__algemeen__tag__delete}>x</span>
                                    </p>
                                </div>
                                <Select 
                                placeholder={'Kies een tag'}
                                isClearable={true}
                                className={style.tags__dropdown}
                                // className={`${style.dropdown} ${filterTag !== '' ? style.dropdownActive : ''}`}
                                // onChange={(e) => {filter({location: e ? e.value:  ''});setFilterLocation(e ? e.value:  ''); }}
                                //options={TAGS}
                                name=""
                                id={"tag"}/>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={style.editContainer__collaborateurs}>
                    <div className={style.editContainer__collaborateurs__container}>
                        <h2 className={style.editContainer__sectionTitle}>Collaborateurs & Ligging</h2>
                        <div className={style.editContainer__collaborateurs__container}>

                            {/* Als jij zelf de eigenaar bent */}
                            <div className={style.collaborateurs__box}>
                                <p className={style.project__subtitle}>Jij bent de eigenaar van dit project</p>
                            </div>

                            {/* Als groepsnaam er is */}
                            <div className={style.collaborateurs__box}>
                                <p className={style.project__subtitle}>Dit is de opgegeven groepsnaam:</p>
                                <input type="text" className={style.collaborateurs__groupname} placeholder="Groepsnaam"/>
                            </div>

                            {/* Als er gekozen is voor collaborateurs */}
                            <div className={style.collaborateurs__box}>
                                <p className={style.project__subtitle}>Deze mensen werken er aan mee:</p>
                                <div className={style.collaborateurs__collaborateur}>
                                    <p className={style.collaborateurs__email}>aardappel@provider.be</p>
                                    <button className={style.collaborateurs__delete}>Verwijder</button>
                                </div>
                                <input type="text" className={style.collaborateurs__groupname} placeholder="+ Voeg persoon toe"/>
                            </div>
                        </div>

                    </div>
                </article>

                <article className={style.editContainer__content}>
                    <h2 className={style.editContainer__sectionTitle}>Project inhoud</h2>
                    <div className={style.content__ligging}>
                        <p className={style.project__subtitle}>Hier is je project gevestigd:</p>
                        <Select 
                        placeholder={'Kies een tag'}
                        isClearable={true}
                        className={style.ligging__dropdown}
                        // className={`${style.dropdown} ${filterTag !== '' ? style.dropdownActive : ''}`}
                        // onChange={(e) => {filter({location: e ? e.value:  ''});setFilterLocation(e ? e.value:  ''); }}
                        //options={TAGS}
                        name=''
                        id={"tag"}/>
                    </div>

                    <div className={style.content__images}>
                        <p className={style.project__subtitle}>Deze afbeeldingen hebben wij over je project</p>
                        <div className={style.content__images__container}>
                            <div className={style.content__image__box}>
                                <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                                <span className={style.content__image__box__delete}>x</span>
                            </div>
                            <div className={style.content__image__box}>
                                <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                                <span className={style.content__image__box__delete}>x</span>
                            </div>
                            <div className={style.content__image__box}>
                                <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                                <span className={style.content__image__box__delete}>x</span>
                            </div>
                                <div className={style.content__image__box}>
                                <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                                <span className={style.content__image__box__delete}>x</span>
                            </div>
                            <div className={style.content__image__box}>
                                <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                                <span className={style.content__image__box__delete}>x</span>
                            </div>
                        </div>
                        <p className={style.content__images__add}>+ Voeg een afbeelding toe</p>
                    </div>
                    <div className={style.content__shortBio}>
                        <p className={style.project__subtitle}>Dit is de korte omschrijving van je project</p>
                        <input type="text" className={style.shortBio__text} placeholder="Korte omschrijving van je project" value=""/>
                    </div>

                    <div className={style.content__shortBio}>
                        <p className={style.project__subtitle}>Dit is de lange omschrijving van je project</p>
                        <ReactQuill 
                            readOnly={true}
                            modules={{ "toolbar": true }}
                            //value={project.description}
                            style={{border:"1rem solid transparent", overflow:"hidden", marginTop: '2rem', marginBottom: '6rem'}}
                        />
                    </div>

                    <div className={style.content__shortBio}>
                        <p className={style.project__subtitle}>Zo zullen de mensen je leren kennen</p>
                        <input type="text" className={style.shortBio__text} placeholder="Informatie over jezelf / je groep / je organisatie" value=""/>
                    </div>

                </article>

                <article className={style.editContainer__questionsForOthers}>
                    <div className={style.editContainer__questionsForOthers__container}>
                        <h2 className={style.editContainer__sectionTitle}>Dit zijn jouw vragen naar de bezoekers toe</h2>
                        
                        <div className={style.questionsForOthers__question}>
                            <p className={style.questionsForOthers__question__type}>Ja-Nee vraag</p>
                            <div className={style.questionsForOthers__question__container}>
                                <p className={`${style.project__subtitle} ${style.project__subtitle__question}`}>Dit is de vraag</p>
                                <button className={style.collaborateurs__delete}>Verwijder</button>
                            </div>
                        </div>

                        <div className={style.questionsForOthers__question}>
                            <p className={style.questionsForOthers__question__type}>Meerkeuzevraag</p>
                            <div className={style.questionsForOthers__question__container}>
                                <p className={`${style.project__subtitle} ${style.project__subtitle__question}`}>Dit is de vraag</p>
                                <button className={style.collaborateurs__delete}>Verwijder</button>
                            </div>
                            <ul className={style.questionsForOthers__question__options}>
                                <li className={style.questionsForOthers__question__option}>
                                    Optie1
                                    <button className={`${style.collaborateurs__delete} ${style.collaborateurs__delete__spacingLeft}`}>x</button>
                                </li>
                                <li className={style.questionsForOthers__question__option}>
                                    Optie1
                                    <button className={`${style.collaborateurs__delete} ${style.collaborateurs__delete__spacingLeft}`}>x</button>
                                </li>
                                <li className={style.questionsForOthers__question__option}>
                                    Optie1
                                    <button className={`${style.collaborateurs__delete} ${style.collaborateurs__delete__spacingLeft}`}>x</button>
                                </li>
                            </ul>
                        </div>

                        <div className={style.questionsForOthers__question}>
                            <span className={style.questionsForOthers__question__type}>Vrijwilligers en materialen</span>
                            <div className={style.questionsForOthers__question__container}>
                                <p className={style.questionsForOthers__question__label__total}>
                                    Hoeveel?
                                </p>
                                <p className={style.questionsForOthers__question__label__what}>
                                    Voor wat?
                                </p>
                            </div>

                            <div className={style.questionsForOthers__question__container}>
                                <p className={style.questionsForOthers__question__platform__number} value="discord">3x</p>
                                <p className={style.questionsForOthers__question__platform__description} value="discord">Aardappel schillen</p>
                                <button className={style.collaborateurs__delete}>x</button>
                            </div>
                        </div>

                        <div className={style.questionsForOthers__question}>
                            <span className={style.questionsForOthers__question__type}>Discussiemogelijkheden</span>
                            <div className={style.questionsForOthers__question__container}>
                                <p className={style.questionsForOthers__question__label__platform}>
                                    Naam plaftform
                                </p>
                                <p className={style.questionsForOthers__question__label__platform__url}>
                                    Link (URL)
                                </p>
                            </div>
                            <div className={style.questionsForOthers__question__container}>
                                <input className={style.questionsForOthers__question__platform__input} placeholder="Platformnaam" value="" />
                                <input className={style.questionsForOthers__question__platform__url} placeholder="Platform link (vb: https://google.be" value=""/>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={style.editContainer__options}>
                <h2 className={style.editContainer__sectionTitle}>De extra opties die we jou vraagden</h2>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Is er een deadline voor het project?</p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Kunnen de mensen vragen stellen op je pagina</p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Mogen mensen reacties achterlaten op je project? </p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options__button} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                </article>

                <div className={style.editContainer__buttons}>
                    <button className={style.buttons__annuleren}>Annuleer</button>
                    <button className={style.buttons__save}>Sla wijzigingen op</button>
                </div>
            </div>
        </section>
    )
};

export default ProjectEdit;
