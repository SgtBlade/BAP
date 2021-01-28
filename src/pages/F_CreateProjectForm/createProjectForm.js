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
import { useStores } from '../../hooks/useStores';

const CreateProjectForm = () => {
  const {uiStore} = useStores();
  const [errors, setErrors] = useState({});

  //control of which page you are on
  const STEPS = { 1: 'Naar de volgende stap 2/5', 2: 'Naar de volgende stap 3/5', 3: 'Naar de volgende stap 4/5', 4: 'Naar de volgende stap 5/5', 5: 'Creatie voltooien 👍', 6: 'Bekijk de pagina', }

  const [currentStep, setCurrentStep] = useState(2)
  const newProjectID = ''
  const [impact, setimpact] = useState('')

  const [deadline, setdeadline] = useState('')

  const [contactOptions, setContactOptions] = useState('')
  const [about, setAbout] = useState('')
  const [questions, setQuestions] = useState('')
  const [allowQuestions, setAllowQuestions] = useState(false)
  const [allowComments, setAllowComments] = useState(false)


  const removeFromErrorArray = (keyName) => {
    console.log(`removing ${keyName}`)
    const tmpError = errors;
    delete tmpError[keyName];
    setErrors({...tmpError});
    return true;
  }
  const addToErrorArray = (keyName, response) => {
    console.log(`adding ${keyName}`)
    let tmpError = errors;
    tmpError[keyName] = response;
    setErrors({...tmpError});
    return true;
  }


  const returnPage = (number) => {
    switch (number) {
      case 1:
        return <CreateProjectFormStepOne navData={{ currentStep: {value: currentStep, func: setCurrentStep}, STEPS}} removeFromErrorArray={removeFromErrorArray} addToErrorArray={addToErrorArray} errors={{value: errors, func: setErrors}}/>;
      case 2:
         return <CreateProjectFormStepTwo navData={{ currentStep: {value: currentStep, func: setCurrentStep}, STEPS}} removeFromErrorArray={removeFromErrorArray} addToErrorArray={addToErrorArray} errors={{value: errors, func: setErrors}}/>;
      case 3:
        return <CreateProjectFormStepThree impact={{ value: impact, func:   setimpact}} about={{ value: about, func:   setAbout}} contact={{ value: contactOptions, func:   setContactOptions}}/>;
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
    </div>
  ));
};

export default CreateProjectForm;