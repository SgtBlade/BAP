import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./comments.module.css";
import { useStores } from "../../../hooks/useStores";
import { useState } from "react";

const Comment = ({project, setForceRefresh, forceRefresh, voted, vote}) => {
  const {uiStore, projectStore} = useStores();
  const [comment, setComment] = useState('')


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

  return useObserver(() => (
      <>
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
                            {uiStore.currentUser ?
                              comment.id === uiStore.currentUser.id ?
                              <button onClick={() => {projectStore.deleteComment(project.id, comment); project.deleteComment(index); setForceRefresh(!forceRefresh)}} className={style.reactiePerson__rapport}>
                                verwijder
                              </button>
                              :'': ''}
                              
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
      </>
          ));
};

export default Comment;
