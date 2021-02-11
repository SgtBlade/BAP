import React, {useState} from "react";
import style from "./projectPreview.module.css";
import COLORS from "./../../pages/globalStyles/colors.js";
import tagStyle from '../../pages/globalStyles/main.module.css'
import { useStores } from "../../hooks/useStores";
import { ROUTES } from "../../consts";
import { Link } from "react-router-dom";

const ProjectPreview = ({project}) => {
  const {uiStore, projectStore} = useStores();
  const [upvotes, setUpvotes] = useState(project.upvotes.length);
  let currentuserId = uiStore.currentUser.id ?? '';
  const [voted, setVoted] = useState(project.upvotes.includes(currentuserId) || project.downvotes.includes(currentuserId) ? true : false);
  let color;
  let textColor;
  let typeText;

  // Checks wich type project it is and changes the colors according to the type of project

    if(project.archived){
      color = COLORS.durfYellow;
      textColor = "black";
      typeText = "Afgerond";}
    else if (project.failed){
      color = COLORS.durfRed;
      textColor = "white";
      typeText = "Afgelast";
    }else if(project.isInFundingStage){
      color = COLORS.durfGreen;
      textColor = "white";
      typeText = "Funding";
    }else if(!project.isInFundingStage && !project.archived){
      color = COLORS.lightGrey;
      textColor = "black";
      typeText = "Stemmen";
    }else{
      color = "black";
      textColor = "white";}



  const getTime = (date) => {
    let date1 = new Date(date);
    let date2 = new Date(Date.now());
    let difference = date1.getTime() - date2.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

  const vote = () => {
    let id = project.id
    if(!voted && uiStore.currentUser){
    projectStore.projects.filter(proj => proj.id === id)[0].addUpvote(id);
    projectStore.upvoteProject(id);
    setUpvotes(upvotes+1);
    setVoted(true);}
  }

  const validateVote = (e, id) => {
    e.preventDefault();
    if(uiStore.currentUser){ if(!voted)vote(id); }
  }

  return (
    <Link style={{color: 'black', marginRight: '5rem'}} to={`${ROUTES.projectDetail.to}${project.id}`}>
    <article className={style.projectCard}>
      <span
        className={style.borderLeft}
        style={{
          backgroundColor: color,
        }}
      ></span>
      <div className={style.projectCard__container}>
        {project.pictures[0] ?
              <img  className={style.projectCard__image} alt={'cover'}src={project.pictures[0].url} />
              :
              <img  className={style.projectCard__image} style={{border: 'solid 1px black'}} alt={'cover'} src={'/assets/project/cardPlaceholderLarge.jpg'} />
              }
        <div className={style.projectCard__container__content}>
          <div className={style.projectCard__container__content__title}>
            <h3 className={style.projectCard__title}>{project.title}</h3>
            <p
              className={style.projectCard__type}
              style={{
                backgroundColor: color,
                color: textColor,
              }}
            >
              {typeText}
            </p>
          </div>

          {project.isInFundingStage ? (
            <div className={style.projectCard__funding}>
              <div className={style.projectCard__funding__progressValues}>
                <p
                  className={
                    style.projectCard__funding__progressValues__content
                  }
                >
                  € {project.collectedMoney}
                </p>
                <p
                  className={
                    style.projectCard__funding__progressValues__content
                  }
                >
                  € {project.budget}
                </p>
              </div>
              <progress
                className={`${style.projectCard__funding__progressBar}`}
                value="50"
                max="100"
              />
              {project.deadline ?  getTime(project.deadlineDate) > 0 && !project.archived ? <p className={style.projectCard__time}>{getTime(project.deadlineDate)} dagen resterend</p> : '' :'' }
            </div>
          ) : (
            ""
          )}

          {!project.isInFundingStage && !project.archived ? (
            <div className={style.projectCard__voting}>
              <p className={style.projectCard_voting_text}>
                Beoordeel dit project
              </p>
              {project.deadline ?  getTime(project.deadlineDate) > 0 && !project.archived ? <p className={style.projectCard__time}>{getTime(project.deadlineDate)} dagen resterend</p> : '' :'' }
              <div className={style.projectCard__voting__container}>
                {voted?
                  <img width={18} height={18} alt={'vote thumb'} src={'/assets/icons/votedSmall.svg'}/>
                  : 
                  <img onClick={validateVote} width={18} height={18} alt={'vote thumb'} src={'/assets/icons/voteSmall.svg'}/> 
                }
                <p className={style.projectCard__voting__amount}>{project.upvotes.length}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {false ? (
            <div className={style.projectCard__voting}>
              <p className={style.projectCard_voting_text}>
                De stemmenteller staat op:
              </p>
              {project.deadline ?  getTime(project.deadlineDate) > 0 && !project.archived ? <p className={style.projectCard__time}>{getTime(project.deadlineDate)} dagen resterend</p> : '' :'' }
              <div className={style.projectCard__voting__container}>
                {voted?
                  <img width={18} height={18} alt={'vote thumb'} src={'/assets/icons/votedSmall.svg'}/>
                  : 
                  <img onClick={validateVote} width={18} height={18} alt={'vote thumb'} src={'/assets/icons/voteSmall.svg'}/> 
                }
                <p className={style.projectCard__voting__amount}>{project.upvotes.length}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <p className={style.projectCard__description}>
            {project.previewText ? '' : ''}
          </p>

          <div className={style.projectCard__tags}>
            {project.tags.map((tag, index) => {
                  if(index >= 3) return ''
                  else return <p key={`${project.id}_tag_${index}`} className={style.projectCard__tag}> <span className={`${style.projectCard__tag__color} ${tagStyle[tag.replace('/', '').replace('+', '')]}`}></span> {/* tags.text */} {tag} </p>
            })}
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ProjectPreview;
