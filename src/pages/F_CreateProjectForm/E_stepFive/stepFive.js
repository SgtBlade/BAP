import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepFive.module.css";

const CreateProjectFormStepFive = () => {
  return useObserver(() => (
    <div className={style.wrap}>
      I AM STEP 5
    </div>
  ));
};

export default CreateProjectFormStepFive;