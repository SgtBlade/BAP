import React, { useState } from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepSix.module.css";
import { useStores } from "../../../hooks/useStores";
import {Link } from "react-router-dom";
import { ROUTES } from '../../../consts';



const CreateProjectFormStepSix = ({projectData}) => {
  const { uiStore, projectStore } = useStores();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [res, setRes] = useState(undefined)


  const uploadProject = async () => {
    //final check to make sure user is logged in
    //though it should be impossible to reach this step without being logged in
    if(uiStore.currentUser){
    let result = await uiStore.uploadProject(projectData);
    if(result.id){setRes(result); projectStore.addProject(result)}
    else {setRes(false);}}else setTimeout(() => {uploadProject()}, 1200)
  }
  

  if(!hasUploaded){uploadProject(); setHasUploaded(true)}


  return useObserver(() => (
    <div className={style.wrap}>

      {uiStore.isLoading ?
      <div className={style.uploadWrap}>
          <p className={style.uploadWrap__info}>Even geduld, wij zijn uw project aan het uploaden</p>  
          <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
      </div>
      :

      res === false ?
          <div className={style.textBlock}>
            <div onClick={() => console.log(res)} className={style.text__wrap}>
              <p className={style.textBlock__title}>Er is een fout opgetreden bij het uploaden van je project</p>
  
              <p className={style.textBlock__text}>Gelieve contact op te nemen met ons team zodat wij dit zo snel mogelijk kunnen oplossen.</p>

              <p className={style.textBlock__text}>Wij zijn berijkbaar op: <strong><a className={style.errorHref} href={'mailto:durf2030@durf.be?subject=Fout tijdens het uploaden van het project&body=Hallo, ik heb een foutmelding gekregen tijdens het maken van een project'}>durf2030@durf.be</a></strong></p>
              <p className={style.textBlock__text}>Onze excusses voor het ongemak</p>
            </div>
          </div>
      :
      res === undefined ?
      <div className={style.uploadWrap}>
          <p onClick={() => console.log(res)}className={style.uploadWrap__info}>Even geduld, wij zijn uw project aan het uploaden</p>  
          <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
      </div>
      :
      res ?
      <div className={style.textBlock}>
        <p onClick={() => console.log(res)} className={style.textBlock__successIcon}>✔</p>
        <div className={style.text__wrap}>
          <p className={style.textBlock__title}>Je project aanvraag is <strong>verzonden naar DURF2030.</strong></p>

          <p className={style.textBlock__text}>Binnen <strong>enkele dagen</strong> zal je via <strong>mail</strong> op de hoogte gebracht worden of het project <strong>al dan niet goedgekeurd</strong> is, waar je vervolgens zoveel mogelijk stemmen binnen zal moeten halen.</p>
          <p><strong>Check zeker ook je spam folder!</strong></p>

        </div>

        <Link to={`${ROUTES.projectDetail.to}${res.id}`}><p className={style.button}>Bekijk het project</p></Link>
        <p className={style.textBlock__detail}>*Het project is momenteel enkel zichtbaar voor u</p>
      </div>
      :
      <div className={style.uploadWrap}>
          <p className={style.uploadWrap__info}>Even geduld, wij zijn uw project aan het uploaden</p>  
          <img height={150} alt={'loading'} src={'/assets/project/loading2.svg'}/>
      </div>
      
      }
    </div>
  ));
};

export default CreateProjectFormStepSix;