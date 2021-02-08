import React, {useRef, useState} from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepTwo.module.css";
import parentStyle from "../createProjectForm.module.css";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageCompress from 'quill-image-compress';
import NavButtons from '../navButtons/navButtons';
import { RESPONSE } from '../../../consts/responses';
Quill.register('modules/imageCompress', ImageCompress);

const CreateProjectFormStepTwo = ({navData, errors, removeFromErrorArray, addToErrorArray, mergeProjectData,projectData }) => {
  const [description, setDescription] = useState(projectData.description ??  ``);
  let ref1, ref2, ref3 = useRef();


  //Validation for all fields, first if might look a little strange but
  //this is done with a reason. When typing the refs don't always get linked
  //to the component for an unknown reason and can return an error
  const validation = async (e, data = description) => {
    if(ref1 && ref2 && ref3)
    if(data === '' || data === '<p><br></p>') {
      addToErrorArray('description', RESPONSE.NoDescription);
      return false;
    }else {if(errors.value['description'])removeFromErrorArray('description'); 
    mergeProjectData({description: description});
    return true}
    else if(data === '' || data === '<p><br></p>'){
      addToErrorArray('description', RESPONSE.NoDescription);
      return false;
    } 

  }
  //Code for development only
  //Used to see how large the size will be of the project text generated by quill
  //DELETE LATER 
  /*
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    document.querySelector('.filesize').textContent = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }*/

 //activates when quill receives input
 //Displays the code quill generates & places empty lines for visibility
  const handleChange = (html) => {
    if(errors.value['description'])validation();
    setDescription(html);
    //bytesToSize(encodeURI(html).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1)
    if(errors.value['description'])validation()
  }

  //Options that are enabeled on the quill 
  const modules = {
    toolbar: [

      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],  // text direction
    
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
    
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'], ['clean']

    

    ]
    ,
    imageCompress: {
      quality: 0.4, // default
      maxWidth: 720, // default
      maxHeight: 405, // default
      imageType: 'image/jpeg', // default
      debug: false, // default
    }
  }

  return useObserver(() => (
    <div className={style.wrap}>
        <style>
          {`
          .ql-video {
            width: 50%;
            height: 50%;
            margin-left: auto;
            margin-right: auto;
          }
          `}
        </style>
          <label className={`${style.midsection__item}`} htmlFor={'budget'}>
            <p className={`${parentStyle.inputTitle}`}>Wat moeten de mensen weten over je project?</p>
            <p className={`${parentStyle.inputSubtitle}`}>Geef hier de uitleg over je project.</p>
          {errors.value['description'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['description'])}</p> : ''}
            <p className={`${parentStyle.inputDetail} filesize`}></p>
          </label>
          <div className={style.checkbox}>
          <p className={`${parentStyle.inputSubtitle}`}>Mijn uitleg bevat volgende zaken:</p>
            <label htmlFor={'option1'}>
              <input 
              ref={input => ref1 = input}
              onChange={() => {if(errors.value['description'])validation();}} 
              className={``} 
              name={'option1'} 
              id={'option1'} 
              value={false}  
              type={'checkbox'}/>
              Uitgebreide, duidelijke <strong>uitleg</strong> over het <strong>project</strong>.
            </label>  
            <label htmlFor={'option2'}>
              <input 
              ref={input => ref2 = input}
              onChange={() => {if(errors.value['description'])validation();}} 
              className={``} 
              name={'option2'} 
              id={'option2'} 
              value={false}  
              type={'checkbox'}/>
              Een <strong>antwoord</strong> op de vraag <strong>“Wat wil je met je project teweegbrengen?”</strong>
            </label>  
            <label htmlFor={'option3'}>
              <input 
              ref={input => ref3 = input}
              onChange={() => {if(errors.value['description'])validation();}} 
              className={``} 
              name={'option3'} 
              id={'option3'} 
              value={false}  
              type={'checkbox'}/>
              Legt uit <strong>hoe kunst</strong> en <strong>creativiteit ingezet</strong> wordt bij dit project.
            </label>  

        </div>
          <ReactQuill 
          theme={'snow'}
          onChange={handleChange}
          onBlur={e => validation(description)}
          value={description}
          modules={modules} 
          style={{height: '80vh', marginTop: '2rem', marginBottom: '6rem'}}
          />

        
        <NavButtons errors={errors} validate={validation} currentStep={navData.currentStep} STEPS={navData.STEPS}/>
    </div>
  ));
};

export default CreateProjectFormStepTwo;