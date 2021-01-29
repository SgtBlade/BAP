import React, { useState } from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./createProjectForm.module.css";
//import globalStyle from '../globalStyles/main.module.css'
//import { Link } from 'react-router-dom';
//import { ROUTES } from '../../consts';
//import { useStores } from '../../hooks/useStores';
import CreateProjectFormStepOne from './A_stepOne/stepOne';
import CreateProjectFormStepTwo from './B_stepTwo/stepTwo';
import CreateProjectFormStepThree from './C_stepThree/stepThree';
import CreateProjectFormStepFour from './D_stepFour/stepFour';
import CreateProjectFormStepFive from './E_stepFive/stepFive';
import CreateProjectFormStepSix from './F_stepSix/stepSix';

const CreateProjectForm = () => {
  //const {uiStore} = useStores();
  const [errors, setErrors] = useState({});

  //control of which page you are on
  const STEPS = { 1: 'Naar de volgende stap 2/5', 2: 'Naar de volgende stap 3/5', 3: 'Naar de volgende stap 4/5', 4: 'Naar de volgende stap 5/5', 5: 'Creatie voltooien 👍', 6: 'Bekijk de pagina', }

  const [currentStep, setCurrentStep] = useState(5)


  //Remove Function that is given to the components to update the error array
  const removeFromErrorArray = (keyName) => {
    console.log(`removing ${keyName}`)
    const tmpError = errors;
    delete tmpError[keyName];
    setErrors({...tmpError});
    return true;
  }
  //Addition function that is given to the components to update the error array
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
        return <CreateProjectFormStepThree navData={{ currentStep: {value: currentStep, func: setCurrentStep}, STEPS}} removeFromErrorArray={removeFromErrorArray} addToErrorArray={addToErrorArray} errors={{value: errors, func: setErrors}}/>;
      case 4:
        return <CreateProjectFormStepFour/>;
      case 5:
        return <CreateProjectFormStepFive navData={{ currentStep: {value: currentStep, func: setCurrentStep}, STEPS}} removeFromErrorArray={removeFromErrorArray} addToErrorArray={addToErrorArray} errors={{value: errors, func: setErrors}}/>;
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