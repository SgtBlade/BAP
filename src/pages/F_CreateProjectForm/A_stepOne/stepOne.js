import React from 'react'
import { useObserver } from "mobx-react-lite";
import globalStyle from "../createProjectForm.module.css";
import TAGS from "../../../consts/tags"
import style from "./stepOne.module.css";

const CreateProjectFormStepOne = ({projectName, budget, tags, owner, pictures, preview,}) => {

  let tagValues = [];
  const handleSelectChange = (e) => {
    //Check if the value is valid, does not already include and the array with the tags is shorter than 5
    if(tagValues.includes(e.currentTarget.value) && !tags.value.includes(e.currentTarget.value) && tags.value.length < 5)tags.func([...tags.value, e.currentTarget.value]);
    e.currentTarget.value = '';
  }
  
  //Remove if the remove button is clicked
  const removeElement = (el) => tags.func(tags.value.filter(item => item !== el))
  

  return useObserver(() => (
    <div className={style.wrap}>
      <label htmlFor={'projectName'}>
        <p className={globalStyle.inputTitleLarge}>Hoe heet je project?</p>
        <p className={globalStyle.inputSubtitle}>Zorg voor een goede beschrijvende en unieke naam.</p>
        <input onChange={e => projectName.func(e.currentTarget.value)} className={globalStyle.input} name={'projectName'} id={'projectName'} value={projectName.value}  type={'text'}/>
      </label>

      <div className={style.midsection}>
        <label className={`${style.midsection__item}`} htmlFor={'budget'}>
          <p className={`${globalStyle.inputTitle} ${globalStyle.white}`}>Wat is het budget?</p>
          <p className={`${globalStyle.inputSubtitle} ${globalStyle.white}`}>Geef hier het budget dat het project moet halen om te slagen. Maximum € 3000.</p>
          <input onChange={e => budget.func(e.currentTarget.value)} className={`${globalStyle.input} ${globalStyle.white} ${globalStyle.blackLetter} ${globalStyle.largeFontSize} ${style.budgetInput}`} name={'budget'} id={'budget'} value={budget.value}  type={'number'}/>
        </label>

        <div className={`${style.midsection__item}`} htmlFor={'tags'}>
        <p className={`${globalStyle.inputTitle} ${globalStyle.white}`}>Welke categorieën?</p>
        <p className={`${globalStyle.inputSubtitle} ${globalStyle.white}`}>Voeg hier<strong className={`${globalStyle.blackLetter}`}> 5 </strong>tags toe die te maken hebben met je project.</p>
        

          <div className={style.tagCollection}>


              {tags.value.map(tag => {return (<div key={tag} className={style.tag}><p>{tag}</p> <span onClick={() => {removeElement(tag)}}>X</span></div>)})}

                {tags.value.length < 5 ? 
                <div className={style.selectWrap}>
                <p className={style.tagSelectBoxButton}>+</p>
                <select className={`${style.tagSelectBox} selectBox`} onChange={e=>handleSelectChange(e)} name="skills" defaultValue='00'>
                <option disabled value='00'> -- select an option -- </option>
                        { Object.keys(TAGS).map(function(key, index) {
                          return <optgroup key={key} label={key.replace('___', ' / ').replace('__', ' & ').replace('_', ' ')}>
                            { Object.keys(TAGS[key]).map(function(seckey, secindex) {
                              tagValues.push(TAGS[key][seckey])
                              return <option key={`${key}${secindex}`} value={TAGS[key][seckey]}>{TAGS[key][seckey]}</option>
                            }) }
                          </optgroup>
                        }) }
                  </select>
              </div>
              :'' }
            

          </div>
        </div>
      </div>
    </div>
  ));
};

export default CreateProjectFormStepOne;