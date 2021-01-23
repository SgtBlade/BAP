import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepSix.module.css";



const CreateProjectFormStepSix = () => {
  return useObserver(() => (
    <div className={style.wrap}>
      
      <div className={style.textBlock}>
      <p>Je project aanvraag is <strong>verzonden naar DURF2030.</strong></p>

      <p>Binnen <strong>enkele dagen</strong> zal je via <strong>mail</strong> op de hoogte gebracht worden of het project <strong>al dan niet goedgekeurd</strong> is, waar je vervolgens zoveel mogelijk stemmen binnen zal moeten halen.</p>
      <p><strong>Check zeker ook je spam folder!</strong></p>
      </div>
    </div>
  ));
};

export default CreateProjectFormStepSix;