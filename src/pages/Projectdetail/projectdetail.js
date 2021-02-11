import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import { ROUTES } from "../../consts";
import { Link, useParams, Redirect } from "react-router-dom";
import SimpleTabs from './../../components/SimpleTabs/simpleTabs.js';
import style from "./projectdetail.module.css";
import Tagstyle from '../globalStyles/main.module.css'
//import Tag from "../../components/Tag/tag.js";
//import COLORS from "../globalStyles/colors";

//import ProjectPreview from "../../components/ProjectPreview/projectPreview.js";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";
const ProjectDetail = () => {
  const { id } = useParams();
  const {projectStore, uiStore} = useStores();
  const [project, setProject] = useState(undefined)
  const [comment, setComment] = useState('')
  const [forceRefresh, setForceRefresh] = useState(false)
  const [voted, setVoted] = useState(false)
  const [participation, setParticipation] = useState(false)
  
  
  const getProject = async () => {
    if(projectStore.initialized){
    const proj = await projectStore.getProjectById(id);
    if(proj === undefined){setProject(false)}
    else if(proj.approved === false) {
        if(uiStore.currentUser)
          if(uiStore.currentUser.id === proj.ownerID){setProject(proj); setVoted(proj.upvotes.includes(uiStore.currentUser.id) || proj.downvotes.includes(uiStore.currentUser.id) ? true : false)}
          else setProject(false)
        else setProject(false)
    } else {setProject(proj); setVoted(proj.upvotes.includes(uiStore.currentUser.id) || proj.downvotes.includes(uiStore.currentUser.id) ? true : false)}}
    else setTimeout(() => {console.log('retrying to fetch the project'); getProject()}, 1200)
  }
  if(project === undefined){document.querySelector("#root").scrollTop = 0;getProject();}


  const uploadComment = async () => {
    if(validateComment){
      projectStore.uploadComment(project.id, {id: uiStore.currentUser.id, name: `${uiStore.currentUser.name} ${uiStore.currentUser.surname}`, level: uiStore.currentUser.level, content: comment, date: Date.now(), image: uiStore.currentUser.picture})
      project.addComment({id: uiStore.currentUser.id, name: `${uiStore.currentUser.name} ${uiStore.currentUser.surname}`, level: uiStore.currentUser.level, content: comment, date: Date.now(), image: uiStore.currentUser.picture})
    }
    setComment('')
  }

  //Written as a function in case there needs to be more validation later
  const validateComment = () => {
    if(comment.length >= 3)return true;
    else return false
  }

  const voteYesNo = async (index, yesNo) => {
    let questions = project.questions;
    if(yesNo)questions[index].yes.push(uiStore.currentUser.id)
    else questions[index].no.push(uiStore.currentUser.id)

    projectStore.voteYesNo(project.id, questions)
    project.setYesNo(questions)
    setForceRefresh(!forceRefresh)
  }

  const vote = (type) => {
    if(uiStore.currentUser){
    if(type){project.addUpvote(id);projectStore.upvoteProject(id);}
    else {project.addDownvote(id);projectStore.downvoteProject(id);}
    setVoted(true)}
  }

  const voteMultipleChoice = (questionIndex, optionIndex) => {
      if(uiStore.currentUser){
        let tmpQsts = project.multipleChoice;
        tmpQsts[questionIndex].answers.push({id: uiStore.currentUser.id, vote: optionIndex})
        console.log(tmpQsts)
        projectStore.voteMultiplechoice(id, tmpQsts);
        project.setMultipleChoice(tmpQsts);
        setForceRefresh(!forceRefresh);
      }
  }

  return useObserver(() => (
    <>
    {project === undefined ?
    <div className={style.loadingScreen}>
      <p>Even geduld, we zijn op zoek naar dit project</p>
      <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
    </div>
    :
    project === false ?
      <Redirect to={ROUTES.discovery} />
    :
    <article className={style.projectDetail}>
            
      <meta property="og:url"           content={window.location.href} />
      <meta property="og:type"          content="website" />
      <meta property="og:title"         content={`Durf2030 - ${project.title}`} />
      <meta property="og:description"   content={project.previewText} />
      <meta property="og:image"         content={project.pictures[0] ? project.pictures[0].url : 'https://bap-eight.vercel.app/assets/project/cardPlaceholderLarge.jpg'} />


      <div className={style.breadcrumb}>
        <p className={style.breadcrumb__content}><Link className={style.breadcrumb__content__link} to={ROUTES.discovery}>Projecten</Link> - {project.title}</p>
        <Link className={style.editProject} to={`${ROUTES.projectBewerken.to}${project.id}`}>
          <img alt={'edit'} src='/assets/icons/edit-1.svg' className={style.editProject__image}/>
          Bewerk het project
        </Link>
      </div>
      <div className={style.projectDetail__container}>
        <div className={style.projectDetail__head}>
          <div className={style.projectDetail__head__box}>
            {project.pictures[0] ?
              <img className={style.projectDetail__head__image} alt={'cover'} width={663} height={372} src={project.pictures[0].url} />
              :
              <img className={style.projectDetail__head__image} style={{border: 'solid 1px black'}} alt={'cover'} width={663} height={372} src={'/assets/project/cardPlaceholderLarge.jpg'} />
              }
            <div className={style.head__information}>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Projectfase</p>

                {project.isFundingStage ? 
                  <p className={style.information__content}>
                  <img className={style.information__content__icon} src="/assets/icons/money.svg" alt="icon"/>
                  Geld inzamelen
                  </p>
                  :
                  <p className={style.information__content}>
                    <img className={style.information__content__icon} src="/assets/icons/thumbs-up-black.svg" alt="icon"/>
                    Stemmen verzamelen
                  </p>
                }
                
              </div>
              <div className={style.head__information__box}>
                <p className={style.information__title}>Locatie</p>
                <p className={style.information__content}>
                  <img className={style.information__content__icon} src="/assets/icons/maps.svg" alt="icon"/>
                  {project.location}
                </p>
              </div>
            </div>
            <hr className={style.line}/>
            <div className={style.tags}>
                {project.tags.map( tag => 
                    <p key={tag}  className={style.tag}>
                    <span  className={`${style.tag__color} ${Tagstyle[tag.replace('/', '').replace('+', '')]}`}></span>
                    {tag}
                  </p>
                )}
            </div>
          </div>
          <div className={style.projectDetail__head__box}>
            <h1 className={style.projectDetail__title}>{project.title}</h1>
            {/*
            <div className={style.head__collaborators}>
              <span className={style.collaborators__others}>+3</span>
              <div>
              <img src="/assets/profile/defaultProfileImage.png" className={style.profilePicture} alt="collaborateurs"/>
              </div>
              <div className={`${style.profilePicture__hoofd__container}`}>
                <img src="/assets/profile/defaultProfileImage.png" className={style.profilePicture__hoofd} alt="collaborateurs"/>
                <span className={style.profilePicture__hoofd__level}>10</span>
              </div>
              <p className={style.collaborateurs}>John Doe</p>
            </div>
            */}
            
            {/*RECEIVED MONEY PROGRESS*/
              project.isFundingStage ? 
                <div className={style.receivedMoney__container}>
                <p className={style.receivedMoney__text}><span className={style.receivedMoney__text__big}>€ {project.collectedMoney}</span> van de € {project.budget} ingezameld</p>
                <progress className={style.receivedMoney__progressBar} value={project.collectedMoney} max={project.budget}/>
              </div>
              :
              ""
            }


            <p className={style.description}>
              {project.previewText}
            </p>
            <div className={style.shareContainer}>
              <a className={style.shareContainer__link} onClick={e => {e.preventDefault(); window.open(e.currentTarget.href,'popup','width=600,height=600');}} href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}><img src="/assets/socials/facebook-small.svg" alt="facebook share"/></a>
              <a className={style.shareContainer__link} onClick={e => {e.preventDefault(); window.open(e.currentTarget.href,'popup','width=600,height=300');}} href={`https://twitter.com/intent/tweet?title=${'Durf2030 - '}&text=${project.previewText}&url=${window.location.href}`} ><img src="/assets/socials/twitter-small.svg" alt="twitter share"/></a>
              <a className={style.shareContainer__link} onClick={e => {e.preventDefault(); navigator.clipboard.writeText(window.location.href)}} href={window.location.href}><img className={style.urlCopy} src="/assets/socials/share-small.svg" alt="share"/></a>
            </div>
            {project.isFundingStage ? 
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
              voted || !uiStore.currentUser ?
                  !uiStore.currentUser? ''
                  :<p className={style.votingTitle}>Wij danken u voor uw mening</p>
                :
                <div>
                  <p className={style.votingTitle}>Mag dit project uitgewerkt worden?</p>
                  <div className={style.votingButtons__container}>
                    <button onClick={() => {vote(true)}} className={`${style.votingButtons} ${style.votingButtons__primary}`}>
                      <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__love}`} src="/assets/icons/love.svg" alt="icon like"/>
                      Ja, ik stem op dit project
                    </button>
                    <button onClick={() => {vote(false)}} className={`${style.votingButtons} ${style.votingButtons__secondary}`}>
                      <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__dislike}`} src="/assets/icons/dislike.svg" alt="alt icon dislike"/>
                      Nee
                    </button>
                  </div>
                </div>
              
            }

          </div>
        </div>
        <div className={style.images__container}>
          <div className={style.images__box}>
            {project.pictures.map((img, index) => {
              return  <img key={`project_image_${index}`}className={style.image}  alt="project afbeelding" width={663} height={372} src={img.url} />
            })}
          </div>
        </div>
      </div>

      <div className={style.tabs}>
        <SimpleTabs description={projectStore.currentProjectDescription} project={project}/>
      </div>
      <div id="questions" className={style.questions}>
        <section className={style.questionsContainer}>
            

            <div className={style.questionsContainer__box}>
            <h2 className={style.questionsTitle}>Samenwerken</h2>
            <p className={style.questionsInleiding}>Naast financieële steun, kan je ook op andere manieren helpen.
            Geef ons jouw mening, of schrijf je in als vrijwilliger.
            </p>
            
            {project.questions ?
                          project.questions.length > 0 ?
              <article className={style.questionsContainer__yesno}>
                <h3 className={`${style.questionsSubtitle} ${style.sectionTitle}`}>Geef je mening</h3>
                {!uiStore.currentUser ? <p className={style.questionsSubtitle__detail}>U moet aangemeld zijn om te stemmen</p> : ''}
                {project.questions.map((question, index) => {
                  return (<div key={`yesNo${index}`} className={style.yesno__container}>
                    <p className={style.yesno__question}>
                      {question.value}
                    </p>
                    {question.yes.includes(uiStore.currentUser.id) || question.no.includes(uiStore.currentUser.id) || !uiStore.currentUser?
                    

                    question.yes.length + question.no.length === 0 ?

                      <div className={style.yesno__results}> <p>Er heeft nog niemand gestemd op deze vraag</p> </div>
                      :
                        <div className={style.yesno__results}>
                          <button className={`${style.answerButtons} ${style.answerButtons__primary}`}>
                          {Math.round(  ((question.yes.length/(question.yes.length + question.no.length))*100 ))}%
                          </button>
                          
                          stemde op Ja en 

                          <button className={`${style.answerButtons} ${style.answerButtons__secondary}`}>
                          {Math.round(((question.no.length/(question.yes.length + question.no.length))*100))}% 
                            </button>
                          stemde Nee
                          </div>
                        
                         
                    :
                    <div className={style.yesno__answers}>
                      <button onClick={() => {if(uiStore.currentUser)voteYesNo(index, true)}} className={`${style.answerButtons} ${style.answerButtons__primary}`}>
                        <img className={`${style.answerButtons__icons} ${style.answerButtons__icons__like}`} src="/assets/icons/like.svg" alt="alt icon dislike"/>
                        JA
                      </button>
                      <button onClick={() => {if(uiStore.currentUser)voteYesNo(index, false)}} className={`${style.answerButtons} ${style.answerButtons__secondary}`}>
                        <img className={`${style.answerButtons__icons} ${style.answerButtons__icons__dislike}`} src="/assets/icons/dislike.svg" alt="alt icon dislike"/>
                        Nee
                      </button>
                    </div>
                    }
                  </div>)
                })}
              </article>
              :'':''}




              <article className={style.questionsContainer__multipleChoice}>
                
                {project.multipleChoice.map((multiQuestion, questionIndex) => {

                  return (<div key={`MultiQUestion_${questionIndex}`} className={style.yesno__container} >
                            <p className={style.multipleChoice__question}>
                              {multiQuestion.question}
                            </p>
                            <div className={style.multipleChoice__form}>
                              
                              {uiStore.currentUser ? 
                                  multiQuestion.answers.filter(option => option.id === uiStore.currentUser.id).length > 0 ?

                                  <ul className={style.multipleChoice__response}>
                                    {multiQuestion.options.map((option, optionIndex) => {
                                      return ( <label key={`${multiQuestion.question}_Option${optionIndex}`} className={style.form__select}>
                                                <li>{Math.round((multiQuestion.answers.filter(option => option.vote === optionIndex).length/multiQuestion.answers.length)*100)}% koos voor: {option.value}</li>
                                              </label> )
                                    })}
                                  </ul>
                                  :
                                  multiQuestion.options.map((option, optionIndex) => {
                                    return ( <label key={`${multiQuestion.question}_Option${optionIndex}`} className={style.form__select}>
                                              <p onClick={() => voteMultipleChoice(questionIndex, optionIndex)} className={style.form__select__content}>{option.value}</p>
                                            </label> )
                                  })

                              :

                              <ul className={style.multipleChoice__response}>
                                  {multiQuestion.options.map((option, optionIndex) => {
                                    return ( <label key={`${multiQuestion.question}_Option${optionIndex}`} className={style.form__select}>
                                              <li>{Math.round((multiQuestion.answers.filter(option => option.vote === optionIndex).length/multiQuestion.answers.length)*100)}% koos voor: {option.value}</li>
                                            </label> )
                                  })}
                              </ul>

                              }


                              
                            </div>
                          </div>)
                })}
                
              </article>




             
                        {project.requirements ?
                          project.requirements.length > 0 ?
                          <article className={style.questionsContainer__volunteer}>
                            <h3 className={`${style.sectionTitle}`}>Benodigdheden</h3>
                            <p className={style.questionsSubtitle}>Wij hebben onderstaande dingen nog nodig:</p>
                            <ul>
                            {project.requirements.map((req, index) => {
                              return <li key={`req${index}`} className={style.participationItem}><span>{req.count}x</span> {req.name}</li>
                            })}</ul>
                            <p className={`${style.questionsSubtitle} ${style.requirementsSignup}`}>Geef je op als vrijwilliger</p>
                            {participation ? <p className={style.multipleChoice__question}>Bedankt voor u aan te melden!</p> : ''}
                            {!uiStore.currentUser ? <p className={style.questionsSubtitle__detail}>U moet aangemeld zijn om u te kunnen opgeven</p> : ''}
                            <button onClick={() => {projectStore.sendContactDetails(project.ownerID); setParticipation(true)}} className={style.volunteerButton}> Meld je aan als vrijwilliger </button>
                          </article>
                          :''
                        :''}

                      

            {project.discussions.length > 0 ?
              <article className={style.questionsContainer__discussion}>
                <h3 className={`${style.questionsSubtitle} ${style.sectionTitle}`}>Doe mee aan onze discussies</h3>

                {project.discussions.map ((disc, index) => {
                  return <a key={`contact${index}`} href={disc.url} target={'_blank'} rel="noopener noreferrer" className={style.questionsContainer__discussion__link}>
                         Doe mee aan de discussie ({disc.name}) ►</a>
                })}
                
              </article>
            :''}
              

            </div>
        </section>
      </div>
      {project.allowComments ?
      <section className={style.reacties}>
      <div className={style.reactiesContainer}>
          <h2 className={style.reactiesTitle}>Reacties</h2>
          
            
            {project.comments.map((comment, index) => {

              return ( 
                        <div key={`commentNr${index}`}  className={style.reactie}>
                          <div className={style.reactiePerson}>
                            <div className={style.reactiePerson__box}>
                              <img className={style.reactiePerson__image} src={comment.image} alt="profiel afbeelding"/>
                              <div className={style.reactiePerson__information}>
                                <p className={style.information__name}>{comment.name}</p>
                                <p className={style.information__timepast}>{new Date(comment.date).toISOString().split('T')[0]}</p>
                              </div>
                              {project.ownerID === comment.id ?
                              <p className={style.information__owner}>Projecteigenaar</p> :''}
                              <p className={style.information__level}>Level {comment.level}</p>
                            </div>
                            {comment.id === uiStore.currentUser.id ?
                              <button onClick={() => {projectStore.deleteComment(project.id, comment); project.deleteComment(index); setForceRefresh(!forceRefresh)}} className={style.reactiePerson__rapport}>
                                verwijder
                              </button>
                              :''}
                              
                          </div>
                          <p className={style.reactie__text}>{comment.content}</p>
                        </div>
                    ) 
            })}
            </div>
           {uiStore.currentUser ? 
           <div className={`${style.reactiesContainer} ${style.reactieInputWrapper}`}>

              <label className={style.reactieInputLabel}>
                <input
                className={style.reactieInput}
                type="text"
                value={comment}
                onChange={e => setComment(e.currentTarget.value)}
                onKeyUp={e => { if (e.keyCode === 13) uploadComment() }}
                />
                <p onClick={uploadComment} className={style.reactieButton}>reactie versturen</p> 
              </label>

           </div>
           :''}

          {voted || !uiStore.currentUser ? 
          '':
          <div className={style.extraQuestion}>
            <p className={style.extraQuestion__title}>Mag dit project verwezenlijkt worden?</p>
            <div className={style.extraQuestion__buttons}>
              <button onClick={() => {vote(true)}} className={`${style.votingButtons} ${style.votingButtons__primary}`}>
                <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__love}`} src="/assets/icons/love.svg" alt="icon like"/>
                JA
              </button>
              <button onClick={() => {vote(false)}} className={`${style.votingButtons} ${style.votingButtons__secondary}`}>
                <img className={`${style.votingButtons__icons} ${style.votingButtons__icons__dislike}`} src="/assets/icons/dislike.svg" alt="alt icon dislike"/>
                Nee
              </button>
            </div>
          </div>
            }
        </section>
        :''}


        <style>
          {`
          .ql-video {
            width: 50%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
          }
          `}
        </style>
    </article>
          }
      </>    
          ));
};

export default ProjectDetail;
