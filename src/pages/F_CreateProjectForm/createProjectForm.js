import React, { useState } from 'react'
import { useObserver } from "mobx-react-lite";
import globalStyle from '../globalStyles/main.module.css'
import style from "./createProjectForm.module.css";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import CreateProjectFormStepOne from './A_stepOne/stepOne';
import CreateProjectFormStepTwo from './B_stepTwo/stepTwo';
import CreateProjectFormStepThree from './C_stepThree/stepThree';
import CreateProjectFormStepFour from './D_stepFour/stepFour';
import CreateProjectFormStepFive from './E_stepFive/stepFive';
import CreateProjectFormStepSix from './F_stepSix/stepSix';

const CreateProjectForm = () => {
  //control of which page you are on
  const STEPS = { 1: 'Naar de volgende stap 2/5', 2: 'Naar de volgende stap 3/5', 3: 'Naar de volgende stap 4/5', 4: 'Naar de volgende stap 5/5', 5: 'Creatie voltooien 👍', 6: 'Bekijk de pagina', }

  const [currentStep, setCurrentStep] = useState(1)
  const newProjectID = ''
  //Data required for the project
  const [projectName, setProjectName] = useState('')
  const [description, setdescription] = useState('')
  const [impact, setimpact] = useState('')
  const [requiredAmount, setrequiredAmount] = useState('')
  const [tags, setTags] = useState([])
  const [pictures, setPictures] = useState('')
  const [deadline, setdeadline] = useState('')
  const [Owner, setOwner] = useState('')  
  const [preview, setPreview] = useState('')  
  const [contactOptions, setContactOptions] = useState('')
  const [about, setAbout] = useState('')
  const [questions, setQuestions] = useState('')
  const [allowQuestions, setAllowQuestions] = useState(false)
  const [allowComments, setAllowComments] = useState(false)

  const returnPage = (number) => {
    switch (number) {
      case 1:
        return <CreateProjectFormStepOne projectName={{ value: projectName, func:   setProjectName}} budget={{ value: requiredAmount, func:   setrequiredAmount}} tags={{ value: tags, func:   setTags}} owner={{ value: Owner, func:   setOwner}} pictures={{ value: pictures, func:   setPictures}} preview={{ value: preview, func:   setPreview}}/>;
      case 2:
         return <CreateProjectFormStepTwo impact={{ value: impact, func:   setimpact}} about={{ value: about, func:   setAbout}} contact={{ value: contactOptions, func:   setContactOptions}}/>;
      case 3:
        return <CreateProjectFormStepThree description={{ value: description, func:   setdescription}}/>;
      case 4:
        return <CreateProjectFormStepFour questions={{ value: questions, func:   setQuestions}}/>;
      case 5:
        return <CreateProjectFormStepFive deadline={{ value: deadline, func:   setdeadline}} allowQuestions={{ value: allowQuestions, func:   setAllowQuestions}} allowComments={{ value: allowComments, func:   setAllowComments}} />;
      case 6:
         return <CreateProjectFormStepSix/>;
      default:
          return <CreateProjectFormStepOne/>;
    }
  }
  return useObserver(() => (
    <div className={style.wrap}>
      <div className={style.progressbarWrap}>
      <progress className={style.progress} id="file" value={currentStep} max="5"></progress>
      </div>
      {returnPage(currentStep)}


    <div className={style.buttons}>
    {currentStep !== 1 ? 
    <p onClick={() => setCurrentStep(currentStep-1)} className={`${globalStyle.mainButton} ${globalStyle.previousButton}`}>Terug naar vorige stap</p>: ''}

    {currentStep === 5 ?
    <p onClick={() => {alert('final')}} className={`${globalStyle.mainButton}`}><Link to={`${ROUTES.projectDetail.to}${newProjectID}`}>{STEPS[currentStep]} </Link></p>
    :
    <p onClick={() => {setCurrentStep(currentStep+1)}} className={`${globalStyle.mainButton}`}>{STEPS[currentStep]}</p>
    }
    

    </div>
    </div>
  ));
};

export default CreateProjectForm;