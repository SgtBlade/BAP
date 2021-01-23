import React from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepOne.module.css";

const CreateProjectFormStepOne = () => {

  return useObserver(() => (
    <div className={style.wrap}>
      I AM STEP ONE
    </div>
  ));
};

export default CreateProjectFormStepOne;