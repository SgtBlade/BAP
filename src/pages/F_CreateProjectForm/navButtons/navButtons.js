import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./navButtons.module.css";
import globalStyle from '../../globalStyles/main.module.css'
import { ROUTES } from '../../../consts';
import { Link } from 'react-router-dom';

const NavButtons = ({validate, currentStep, errors, STEPS, newProjectID = ''}) => {
  
  return useObserver(() => (
    <>
      <div>
        {
        errors.value ?
        Object.keys(errors.value).map(function(key, index) {
          return <p key={index}>{errors.value[key]}</p>
        })
        : ''
        }
      </div>
      <div className={style.buttonWrapper}>
      {currentStep.value !== 1 ? 
      <p onClick={() => currentStep.func(currentStep.value-1)} className={`${globalStyle.mainButton} ${globalStyle.previousButton}`}>Terug naar vorige stap</p>: ''}

      {currentStep.value === 5 ?
      <p onClick={() => {alert('final')}} className={`${globalStyle.mainButton}`}><Link to={`${ROUTES.projectDetail.to}${newProjectID}`}>{STEPS[currentStep.value]} </Link></p>
      :
      <p onClick={async () => {
        if(await validate())
        {
          currentStep.func(currentStep.value+1);window.scrollTo(0, 0);}
        }} className={`${globalStyle.mainButton} ${errors.length === 0 ? '' : globalStyle.disabledButton}`}>{STEPS[currentStep.value]}</p>
      }
      
      </div>
    </>
  ));
};

export default NavButtons;