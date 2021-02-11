import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./adminpanel.module.css";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";
import ProjectCard from "../../components/ProjectCard/projectCard";
const Adminpanel = () => {
  
  const { uiStore, projectStore } = useStores();
  const [projectType, setProjectType] = useState('unApproved')
  const [projects, setProjects] = useState();
  const [users, getUsers] = useState(uiStore.allUsers)

  const getProjectsByFilter = () => {
    if(projectStore.initialized){
      let projectsTmp = [];
      switch(projectType){
        case 'unApproved':
          projectsTmp = projectStore.getUnApprovedProjects(projectStore.projects)
          break;
        case 'All':
          projectsTmp = (projectStore.projects)
          break;

        default:
          break;
      }
      setProjects([...projectsTmp])}
      else setTimeout(() => {getProjectsByFilter()}, 1000)
  }


  if(projects === undefined)getProjectsByFilter();

  const approveProject = (projId) => {
    projectStore.projects.filter(proj => proj.id === projId)[0].setApproved(true);
    projectStore.approveProject(projId);
    getProjectsByFilter();
  }

  const deleteProject = async (project) => {
    if(window.confirm('Bent u zeker dat u dit project wil verwijderen?')){
    let projTmp = projects
    projectStore.removeProjectFromDB(project)
    projTmp.splice(projTmp.indexOf(project), 1);
    setProjects([...projTmp])}
  }

  //const checkUsers = async () => { if(uiStore.allUsers.length === 0)await uiStore.getAllUsers(); }

  const deleteUser = (id) => { if(window.confirm('Bent u zeker dat u deze gebruiker wil verwijderen?')){ uiStore.deleteUser(id); } }
  
  return useObserver(() => (
    <div className={style.wrap}>
      
      <ul className={style.navigation}>
        <li className={projectType === 'unApproved' ? style.active : ''} onClick={() => {setProjectType(projectType !== 'unApproved' ? 'unApproved' : 'unApproved');getProjectsByFilter('unApproved')}}>Nieuwe projecten</li>
        <li className={projectType === 'All' ? style.active : ''} onClick={() => {setProjectType(projectType !== 'All' ? 'All' : 'unApproved');getProjectsByFilter('All')}}>Alle projecten</li>
        <li className={projectType === 'users' ? style.active : ''} onClick={() => {setProjectType(projectType !== 'users' ? 'users' : 'unApproved'); if(uiStore.allUsers.length === 0) uiStore.getAllUsers(); getUsers(uiStore.allUsers)}}>Gebruikers</li>
      </ul>

    {projectType === 'unApproved' ?
      <article className={style.projectsApprovalWrap}>
        <h2 className={style.projectsApproval__title}>Goed te keuren projecten:</h2>
        <p className={style.projectsApproval__subtitle}>*Let op, een project af keuren wil zeggen dat het verwijderd zal worden</p>
        <div className={style.projectsApproval__projects}>
          
          {projects ?
            projects.length > 0 ?
                projects.map(project => {
                
                  return (<div key={project.id} className={style.projectsApproval__project}>
                              <p onClick={() => {approveProject(project.id)}} className={`${style.projectsApproval__project__accept} ${style.projectsApproval__project__button}`}>Goedkeuren</p>
                              <p onClick={() => {deleteProject(project)}} className={`${style.projectsApproval__project__decline} ${style.projectsApproval__project__button}`}>Afkeuren</p>
                              <ProjectCard project={project}/>  
                          </div>)
                })
              :
              <p className={style.projectsApproval__detail}>Er zijn geen projecten gevonden</p>
            
          :
          ''}
          
        </div>
      </article>
      : '' }


    {projectType === 'users' ?
      <article className={style.usersWrap}>
        <h2 className={style.projectsApproval__title}>Gebruikers:</h2>
              <table className={style.users__table}>
                  <thead className={style.users__tableHead}>
                    <tr>
                      <th>ID</th>
                      <th>Lid sinds</th>
                      <th>Naam</th>
                      <th>Achternaam</th>
                      <th>E-mail</th>
                      <th>Verwijder</th>
                    </tr>
                  </thead>  
                <tbody className={style.users__tableBody}>

                {users.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td><NavLink exact className={style.linkImage} activeClassName={style.activeImage} to={`${ROUTES.profiel.to}${user.id}`}>{user.id} </NavLink> </td>
                      <td>{(new Date(user.creationDate)).toLocaleDateString()}</td>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td><a href={`mailto:${user.mail}`}>{user.mail}</a></td>
                      <td className={style.deleteUser}><img onClick={() => deleteUser(user.id)} alt={'delete icon'} src={'/assets/icons/trash.svg'}/></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
        <ul>
          
        </ul>
      </article>
      : '' }


    {projectType === 'All' ?
      <article className={style.projectsApprovalWrap}>
        <h2 className={style.projectsApproval__title}>Alle projecten:</h2>
        <p className={style.projectsApproval__subtitle}>*Verwijderde projecten kunnen niet worden hersteld</p>
        <div className={style.projectsApproval__projects}>
          
          {projects ?
            projects.length > 0 ?
                projects.map(project => {
                
                  return (<div key={project.id} className={style.projectsApproval__project}>
                              <p onClick={() => {deleteProject(project)}} className={`${style.projectsApproval__project__decline} ${style.projectsApproval__project__button} ${style.projectsApproval__project__button__double}`}>Afkeuren</p>
                              <ProjectCard project={project}/>  
                          </div>)
                })
              :
              <p className={style.projectsApproval__detail}>Er zijn geen projecten gevonden</p>
            
          :
          ''}
          
        </div>
      </article>
      : '' }
    </div>
  ));
};

export default Adminpanel;
