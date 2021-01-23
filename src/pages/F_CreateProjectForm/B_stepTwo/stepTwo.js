import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepTwo.module.css";

const CreateProjectFormStepTwo = () => {
  return useObserver(() => (
    <div className={style.wrap}>
      I AM STEP 2
    </div>
  ));
};

export default CreateProjectFormStepTwo;