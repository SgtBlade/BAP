import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepThree.module.css";


const CreateProjectFormStepThree = () => {

  return useObserver(() => (
    <div className={style.wrap}>
        
    </div>
  ));
};

export default CreateProjectFormStepThree;