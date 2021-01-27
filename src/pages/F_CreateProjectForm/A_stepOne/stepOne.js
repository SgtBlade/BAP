import React, {useState} from 'react'
import { useObserver } from "mobx-react-lite";
import parentStyle from "../createProjectForm.module.css";
import TAGS from "../../../consts/tags"
import style from "./stepOne.module.css";
import { useStores } from "../../../hooks/useStores";
import Compressor from 'compressorjs';
import { RESPONSE } from '../../../consts/responses';
import NavButtons from '../navButtons/navButtons';

const CreateProjectFormStepOne = ({projectName, budget, tags, owner, removeFromErrorArray, addToErrorArray, pictures, preview, errors, navData}) => {
  const { uiStore } = useStores();
  const [projectOwnerTmp, SetProjectOwnerTmp] = useState('')

  let tagValues = [];
  const handleTagAdd = async (e) => {
    //Check if the value is valid, does not already include and the array with the tags is shorter than 5
    if(tagValues.includes(e.currentTarget.value) && !tags.value.includes(e.currentTarget.value) && tags.value.length < 5)tags.func([...tags.value, e.currentTarget.value]);
    if(e.currentTarget.value) e.currentTarget.value = '';
    if(errors.value['tag'])removeFromErrorArray('tag');
  }


  const validation = async () => {
    validateProjectName();
    validateBudget();
    validateTag();
    validateOwner();
    validatePictures();
    validatePreview();
    if(errors.value.length === 0) return true;
    else return false;
  }
  
  //Remove if the remove button is clicked
  const removeTag = async (el) => {
    tags.func(tags.value.filter(item => item !== el))
    
  }
  
  let inputFileRef = null;
  const handleChangePhotoButton = e => { e.preventDefault(); inputFileRef.click(); };
  
  const handlePictureUpload = async (e) => {
    if(pictures.value.length < 5){
      const target = e.currentTarget;
      const file = target.files.item(0);
      
        if (target.files && file) {
              
          const fileSize =  target.files[0].size / 1024 / 1024;
          const fileType = file['type'];
          const validImageTypes = ['image/jpeg', 'image/png'];
          
          if (!validImageTypes.includes(fileType) ) {
            alert(RESPONSE.NotAnImage);
            e.currentTarget.value = "";
            validatePictures();
            return;
          }else if(fileSize > 5) alert(RESPONSE.fileSizeOver5MB);
          
          else{
            new Compressor(file, {
              quality: 0.4,
              maxWidth: 640,
              maxHeight: 360,
              success(result) {
                pictures.func([...pictures.value, result])
              },
              error(err) {
                console.log(err.message);
              },
            });}
    }}
  }
  
  //validation functions:
  const validateProjectName = () => {
      if(projectName.value === '') addToErrorArray('projectName', RESPONSE.NoprojectName) 
      else if(errors.value['projectName']) removeFromErrorArray('projectName')
    }

  const validateBudget = () => {
        if(budget.value > 3000) addToErrorArray('budget', RESPONSE.budgetTooHigh)
        else if((budget.value) === '') addToErrorArray('budget', RESPONSE.NoBudget)
        else if(errors.value['budget']) removeFromErrorArray('budget');
    }
  
  const validateTag = () => {
    if (tags.value.length === 0) addToErrorArray('tag', RESPONSE.NoTags)
    else if(errors.value['tag']) removeFromErrorArray('tag');
  }
  
  const validateOwner = () => {
    if(document.querySelector('.projectCheck').checked) {
      if(projectOwnerTmp === '')   addToErrorArray('owner', RESPONSE.NoOwner) 
      else if(errors.value['owner']) removeFromErrorArray('owner')}
    else if(errors.value['owner']) removeFromErrorArray('owner')}
  
  const validatePictures = () => {
    if(pictures.value.length === 0 ) addToErrorArray('pictures', RESPONSE.NoPictures) 
    else if(errors.value['pictures']) removeFromErrorArray('pictures');}
  
  const validatePreview = () => {
    if(preview.value === '') addToErrorArray('preview', RESPONSE.NoPreview) 
    else if(errors.value['preview']) removeFromErrorArray('preview');
  }

  //Removing the image if remove is clicked
  const removeImage = async(index) => {
    let tmp = pictures.value;
    tmp.splice(index, 1);
    //Tripple dot to trigger re-render, without it it doesn't know what has changed
    pictures.func([...tmp]);
    validatePictures();
  }


  return useObserver(() => (
    <div className={style.wrap}>
      <label htmlFor={'projectName'}>
        <p className={parentStyle.inputTitleLarge}>Hoe heet je project?</p>
        <p className={parentStyle.inputSubtitle}>Zorg voor een goede beschrijvende en unieke naam.</p>
        {errors.value['projectName'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['projectName'])}</p> : ''}
        
        <input onBlur={validateProjectName}  
        onKeyDown={async e => 
          {
            projectName.func(e.currentTarget.value)
            if(errors.value['projectName'])validateProjectName();
          }} 
        className={parentStyle.input} 
        name={'projectName'} 
        id={'projectName'} 
        value={projectName.value}  
        type={'text'}/>
      </label>

      <div className={style.midsection}>
        <label className={`${style.midsection__item}`} htmlFor={'budget'}>
          <p className={`${parentStyle.inputTitle} ${parentStyle.white}`}>Wat is het budget?</p>
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.white}`}>Geef hier het budget dat het project moet halen om te slagen. Maximum € 3000.</p>
          {errors.value['budget'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['budget'])}</p> : ''}
          <input min={0} max={3000} onBlur={validateBudget} onChange={e => {budget.func(e.currentTarget.value); if(errors.value['budget'])validateBudget()}} className={`${parentStyle.input} ${parentStyle.white} ${parentStyle.blackLetter} ${parentStyle.largeFontSize} ${style.budgetInput}`} name={'budget'} id={'budget'} value={budget.value}  type={'number'}/>
        </label>

        <div className={`${style.midsection__item}`} htmlFor={'tags'}>
        <p className={`${parentStyle.inputTitle} ${parentStyle.white}`}>Welke categorieën?</p>
        <p className={`${parentStyle.inputSubtitle} ${parentStyle.white}`}>Voeg hier<strong className={`${parentStyle.blackLetter}`}> 5 </strong>tags toe die te maken hebben met je project.</p>
        {errors.value['tag'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['tag'])}</p> : ''}

          <div className={style.tagCollection}>
              {tags.value.map(tag => {return (<div key={tag} className={style.tag}><p>{tag}</p> <span onClick={() => {removeTag(tag);}}>X</span></div>)})}

                {tags.value.length < 5 ? 
                <div className={style.selectWrap}>
                <p className={style.tagSelectBoxButton}>+</p>
                <select 
                onBlur={validateTag} 
                className={`${style.tagSelectBox} selectBox`} 
                onChange={async e=>
                  {
                    handleTagAdd(e)
                  }} 
                name="skills" 
                defaultValue='00'>
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

      <div className={style.projectOwner}>
          <p className={`${parentStyle.inputTitle}`}>Van wie is het project?</p>
          <p className={`${parentStyle.inputSubtitle}`}>Geef aan of jij de organisator bent of dit maakt onder naam van.</p>
          {errors.value['owner'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['owner'])}</p> : ''}


          <label className={``} htmlFor={'owner'}>
            <input
            checked={owner.value === `${uiStore.currentUser.name} ${uiStore.currentUser.surname}` ? true : false}
            onChange={e => {
              owner.func(e.currentTarget.value); 
              validateOwner();
            }} 
            className={`${style.projectUser}`} 
            name={'owner'} id={'owner'} 
            value={`${uiStore.currentUser.name} ${uiStore.currentUser.surname}`}  
            type={'radio'}/>
            Ik doe dit onder mijn eigen naam
          </label>

          <label className={``} htmlFor={'owener2'}>
            <input
            onClick={() => {owner.func('');document.querySelector('.projectOwner').focus()}}
            onChange={() => {owner.func(projectOwnerTmp); console.log(owner.value)}} 
            className={`projectCheck`} 
            name={'owner'} 
            id={'owener2'} 
            value={''}   
            type={'radio'}/>
            Dit project is onder een groepsnaam / organisatie:
            
            <input
            onBlur={() => {if(projectOwnerTmp === '') owner.func(`${uiStore.currentUser.name} ${uiStore.currentUser.surname}`)}}
            onClick={() => document.querySelector('.projectCheck').checked = true}
            onChange={e =>{
              owner.func(e.currentTarget.value); 
              SetProjectOwnerTmp(e.currentTarget.value); 
            }} 
            className={`${parentStyle.input} projectOwner`} 
            name={'owner'} 
            value={projectOwnerTmp}  
            type={'text'}
            />
          </label>
      </div>
      
      
      <label htmlFor={'images'}>
        <p className={parentStyle.inputTitle}>Afbeeldingen</p>
        <p className={parentStyle.inputSubtitle}>Voeg hier max <strong className={`${parentStyle.blackLetter}`}>5</strong> kwaliteitsvolle afbeeldingen van je project toe.</p>
          {errors.value['pictures'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['pictures'])}</p> : ''}
        <p className={parentStyle.inputDetail}>*De afbeeldingen worden aangepast naar een 16:9 formaat en mogem maximum 4 MB zijn</p>
        {pictures.value.length < 5 ?
        //min 1
        <input
              onChange={handlePictureUpload}
              ref={input => (inputFileRef = input)}
              style={{ display: "none" }}
              type="file"
              id={'images'}
            />
            :''}
      </label>
        <div className={style.imagesWrapper}>
          {pictures.value.length < 5 ? <p onClick={handleChangePhotoButton} className={`${parentStyle.blackLetter}`}> + VOEG DIENEN FOTO TOE</p> : ''}
          {pictures.value.map((image, index) => {
            return <div key={index} className={style.previewImage}><img width={'426'} height={'240'} alt={`Project ${index}`} src={URL.createObjectURL(image)}/><span onClick={() => {removeImage(index)}}>X</span></div>
          })}
        </div>



        <label className={`${style.midsection__item}`} htmlFor={'introduction'}>
          <p className={`${parentStyle.inputTitle}`}>Beschrijf je project in 120 karakters</p>
          <p className={`${parentStyle.inputSubtitle}`}>Geef hier kort weer waarover het project gaat.</p>
          {errors.value['preview'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['preview'])}</p> : ''}
          <p className={parentStyle.inputDetail}>{preview.value.length}/120</p>
          
          <textarea 
          onBlur={validatePreview} 
          onChange={e => {
            if(e.currentTarget.value.length <= 120)preview.func(e.currentTarget.value)
            if(errors.value['preview'])validatePreview()
          }} 
          className={`${parentStyle.input}`} 
          name={'introduction'} 
          id={'introduction'} 
          value={preview.value}  
          type={'textarea'}/>
        </label>


        <NavButtons errors={errors} validate={validation} currentStep={navData.currentStep} STEPS={navData.STEPS}/>

      </div>
  ));
};

export default CreateProjectFormStepOne;