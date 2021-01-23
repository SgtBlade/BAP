import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepFour.module.css";

const CreateProjectFormStepFour = () => {

  return useObserver(() => (
    <div className={style.wrap}>
      I AM STEP 4
    </div>
  ));
};

export default CreateProjectFormStepFour;