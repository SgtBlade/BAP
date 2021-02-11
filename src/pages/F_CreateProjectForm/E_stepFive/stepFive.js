import React, {useState} from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepFive.module.css";
import parentStyle from "../createProjectForm.module.css";
import { RESPONSE } from '../../../consts/responses';
import NavButtons from '../navButtons/navButtons';

const CreateProjectFormStepFive = ({navData, errors, removeFromErrorArray, addToErrorArray, mergeProjectData, projectData}) => {
  const tmpDate = new Date(Date.now());
  

  const [deadline, setDeadline] = useState(projectData.deadline ? projectData.deadline : false)
  const [allowQuestions, setAllowQuestions] = useState(projectData.allowQuestions ? projectData.allowQuestions : false)
  const [allowComments, setAllowComments] = useState(projectData.allowComments ? projectData.allowComments : false)
  const [date, setDate] = useState(projectData.date ? projectData.date : `${tmpDate.getFullYear()}-${tmpDate.getMonth()+1 >= 10 ? `${tmpDate.getMonth()+1}` : `0${tmpDate.getMonth()+1}`}-${tmpDate.getDate()+1 >= 10 ? `${tmpDate.getDate()+1}` : `0${tmpDate.getDate()+1}`}`)

  const handleDateChange = (value = date) => {
    if(new Date(value) > new Date(Date.now())){setDate(value);if(errors.value['deadline'])removeFromErrorArray('deadline')}
    else addToErrorArray('deadline', RESPONSE.dateInPast)
  }

  const validation = () => {
    
    //Check if there are no errors and continue
    //most variables are yes/no on this page so not much validation needed
    if(Object.keys(errors.value).length === 0) {
      mergeProjectData({
        deadline: deadline,
        allowQuestions: allowQuestions,
        allowComments: allowComments,
        deadlineDate: date,
      })
      return true;}
    else return false;
  }
  
  return useObserver(() => (
    <div className={style.wrap}>
      

      <p className={`${parentStyle.inputTitle}`}>We willen graag nog een enkele dingen vragen.</p>

      <article className={style.articleWrap}>
        <h2 className={`${style.subtitle}`}>Is er een deadline voor dit project? </h2>
            {errors.value['deadline'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error} ${style.errorOverride}`}>{(errors.value['deadline'])}</p> : ''}

        <div>
          <p 
          onClick={() => {setDeadline(true);if(errors.value['deadline'])removeFromErrorArray('deadline')}} 
          className={`${deadline === true ? '' : style.notSelected} ${style.buttons}`}>JA, is er een deadline</p>
          {deadline ? <input className={style.deadlineInput} type="date" value={date} onChange={e => handleDateChange(e.currentTarget.value)}/> : ''}
        </div>
        <p 
        onClick={() => {setDeadline(false);if(errors.value['deadline'])removeFromErrorArray('deadline')}} 
        className={`${deadline === false ? '' : style.notSelected} ${style.buttons} ${style.red}`}>Nee, er is geen deadline</p>
      </article>

      <article className={style.articleWrapRow}>
        <h2 className={`${style.subtitle}`}>Kunnen mensen vragen stellen op je pagina?</h2>
            {errors.value['allowQuestions'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error} ${style.errorOverride}`}>{(errors.value['allowQuestions'])}</p> : ''}

        <p 
        onClick={() => {setAllowQuestions(true); if(errors.value['allowQuestions']) removeFromErrorArray('allowQuestions')}} 
        className={`${allowQuestions === true ? '' : style.notSelected} ${style.bottonLarge}`}>Tuurlijk!</p>
        <p 
        onClick={() => {setAllowQuestions(false); if(errors.value['allowQuestions']) removeFromErrorArray('allowQuestions')}} 
        className={`${allowQuestions === false ? '' : style.notSelected} ${style.bottonLarge} ${style.red}`}>Liever niet.</p>
      </article>



      <article className={style.articleWrapRow}>
        <h2 className={`${style.subtitle}`}>Mogen mensen reacties plaatsen op je pagina in een review sectie?</h2>
            {errors.value['allowComments'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error} ${style.errorOverride}`}>{(errors.value['allowComments'])}</p> : ''}

        <p 
        onClick={() => {setAllowComments(true); if(errors.value['allowComments'])removeFromErrorArray('allowComments')}} 
        className={`${allowComments === true ? '' : style.notSelected} ${style.bottonLarge}`}>Ja</p>
        <p 
        onClick={() => {setAllowComments(false); if(errors.value['allowComments'])removeFromErrorArray('allowComments')}} 
        className={`${allowComments === false ? '' : style.notSelected} ${style.bottonLarge} ${style.red}`}>Neen</p>
      </article>

      
      <NavButtons errors={errors} validate={validation} currentStep={navData.currentStep} STEPS={navData.STEPS} projectData={projectData}/>
    </div>
  ));
};

export default CreateProjectFormStepFive;