import React, {useState} from 'react'
import { useObserver } from "mobx-react-lite";
import parentStyle from "../createProjectForm.module.css";
import style from "./stepFour.module.css";
import NavButtons from '../navButtons/navButtons';

const CreateProjectFormStepFour = ({removeFromErrorArray, addToErrorArray, errors, navData, mergeProjectData, projectData}) => {
  //The booleans to know if we need to show the "form" to add the things the user want
  const [allowYesNo, setAllowYesNo] = useState(projectData.questions ? projectData.questions.length > 0 ? true: false : false);
  const [allowMultipleChoice, setAllowMultipleChoice] = useState(projectData.multipleChoice ? projectData.multipleChoice.length > 0 ? true: false : false);
  const [allowRequirements, setAllowRequirements] = useState(projectData.requirements ? projectData.requirements.length > 0 ? true: false : false);
  const [allowDiscussion, setAllowDiscussion] = useState(projectData.discussions ? projectData.discussions.length > 0 ? true: false : false);

  //The actual data variables
  const [questions, setQuestions] = useState(projectData.questions ?? [])
  const [multipleChoice, setMultiplechoice] = useState(projectData.multipleChoice ?? [])
  const [requirements, setRequirements] = useState(projectData.requirements ?? [])
  const [discussions, setDiscussions] = useState(projectData.discussions ?? [])


  //Update the questions array, again -> using ... because rerender wont trigger otherwise
  const updateQuestions = (value, index) => {
      let tmpQuestions = questions;
      if(!tmpQuestions[index]) tmpQuestions[index] = {value: '', yes: [], no: []}
      tmpQuestions[index].value = value;
      setQuestions([...tmpQuestions])
  }

  //Same as above only with extra if function since this array contains objects
  //this means you can't just set x[index].quesion = or you'd get an error
  const updateMultiplechoice = (value, index) => {
    let tmpQuestions = multipleChoice;
    if(!tmpQuestions[index]) tmpQuestions[index] = {question: value, options: [{value: '', count: 0}, {value: '', count: 0}], answers: []};
    else tmpQuestions[index].question = value;
    setMultiplechoice([...tmpQuestions])
  }

  //Updating the options of a certain question
  const updateMultipleChoiceOption = (value, questionIndex, optionIndex) => {
    let tmpQuestions = multipleChoice;
    if(!tmpQuestions[questionIndex].options[optionIndex]) tmpQuestions[questionIndex].options[optionIndex] = {value: '', count: 0}
    else tmpQuestions[questionIndex].options[optionIndex].value = value;
    setMultiplechoice([...tmpQuestions])
  }

  //Works like the UpdateMultipleChoice but for requirements
  //Could've used that function but it's better practice not to
  const updateRequirements = (value, index, type = 'name') => {
    let tmpQuestions = requirements;
    if(!tmpQuestions[index]) tmpQuestions[index] = {name: '', count: 1};
    else tmpQuestions[index][type] = value;
    setRequirements([...tmpQuestions])
  }

  //same as above but for discussions
  const updateDiscussions = (value, index, type = 'name') => {
    let tmpQuestions = discussions;
    if(!tmpQuestions[index]) tmpQuestions[index] = {name: '', url: ''};
    else tmpQuestions[index][type] = value;
    setDiscussions([...tmpQuestions])
  }

  //not much to validate here except for cleaning up empty values
  const cleanupQuestions = () => questions.filter(question => question.value.replace(' ', '').length > 3);
  const cleanupMultipleChoice = () => setMultiplechoice(multipleChoice.filter(choice => choice.question.replace(' ', '').length > 3))
  const cleanupRequirements = () => setRequirements(requirements.filter(requirement => requirement.name.replace(' ', '').length > 3))
  const cleanupDiscussion = () => setDiscussions(discussions.filter(discussion => discussion.name.replace(' ', '').length > 3 && discussion.url.replace(' ', '').length > 3 ))
  
  //Summary of all cleanups just to make sure before submitting
  const validation = () => {
    cleanupQuestions();
    cleanupMultipleChoice();
    cleanupRequirements();
    cleanupDiscussion();
    mergeProjectData({
      questions: questions,
      multipleChoice: multipleChoice,
      requirements: requirements,
      discussions: discussions,
    })
    return true;
  }

  return useObserver(() => (
    <div className={style.wrap}>
      
      <p className={`${parentStyle.inputTitle}`}>Wil je nog dingen te weten komen?</p>
      <p className={`${parentStyle.inputSubtitle} ${style.subtitle}`}>Hier kan je kiezen uit verschillende opties om een korte bevraging(en) te maken of in aanraking te komen met potentiele vrijwilligers.</p>

      <div className={style.boxWrapper}>

        <div className={style.box}
        onClick={() => {
          if(!allowYesNo) {setAllowYesNo(true); if(questions.length === 0)updateQuestions('', questions.length)} 
          else {setAllowYesNo(false);cleanupQuestions()}}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Ja-nee vraag</p>
            <p className={style.box__detail}>Voor Kleine aftoetsingen</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'/assets/project/placeholder.png'} />
            {allowYesNo ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        
        </div>

        <div className={style.box}
         onClick={() => {
           if(!allowMultipleChoice){
             if(multipleChoice.length === 0)setMultiplechoice([{question: '', options: [{value: '', count: 0}, {value: '', count: 0}],  answers: []}])
                setAllowMultipleChoice(true); }
           else {setAllowMultipleChoice(false);cleanupMultipleChoice()}}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Meerkeuzevraag</p>
            <p className={style.box__detail}>Meerderheid beslist</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'/assets/project/placeholder.png'} />
            {allowMultipleChoice ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        </div>

        <div className={style.box}
        onClick={() => {
          if(!allowRequirements){
            if(requirements.length === 0)setRequirements([{name: '', count: 1}]);
            setAllowRequirements(true);} 
          else {setAllowRequirements(false); cleanupRequirements();}}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Benodigdheden</p>
            <p className={style.box__detail}>Recruiteer of zoek naar materiaal</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'/assets/project/placeholder.png'} />
            {allowRequirements ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        </div>

        <div className={style.box}
        onClick={() => {if(!allowDiscussion){
          setAllowDiscussion(true);
          if(discussions.length === 0)setDiscussions([{name: '', url: ''}])
        } 
        
        else {setAllowDiscussion(false);cleanupDiscussion()}}} >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Discussie</p>
            <p className={style.box__detail}>Link naar conversatieruimte</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'/assets/project/placeholder.png'} />
            {allowDiscussion ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        </div>

      </div>

      {allowYesNo ?
      <article className={style.option}>
        <h2 className={`${style.articleTitle}`}>Ja-nee vragen</h2>
        
        {questions.map((question, index) => {
          return <div key={`Quesion_${index}`}  className={style.inputWrap}>
                    <input 
                    onChange={ e => {updateQuestions(e.currentTarget.value, index)}} 
                    className={parentStyle.input}
                    value={question.value}  
                    type={'text'}
                    placeholder={'Je vraag'}
                    /> 

                  <div onClick={
                    () => {
                      const tmpArray = questions;
                      tmpArray.splice(index, 1)
                      setQuestions([...tmpArray])
                    }
                  } className={style.deleteButton}>X</div>
                </div>
        })}
        <p className={style.addOption} onClick={() => updateQuestions('', questions.length)}> <span>+</span> Vraag toevoegen</p>
      </article>
      : '' }

      {allowMultipleChoice ? 
      <article className={style.option}>
        <h2 className={`${style.articleTitle}`}>Meerkeuzevragen</h2>

        {multipleChoice.map((choice, questionIndex) => {
          return <div key={`choice_${questionIndex}`} className={`${style.allowMultipleChoice} ${style.inputWrap}`}>
                      <input 
                      onChange={e => updateMultiplechoice(e.currentTarget.value, questionIndex)}
                      className={parentStyle.input}
                      value={choice.question}  
                      type={'text'}
                      placeholder={'Je vraag'}
                      />

                      <div onClick={
                        () => {
                          const tmpArray = multipleChoice;
                          tmpArray.splice(questionIndex, 1)
                          setMultiplechoice([...tmpArray])
                        }
                      } className={style.deleteButton}>X</div>

                      <ul className={style.multipleChoice__list}>
                      {choice.options.map((option, optionIndex) => {
                          return <li key={`Choice_Option_${questionIndex}__${optionIndex}`}  className={style.inputWrap}>
                          <input 
                          onChange={ e => {updateMultipleChoiceOption(e.currentTarget.value, questionIndex, optionIndex)}} 
                          className={parentStyle.input}
                          value={option.value}  
                          type={'text'}
                          /> <div onClick={
                            () => {
                              const tmpArray = multipleChoice;
                              if(tmpArray[questionIndex].options.length > 2){
                              tmpArray[questionIndex].options.splice(optionIndex, 1)
                              setMultiplechoice([...tmpArray])}
                            }
                          } className={style.deleteButton}>X</div></li>
                      })}

                      <li className={style.multipleChoice__list__lastItem}><p className={style.addOption} 
                        onClick={() => updateMultipleChoiceOption('', questionIndex, choice.options.length)}> 
                        <span>+</span> optie toevoegen</p>
                      </li>
                      </ul>
          </div>
          })}
          <p className={style.addOption} onClick={() => updateMultiplechoice('', multipleChoice.length)}> <span>+</span> Vraag toevoegen</p>
      </article>
      : '' }

      {allowRequirements ? 
      <article className={`${style.option} ${style.requirements}`}>
        <h2 className={`${style.articleTitle}`}>Benodigdheden / recruiteer </h2>

        {
          requirements.map((requirement, index) => {
            return (<div className={style.requirementsField} key={`requirements_${index}`}>

                        <label className={`${style.midsection__item}`} htmlFor={`reqName${index}`}>
                                <p className={`${parentStyle.inputSubtitle}`}>Naam:</p>
                                <input min={1}
                                onChange={e => updateRequirements(e.currentTarget.value, index)}
                                className={`${parentStyle.input}`} 
                                name={`reqName${index}`} 
                                id={`reqName${index}`} 
                                value={requirement.name}  
                                type={'text'}/>
                        </label>

                        <label className={`${style.midsection__item}`} htmlFor={`aantal${index}`}>
                                  <p className={`${parentStyle.inputSubtitle}`}>Aantal:</p>
                                  <input min={1}
                                  onChange={e => updateRequirements(e.currentTarget.value, index, 'count')}
                                  className={`${parentStyle.input}`} 
                                  name={`aantal${index}`} 
                                  id={`aantal${index}`} 
                                  value={requirement.count}  
                                  type={'number'}/>
                        </label>

                        <div onClick={
                        () => {
                          const tmpArray = requirements;
                          tmpArray.splice(index, 1)
                          setRequirements([...tmpArray])
                        }
                      } className={style.deleteButton}>X</div>
                    </div>)
          })
        }
        <p className={style.addOption} 
                        onClick={() => updateRequirements('', requirements.length)}> 
                        <span>+</span> Benodigdheid toevoegen</p>
      </article>
      : '' }

      {allowDiscussion ? 
      <article className={style.option}>
        <h2 className={`${style.articleTitle}`}>Discussie</h2>


        {
          discussions.map((discussion, index) => {
            return (<div className={style.discussionField} key={`requirements_${index}`}>

                        <label className={`${style.midsection__item}`} htmlFor={`aantal${index}`}>
                                  <p className={`${parentStyle.inputSubtitle}`}>Naam:</p>
                                  <input min={1}
                                  onChange={e => updateDiscussions(e.currentTarget.value, index)}
                                  className={`${parentStyle.input}`} 
                                  name={`aantal${index}`} 
                                  id={`aantal${index}`} 
                                  value={discussion.name}  
                                  type={'text'}/>
                        </label>

                        <label className={`${style.midsection__item}`} htmlFor={`reqName${index}`}>
                                <p className={`${parentStyle.inputSubtitle}`}>Url:</p>
                                <input min={1}
                                onChange={e => updateDiscussions(e.currentTarget.value, index, 'url')}
                                className={`${parentStyle.input}`} 
                                name={`reqName${index}`} 
                                id={`reqName${index}`} 
                                value={discussion.url}  
                                type={'text'}/>
                        </label>

                        <div onClick={
                        () => {
                          const tmpArray = discussions;
                          tmpArray.splice(index, 1)
                          setDiscussions([...tmpArray])
                        }
                      } className={style.deleteButton}>X</div>
                    </div>)
          })
        }
        <p className={style.addOption} 
            onClick={() => updateDiscussions('', discussions.length)}> 
            <span>+</span> Discussie toevoegen</p>


      </article>
      : '' }

      <NavButtons errors={errors} validate={validation} currentStep={navData.currentStep} STEPS={navData.STEPS}/>
    </div>
  ));
};

export default CreateProjectFormStepFour;