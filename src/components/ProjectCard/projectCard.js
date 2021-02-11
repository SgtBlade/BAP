import React, {useState} from "react";
import style from "./projectCard.module.css";
import Tagstyle from '../../pages/globalStyles/main.module.css'
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStores } from "../../hooks/useStores";

const ProjectCard = ({project}) => {
  const {uiStore, projectStore} = useStores();
  const [upvotes, setUpvotes] = useState(project.upvotes.length)
  let currentuserId = uiStore.currentUser ? uiStore.currentUser.id ?? '' : '';
  const [voted, setVoted] = useState(project.upvotes.includes(currentuserId) || project.downvotes.includes(currentuserId) ? true : false);
  

  //Get the time difference between 2 dates
  const getTime = (date) => {
    let date1 = new Date(date);
    let date2 = new Date(Date.now());
    let difference = date1.getTime() - date2.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
  //Vote for a project
  const vote = (id) => {
    //upvote the project locally in case there's a network connection (firebase will automaticly push if network is fixed)
    projectStore.projects.filter(proj => proj.id === id)[0].addUpvote(id);
    projectStore.upvoteProject(id);
    setUpvotes(upvotes+1);
    setVoted(true);
  }

  const validateVote = (e, id) => {
    e.preventDefault();
    if(uiStore.currentUser){ if(!voted)vote(id); }
  }
  return useObserver(() => (
    <Link className={style.card__link} style={{color: 'black', marginRight: '5rem'}} to={`${ROUTES.projectDetail.to}${project.id}`}>
      <span className={`${style.card__color} ${project.isInFundingStage ? style.projectCardContainer__Green : project.archived ? style.projectCardContainer__Yellow : ''}`}></span>
      <div className={`${style.projectCardContainer}`}>

        {project.pictures[0] ?
        <img className={style.projectCardContainer__image} alt={'cover'} width={340} height={188} src={project.pictures[0].url} />
        :
        <img className={style.projectCardContainer__image} alt={'cover'} width={340} height={188} src={'/assets/project/cardPlaceholder.jpg'} />
        }
        <div className={style.projectCard__titleWrap}>
            <p className={style.projectCard__title}>{project.title}d</p>
            {project.archived ? 
              <p className={`${style.projectcard__status} ${style.projectcard__FinishedStatus}`}>Afgerond</p>
            : project.isInFundingStage ?
              <p className={`${style.projectcard__status} ${style.projectcard__Fundingstatus}`}>Funding</p>
              :
              <p className={style.projectcard__status}>Stemmen</p>
            }
        </div>
        
        {project.archived ? 
          <p className={style.success}>Project succes</p>
        :project.isInFundingStage ? 
        <div>
          <div className={style.budgetFunding}><span>{project.collectedMoney}</span> <span>{project.budget}</span></div>
          <progress className={style.progress} id="file" value={project.collectedMoney} max={project.budget}></progress>
        </div>
        :
        <div className={style.voteWrap}>
          <p>Beoordeel dit project</p>
          <div onClick={e => validateVote(e, project.id)} className={style.vote}>

            {voted?
              <img width={18} height={18} alt={'vote thumb'} src={'/assets/icons/votedSmall.svg'}/>
              : 
              <img width={18} height={18} alt={'vote thumb'} src={'/assets/icons/voteSmall.svg'}/> 
            }
            <span>{upvotes}</span>
          </div>
        </div>
        }
        {project.deadline ?  getTime(project.deadlineDate) > 0 && !project.archived ? <p className={style.countDown}>{getTime(project.deadlineDate)} dagen resterend</p> : '' :'' }
        
        <p className={style.preview}>
          {project.previewText}
        </p>
  
        <div className={style.projectCardTags}>
          {project.tags.map((tag, index) => {
            if(index < 3)return <div className={style.projectCardTags__tag} key={`${project.id}_${index}`}><div className={Tagstyle[tag.replace('/', '').replace('+', '')]}></div>{tag}</div> ;else return ''
          })}
        </div>

      </div>
      </Link>
  ));
};

export default ProjectCard;