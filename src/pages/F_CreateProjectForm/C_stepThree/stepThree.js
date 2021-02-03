import React, {useState} from 'react'
import { useObserver } from "mobx-react-lite";
import style from "./stepThree.module.css";
import parentStyle from "../createProjectForm.module.css";
import NavButtons from '../navButtons/navButtons';
import { RESPONSE } from '../../../consts/responses';


const CreateProjectFormStepThree = ({navData, errors, removeFromErrorArray, addToErrorArray, mergeProjectData, projectData}) => {

  const [personalIntroduction, setPersonalIntroduction] = useState(projectData.personalIntroduction ? projectData.personalIntroduction : 'hier komt een persoonlijke introductie over mezelf, de groep of andere dingen');
  const [contact, setContact] = useState(projectData.contact ? projectData.contact : false);
  let contactRef, publicDataRef;

  //Function that does all validations as final check
  const validation = () => {
      validateIntroduction();
      validateContact();
      if(Object.keys(errors.value).length === 0) {
        mergeProjectData({contact: contact, personalIntroduction: personalIntroduction})
        return true;}
      else return false;
  }

  //Validation for the first item, basic check if it is empty
  const validateIntroduction = (data = personalIntroduction) => {
    if(data === '') addToErrorArray('personalIntroduction', RESPONSE.NoIntroduction)
    else if(errors.value['personalIntroduction'])removeFromErrorArray('personalIntroduction');
  }

  //Validation for second item, if the contact object is empty or not filled it -> give an error
  const validateContact = () => {
        if(contact === {}) addToErrorArray('personalIntroduction', RESPONSE.ContactSelectedNotGiven)
        else if(contact.mail === '' && contact.phone === '') addToErrorArray('personalIntroduction', RESPONSE.ContactSelectedNotGiven)
        else if(errors.value['contact'])removeFromErrorArray('contact')
  }

  return useObserver(() => (
    <div className={style.wrap}>

          <label className={`${style.midsection__item}`} htmlFor={'personalIntroduction'}>
            <p className={`${parentStyle.inputTitle}`}>Hoe moeten de mensen jou / je groep / je organisatie leren kennen?</p>
            <p className={`${parentStyle.inputSubtitle}`}>Geef een korte uitleg over jezelf / je groep / je organisatie.</p>
            {errors.value['personalIntroduction'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['personalIntroduction'])}</p> : ''}
            
            <textarea
            onBlur={e => validateIntroduction(e.currentTarget.value)} 
            onChange={e => {
              setPersonalIntroduction(e.currentTarget.value); 
              if(errors.value['personalIntroduction'])validateIntroduction(e.currentTarget.value)}} 
            className={`${parentStyle.input}`} 
            name={'personalIntroduction'} 
            id={'personalIntroduction'} 
            value={personalIntroduction}/>
          </label>




              
          <div className={style.contactWrap}>
              <p className={`${parentStyle.inputTitle}`}>Van wie is het project?</p>
              <p className={`${parentStyle.inputSubtitle}`}>Geef aan of jij de organisator bent of dit maakt onder naam van.</p>
              {errors.value['contact'] ? <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>{(errors.value['contact'])}</p> : ''}


              <label className={`${style.labelSmall} ${!contact ? style.active : ''}`} htmlFor={'contact'}>
                <input
                checked={!contact}
                onChange={e => {
                  setContact(e.currentTarget.value); 
                  if(errors.value['contact'] )validateContact(e.currentTarget.value);
                }} 
                className={`${style.projectUser}`} 
                name={'contact'} id={'contact'} 
                value={false}  
                type={'radio'}/>
                Ik heb liever dat er toestemming moet gegeven worden tot het verkrijgen van de contactgegevens.
              </label>

              <label className={`${style.labelSmall} ${contact ? style.active : ''}`} htmlFor={'contact2'}>
                <input
                onClick={() => {contactRef.focus(); setContact({mail: '', phone: ''})}}
                onChange={() => {setContact({mail: '', phone: ''});}} 
                ref={input => publicDataRef = input}
                name={'contact'} 
                id={'contact2'} 
                value={''}   
                type={'radio'}/>
                De contactgegevens mogen openbaar op het platform gedeeld worden.
                </label>
                <div className={style.inputWrap}>

                  <label className={`${parentStyle.labelText}`}>
                    E-mail
                      <input
                      onBlur={() => {if(contact.mail === '' && contact.phone === '') setContact(false)}}
                      onClick={() => {publicDataRef.checked = true; if(!contact)setContact({mail: '', phone: ''})}}
                      onChange={e =>{
                        if(!contact)setContact({mail: e.currentTarget.value});
                        else {
                          let tmpContact = contact;
                          tmpContact.mail = e.currentTarget.value;
                          setContact({...tmpContact});
                        }
                      }} 
                      ref={input => (contactRef = input)}
                      className={`${parentStyle.input} projectOwner`} 
                      name={'contact'} 
                      value={contact.mail ? contact.mail : ''}  
                      type={'text'}
                      />
                  </label>


                  <label className={`${parentStyle.labelText}`}>
                    Telefoon
                    <input
                    onBlur={() => {if(contact.mail === '' && contact.phone === '') setContact(false)}}
                    onClick={() => {publicDataRef.checked = true; if(!contact)setContact({mail: '', phone: ''})}}
                    onChange={e =>{
                      if(!contact)setContact({phone: e.currentTarget.value});
                      else {
                        let tmpContact = contact;
                        tmpContact.phone = e.currentTarget.value;
                        setContact({...tmpContact});
                      }
                    }} 
                    className={`${parentStyle.input} projectOwner`} 
                    name={'contact'} 
                    value={contact.phone ? contact.phone : ''}  
                    type={'text'}
                    />
                    </label>

                </div>
                
          </div>
          
          

        
        <NavButtons errors={errors} validate={validation} currentStep={navData.currentStep} STEPS={navData.STEPS}/>
    </div>
  ));
};

export default CreateProjectFormStepThree;