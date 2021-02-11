import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import {useParams} from "react-router-dom";
//import { ROUTES } from "../../consts";
import style from "./projectEdit.module.css";
//import { useObserver } from "mobx-react-lite";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";


const ProjectEdit = () => {
    const { id } = useParams();
    const {projectStore, uiStore} = useStores();
    const [project, setProject] = useState(projectStore.currentProject ? projectStore.currentProject.id === id ? projectStore.currentProject : undefined : undefined)

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

    console.log(project);


    return (
        <article className={style.edit}>
            <h1 className={style.hidden}>Bewerken</h1>
            
            <div className={style.editContainer}>
                
            </div>
        </article>
    )
};

export default ProjectEdit;
