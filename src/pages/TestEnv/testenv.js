import React from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
import ReactQuill from 'react-quill';
const Testenv = () => {
  
  const { projectStore } = useStores();
  //The service worker navigation preload request was cancelled before 'preloadResponse' settled. If you intend to use 'preloadResponse', use waitUntil() or respondWith() to wait for the promise to settle.
  //Look into this error
  //Later...
  return useObserver(() => (
    <div className={style.wrap}>
      <ReactQuill 
          readOnly={true}
          modules={{ "toolbar": false }}
          value={projectStore.currentProjectDescription}
          style={{height: '80vh', width: '60%', marginTop: '2rem', marginBottom: '6rem'}}
          />
    
    </div>
  ));
};

export default Testenv;
