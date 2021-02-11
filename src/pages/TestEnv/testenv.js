import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
const Testenv = () => {
  
  const { projectStore } = useStores();
  //Test environment, just to do what you want and test new features
  return useObserver(() => (
    <div className={style.wrap}>
     
    </div>
  ));
};

export default Testenv;
