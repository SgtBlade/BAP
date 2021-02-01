import React, {useState} from 'react'
import { useObserver } from "mobx-react-lite";
import parentStyle from "../createProjectForm.module.css";
import style from "./stepFour.module.css";

const CreateProjectFormStepFour = ({removeFromErrorArray, addToErrorArray, errors, navData}) => {
  //The booleans to know if we need to show the "form" to add the things the user want
  const [allowYesNo, setAllowYesNo] = useState(false);
  const [allowMultipleChoice, setAllowMultipleChoice] = useState(true);
  const [allowRequirements, setAllowRequirements] = useState(false);
  const [allowDiscussion, setAllowDiscussion] = useState(false);

  //The actual data variables
  const [questions, setQuestions] = useState([])
  const [multipleChoice, setMultiplechoice] = useState([{question: 'testing', options: ['een', 'twee']}])

  //Update the questions array, again -> using ... because rerender wont trigger otherwise
  const updateQuestions = (value, index) => {
      let tmpQuestions = questions;
      tmpQuestions[index] = value;
      setQuestions([...tmpQuestions])
  }

  //Same as above only with extra if function since this array contains objects
  //this means you can't just set x[index].quesion = or you'd get an error
  const updateMultiplechoice = (value, index) => {
    let tmpQuestions = multipleChoice;
    if(!tmpQuestions[index]) tmpQuestions[index] = {question: value, options: ['']};
    else tmpQuestions[index].question = value;
    console.log(tmpQuestions)
    setMultiplechoice([...tmpQuestions])
  }

  //Updating the options of a certain question
  const updateMultipleChoiceOption = (value, questionIndex, optionIndex) => {
    let tmpQuestions = multipleChoice;
    tmpQuestions[questionIndex].options[optionIndex] = value;
    setMultiplechoice([...tmpQuestions])
  }

  return useObserver(() => (
    <div className={style.wrap}>
      
      <p className={`${parentStyle.inputTitle}`}>Wil je nog dingen te weten komen?</p>
      <p className={`${parentStyle.inputSubtitle}`}>Hier kan je kiezen uit verschillende opties om een korte bevraging(en) te maken of in aanraking te komen met potentiele vrijwilligers.</p>

      <div className={style.boxWrapper}>

        <div className={style.box}
        onClick={() => {
          if(!allowYesNo) {setAllowYesNo(true); if(questions.length === 0)updateQuestions('', questions.length)} 
          else setAllowYesNo(false)}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Ja-nee vraag</p>
            <p className={style.box__detail}>Voor Kleine aftoetsingen</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'./assets/project/placeholder.png'} />
            {allowYesNo ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        
        </div>

        <div className={style.box}
         onClick={() => {if(!allowMultipleChoice)setAllowMultipleChoice(true); else setAllowMultipleChoice(false)}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Meerkeuzevraag</p>
            <p className={style.box__detail}>Meerderheid beslist</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'./assets/project/placeholder.png'} />
            {allowMultipleChoice ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        </div>

        <div className={style.box}
        onClick={() => {if(!allowRequirements)setAllowRequirements(true); else setAllowRequirements(false)}} 
        >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Benodigdheden</p>
            <p className={style.box__detail}>Recruiteer of zoek naar materiaal</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'./assets/project/placeholder.png'} />
            {allowRequirements ?
            <p className={`${style.box__button} ${style.red}`}>verwijderen</p>
            :
            <p className={`${style.box__button}`}>Toevoegen</p>
            }
        </div>

        <div className={style.box}
        onClick={() => {if(!allowDiscussion)setAllowDiscussion(true); else setAllowDiscussion(false)}} >
            <div className={style.box__decoration}></div>
            <p className={style.box__info}>?</p>
            <p className={style.box__title}>Discussie</p>
            <p className={style.box__detail}>Link naar conversatieruimte</p>
            <img alt={'placeholder'} className={style.box__placeholder} width={193} height={94} src={'./assets/project/placeholder.png'} />
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
                    value={question}  
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
                          value={option}  
                          type={'text'}
                          /> <div onClick={
                            () => {
                              const tmpArray = multipleChoice;
                              if(tmpArray[questionIndex].options.length > 1){
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
      <article className={style.option}>
        <h2 className={`${style.articleTitle}`}>Benodigdheden / recruiteer </h2>
      </article>
      : '' }

      {allowDiscussion ? 
      <article className={style.option}>
        <h2 className={`${style.articleTitle}`}>Discussie </h2>
      </article>
      : '' }

    </div>
  ));
};

export default CreateProjectFormStepFour;