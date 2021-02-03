import React, { useState } from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepSix.module.css";
import { useStores } from "../../../hooks/useStores";



const CreateProjectFormStepSix = ({projectData}) => {
  const { uiStore } = useStores();
  const [hasUploaded, setHasUploaded] = useState(false);

  if(!hasUploaded){uiStore.uploadProject(projectData); setHasUploaded(true)}

  return useObserver(() => (
    <div className={style.wrap}>
      
      <div className={style.textBlock}>
      <p>Je project aanvraag is <strong>verzonden naar DURF2030.</strong></p>

      <p>Binnen <strong>enkele dagen</strong> zal je via <strong>mail</strong> op de hoogte gebracht worden of het project <strong>al dan niet goedgekeurd</strong> is, waar je vervolgens zoveel mogelijk stemmen binnen zal moeten halen.</p>
      <p><strong>Check zeker ook je spam folder!</strong></p>
      </div>

      <br></br>
      <br></br>
      <br></br>
      {uiStore.isLoading ?
      <p>is loading</p>  
      :
      <p>done loading</p>
      }
    </div>
  ));
};

export default CreateProjectFormStepSix;