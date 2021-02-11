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
                    <input type='text' className={style.project__title__input} value="aaaa"/>
                    <div className={style.editContainer__algemeen__container}>
                        <div className={style.editContainer__algemeen__box}>
                            <p className={style.project__subtitle}>Het budget</p>
                            <input type='text' className={style.project__subtitle__input} value="aaaa"/>
                        </div>
                        <div className={style.editContainer__algemeen__box}>
                            <p className={style.project__subtitle}>De tags</p>
                            <div className={style.editContainer__algemeen__tags}>
                                <p className={style.editContainer__algemeen__tag}>
                                    <span className={style.editContainer__algemeen__tag__color}></span>
                                    Natuur
                                    <span className={style.editContainer__algemeen__tag__delete}></span>
                                </p>
                                <p className={style.editContainer__algemeen__tag}>
                                    <span className={style.editContainer__algemeen__tag__color}></span>
                                    Natuur
                                    <span className={style.editContainer__algemeen__tag__delete}></span>
                                </p>
                                <p className={style.editContainer__algemeen__tag}>
                                    <span className={style.editContainer__algemeen__tag__color}></span>
                                    Natuur
                                    <span className={style.editContainer__algemeen__tag__delete}></span>
                                </p>
                                <p className={style.editContainer__algemeen__tag}>
                                    <span className={style.editContainer__algemeen__tag__color}></span>
                                    Natuur
                                    <span className={style.editContainer__algemeen__tag__delete}></span>
                                </p>
                                <p className={style.editContainer__algemeen__tag}>
                                    <span className={style.editContainer__algemeen__tag__color}></span>
                                    Natuur
                                    <span className={style.editContainer__algemeen__tag__delete}></span>
                                </p>
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
                        </div>
                    </div>
                </article>

                <article className={style.editContainer__collaborateurs}>
                    <div className={style.editContainer__collaborateurs__container}>
                        <h2 className={style.editContainer__sectionTitle}>Collaborateurs & Ligging</h2>
                        <div className={style.editContainer__collaborateurs__container}>
                            {/* Als groepsnaam er is */}
                            <div className={style.collaborateurs__box}>
                                <input type="text" className={style.collaborateurs__email} value="Groepsnaam"/>
                            </div>

                            {/* Als er gekozen is voor collaborateurs */}
                            <div className={style.collaborateurs__box}>
                                <p className={style.collaborateurs__email}>aardappel@provider.be</p>
                                <button className={style.collaborateurs__delete}>x</button>
                            </div>
                        </div>

                    </div>
                </article>

                <article className={style.editContainer__content}>
                    <h2 className={style.editContainer__sectionTitle}>Project inhoud</h2>
                    <div className={style.content__ligging}>
                        <p className={style.ligging__title}>Hier is je project gevestigd:</p>
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

                    <div className={style.content__images}>
                        <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                        <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                        <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                        <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                        <img src='/assets/project/placeholder2.png' className={style.content__image} alt="project afbeelding"/>
                    </div>
                    <div className={style.content__shortBio}>
                        <p className={style.shortBio__title}>Dit is de korte omschrijving van je project</p>
                        <input type="text" className={style.shortBio__text} value={'aaaaaaaa'}/>
                    </div>

                    <div className={style.content__shortBio}>
                        <p className={style.shortBio__title}>Dit is de korte omschrijving van je project</p>
                        <ReactQuill 
                            readOnly={true}
                            modules={{ "toolbar": true }}
                            //value={project.description}
                            style={{border:"1rem solid transparent", overflow:"hidden", marginTop: '2rem', marginBottom: '6rem'}}
                        />
                    </div>

                    <div className={style.content__shortBio}>
                        <p className={style.shortBio__title}>Zo zullen de mensen je leren kennen:</p>
                        <input type="text" className={style.shortBio__text} value={'aaaaaaaa'}/>
                    </div>

                </article>

                <article className={style.editContainer__questionsForOthers}>
                    <h2 className={style.editContainer__sectionTitle}>Dit zijn jouw vragen naar de bezoekers toe</h2>
                    <div className={style.questionsForOthers__question}>
                        <span className={style.questionsForOthers__question__type}>Ja-Nee vraag</span>
                        <input className={style.questionsForOthers__question__input} value="aaaaa"/>
                    </div>
                    <div className={style.questionsForOthers__question}>
                        <span className={style.questionsForOthers__question__type}>Meerkeuzevraag</span>
                        <input className={style.questionsForOthers__question__input} value="aaaaa"/>
                    </div>
                    <div className={style.questionsForOthers__question}>
                        <span className={style.questionsForOthers__question__type}>Vrijwilligers en materialen</span>

                        <div classNames={style.questionsForOthers__question__container}>
                            <label className={style.questionsForOthers__question__total}>
                                Hoeveel?
                                <input className={style.questionsForOthers__question__platform__number} value="discord" />
                            </label>
                            <label className={style.questionsForOthers__question__description}>
                                Voor wat?
                                <input className={style.questionsForOthers__question__platform__descrption} value="https://google.be"/>
                            </label>
                        </div>
                    </div>
                    <div className={style.questionsForOthers__question}>
                        <span className={style.questionsForOthers__question__type}>Discussiemogelijkheden</span>
                        <div classNames={style.questionsForOthers__question__container}>
                            <label className={style.questionsForOthers__question__platform}>
                                Naam plaftform
                                <input className={style.questionsForOthers__question__platform} value="discord" />
                            </label>
                            <label className={style.questionsForOthers__question__platform}>
                                Link (URL)
                                <input className={style.questionsForOthers__question__platform__url} value="https://google.be"/>
                            </label>
                        </div>
                    </div>
                </article>

                <article className={style.editContainer__options}>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Is er een deadline voor het project?</p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Kunnen de mensen vragen stellen op je pagina</p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                    <div className={style.editContainer__options__container}>
                        <p className={style.editContainer__options__questions}>Mogen mensen reacties achterlaten op je project? </p>
                        <div className={style.editContainer__options__answers}>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__positive} ${style.editContainer__options__active}`}>
                                Ja
                            </button>
                            <button className={`${style.editContainer__options} ${style.editContainer__options__negative}`}>
                                Nee
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
};

export default ProjectEdit;
