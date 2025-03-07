import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Select from 'react-select';
import parentStyle from "../createProjectForm.module.css";
import TAGS from "../../../consts/tags";
import style from "./stepOne.module.css";
import { useStores } from "../../../hooks/useStores";
import Compressor from "compressorjs";
import { RESPONSE } from "../../../consts/responses";
import LOCATIONS from '../../../consts/locations'
import NavButtons from "../navButtons/navButtons";


const CreateProjectFormStepOne = ({
  removeFromErrorArray,
  addToErrorArray,
  errors,
  navData,
  mergeProjectData,
  projectData,
}) => {
  const { uiStore } = useStores();
  const [projectOwnerTmp, SetProjectOwnerTmp] = useState("");

  //Data required for the project
  const [projectName, setProjectName] = useState( projectData.title ? projectData.title : "" );
  const [budget, setBudget] = useState( projectData.budget ? projectData.budget : "0" );
  const [tags, setTags] = useState(projectData.tags ? projectData.tags : []);
  const [pictures, setPictures] = useState( projectData.pictures ? projectData.pictures : [] );
  const [owner, setOwner] = useState( projectData.owner ? projectData.owner : `${uiStore.currentUser.name} ${uiStore.currentUser.surname}` );
  const [preview, setPreview] = useState( projectData.previewText ? projectData.previewText : "" );
  const [location, setLocation] = useState( projectData.location ? projectData.location : "" );
  const [enableCoWorkers, setEnableCoWorkers] = useState(projectData.enableCoWorkers ? true : false)
  const [coWorkers, setCoWorkers] = useState(projectData.coWorkers ?? [''])

  let tagValues = [];
  const handleTagAdd = async (e) => {
    //Check if the value is valid, does not already include and the array with the tags is shorter than 5
    if (
      tagValues.includes(e.currentTarget.value) &&
      !tags.includes(e.currentTarget.value) &&
      tags.length < 5
    )
      setTags([...tags, e.currentTarget.value]);
    if (e.currentTarget.value) e.currentTarget.value = "";
    if (errors.value["tag"]) removeFromErrorArray("tag");
  };

  //Collection of all validations to be used for when clicking next step
  const validation = async () => {
    validateProjectName();
    validateBudget();
    validateTag();
    validateOwner();
    //validatePictures();
    validatePreview();
    validateLocation();
    validatecoWorkers();
    if (Object.keys(errors.value).length === 0) {
      mergeProjectData({
        title: projectName,
        budget: budget,
        tags: tags,
        pictures: pictures,
        publicOwner: owner,
        previewText: preview,
        location: location,
        coWorkerRequests: enableCoWorkers? coWorkers : false,
      });
      return true;
    } else return false;
  };

  //Remove if the remove button is clicked
  const removeTag = async (el) => {
    const tmpTags = tags.filter((item) => item !== el);
    setTags(tmpTags);
    validateTag(tmpTags);
  };

  //initialising the references
  let pictureRef = null;
  let ownerRef = null;
  const handleChangePhotoButton = (e) => { e.preventDefault(); pictureRef.click(); };

  //Prepping the image to an uploadable type of file
  const handlePictureUpload = async (e) => {
    //check if not more than 5 images yes
    if (pictures.length < 5) {
      const target = e.currentTarget;
      const file = target.files.item(0);

      //checking if there actually is a new file uploaded
      if (target.files && file) {
        //setting the filesize to MB
        const fileSize = target.files[0].size / 1024 / 1024;
        const fileType = file["type"];
        //List of accepted filetypes, add here if there's any other type you want
        const validImageTypes = ["image/jpeg", "image/png"];

        //Check if the right type of file has been uploaded
        if (!validImageTypes.includes(fileType)) {
          //send an alert message, clear the uplaoded file & validate
          alert(RESPONSE.NotAnImage);
          e.currentTarget.value = "";
          validatePictures(pictures.pop());
          return;
        } else if (fileSize > 5000) alert(RESPONSE.fileSizeOver5MB);
        else {
          new Compressor(file, {
            quality: 0.5,
            maxWidth: 663,
            maxHeight: 372,
            success(result) {
              setPictures([...pictures, result]);
              validatePictures(["empty"]);
            },
            error(err) {
              console.log(err.message);
            },
          });
        }
      }
    }
  };

  //All validations have a data option because the useState would not update fast enough,
  //this way I can give the e.currentTarget.value with it where it is needed

  //validation functions:
  const validateProjectName = (data = projectName) => {
    if (data === "") addToErrorArray("projectName", RESPONSE.NoprojectName);
    else if (errors.value["projectName"]) removeFromErrorArray("projectName");
  };

  //Check the limits of the budget & give the appropriate response
  const validateBudget = (data = budget) => {
    if (data > 3000) addToErrorArray("budget", RESPONSE.budgetTooHigh);
    else if (data === "" || data < 0)
      addToErrorArray("budget", RESPONSE.NoBudget);
    else if (errors.value["budget"]) removeFromErrorArray("budget");
  };

  //Check the amount of tags by using an array length function
  const validateTag = (data = tags) => {
    if (data.length === 0) addToErrorArray("tag", RESPONSE.NoTags);
    else if (errors.value["tag"]) removeFromErrorArray("tag");
  };

  //Check which option has been selected, check the input field if other owner is selected
  const validateOwner = (data = projectOwnerTmp) => {
    if (document.querySelector(".projectCheck").checked) {
      if (data === "") addToErrorArray("owner", RESPONSE.NoOwner);
      else if (errors.value["owner"]) removeFromErrorArray("owner");
    } else if (errors.value["owner"]) removeFromErrorArray("owner");
  };

  //Check the amount of pictures by using an array length function
  const validatePictures = (data = pictures) => {
    if (data.length === 0) addToErrorArray("pictures", RESPONSE.NoPictures);
    else if (errors.value["pictures"]) removeFromErrorArray("pictures");
  };
  
  const validatecoWorkers = () => {coWorkers.filter(coWorker => coWorker.replace(' ', '').length > 3 && coWorker.toLowerCase() !== uiStore.currentUser.mail.toLowerCase());}
  //Basic check based on it not being an empty string
  const validatePreview = (data = preview) => {
    if (data === "") addToErrorArray("preview", RESPONSE.NoPreview);
    else if (errors.value["preview"]) removeFromErrorArray("preview");
  };

  //Removing the image if remove is clicked
  const removeImage = async (index) => {
    let tmp = pictures;
    tmp.splice(index, 1);
    //Tripple dot to trigger re-render, without it it doesn't know what has changed
    setPictures([...tmp]);
    validatePictures();
  };

  //Validate if the location field was filled in
  const validateLocation = (data = location) => {
    if (data === "") addToErrorArray("location", RESPONSE.noLocation);
    else if (errors.value["location"]) removeFromErrorArray("location");
  };

  //validate if the given email is not the same as the user
  const updateCoworkers = (value, index) => {
    if(errors.value["coWorker"]) removeFromErrorArray("coWorker");
    if(value.toLowerCase() === uiStore.currentUser.mail.toLowerCase()){value = '';addToErrorArray('coWorker', RESPONSE.coWorkerSameAsUser)}
    let tmpworkers = coWorkers;
    tmpworkers[index] = value;
    setCoWorkers([...new Set(tmpworkers)])
  }

  return useObserver(() => (
    <div className={style.wrap}>
      <label htmlFor={"projectName"}>
        <p className={parentStyle.inputTitleLarge}>Hoe heet je project?</p>
        <p className={parentStyle.inputSubtitle}>
          Zorg voor een goede beschrijvende en unieke naam.
        </p>
        {errors.value["projectName"] ? (
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
            {errors.value["projectName"]}
          </p>
        ) : (
          ""
        )}

        <input
          onBlur={(e) => {
            validateProjectName(e.currentTarget.value);
          }}
          onChange={(e) => {
            setProjectName(e.currentTarget.value);
            if (errors.value["projectName"])
              validateProjectName(e.currentTarget.value);
          }}
          className={parentStyle.input}
          name={"projectName"}
          id={"projectName"}
          value={projectName}
          type={"text"}
        />
      </label>

      <div className={style.midsection}>
        <label className={`${style.midsection__item}`} htmlFor={"budget"}>
          <p className={`${parentStyle.inputTitle} ${parentStyle.white}`}>
            Wat is het budget?
          </p>
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.white}`}>
            Geef hier het budget dat het project moet halen om te slagen.
            Maximum € 3000.
          </p>
          {errors.value["budget"] ? (
            <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
              {errors.value["budget"]}
            </p>
          ) : (
            ""
          )}

          <input
            min={0}
            max={3000}
            onBlur={(e) => validateBudget(e.currentTarget.value)}
            onChange={(e) => {
              setBudget(e.currentTarget.value);
              if (errors.value["budget"]) validateBudget(e.currentTarget.value);
            }}
            className={`${parentStyle.input} ${parentStyle.white} ${parentStyle.blackLetter} ${parentStyle.largeFontSize} ${style.budgetInput}`}
            name={"budget"}
            step={10}
            id={"budget"}
            value={budget}
            type={"number"}
          />
        </label>

        <div className={`${style.midsection__item}`} htmlFor={"tags"}>
          <p className={`${parentStyle.inputTitle} ${parentStyle.white}`}>
            Welke categorieën?
          </p>
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.white}`}>
            Voeg hier
            <strong className={`${parentStyle.blackLetter}`}> 5 </strong>tags
            toe die te maken hebben met je project.
          </p>
          {errors.value["tag"] ? (
            <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
              {errors.value["tag"]}
            </p>
          ) : (
            ""
          )}

          <div className={style.tagCollection}>
            {tags.map((tag) => {
              return (
                <div key={tag} className={style.tag}>
                  <p>{tag}</p>{" "}
                  <span
                    onClick={() => {
                      removeTag(tag);
                    }}
                  >
                    X
                  </span>
                </div>
              );
            })}

            {tags.length < 5 ? (
              <div className={style.selectWrap}>
                <p className={style.tagSelectBoxButton}>+</p>
                <select
                  onBlur={validateTag}
                  className={`${style.tagSelectBox} selectBox`}
                  onChange={async (e) => {
                    handleTagAdd(e);
                  }}
                  name="skills"
                  defaultValue="00"
                >
                  <option disabled value="00">
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {Object.keys(TAGS).map((key, index) => {
                    return (
                      <optgroup
                        key={`Goption_${key}`}
                        label={key
                          .replace("___", " / ")
                          .replace("__", " & ")
                          .replace("_", " ")}
                      >
                        {Object.keys(TAGS[key]).map((seckey, secindex) => {
                          if (seckey !== "Color") {
                            tagValues.push(TAGS[key][seckey]);
                            return (
                              <option
                                key={`${key}${secindex}`}
                                value={TAGS[key][seckey]}
                              >
                                {TAGS[key][seckey]}
                              </option>
                            );
                          } else return false;
                        })}
                      </optgroup>
                    );
                  })}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className={style.projectOwner}>
        <p className={`${parentStyle.inputTitle}`}>Van wie is het project?</p>
        <p className={`${parentStyle.inputSubtitle}`}>
          Geef aan of jij de organisator bent of dit maakt onder naam van.
        </p>
        {errors.value["owner"] ? ( <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}> {errors.value["owner"]} </p> ) : ( "" )}

        <label className={``} htmlFor={"owner"}>
          <input
            checked={
              owner ===
              `${uiStore.currentUser.name} ${uiStore.currentUser.surname}`
                ? true
                : false
            }
            onChange={(e) => {
              setOwner(e.currentTarget.value);
              if (errors.value["owner"]) validateOwner(e.currentTarget.value);
            }}
            className={`${style.projectUser}`}
            name={"owner"}
            id={"owner"}
            value={`${uiStore.currentUser.name} ${uiStore.currentUser.surname}`}
            type={"radio"}
          />
          Ik doe dit onder mijn eigen naam
        </label>

        <label className={``} htmlFor={"owener2"}>
          <input
            onClick={() => ownerRef.focus()}
            onChange={() => {
              setOwner(projectOwnerTmp);
              console.log(owner);
            }}
            className={`projectCheck`}
            name={"owner"}
            id={"owener2"}
            value={""}
            type={"radio"}
          />
          Dit project is onder een groepsnaam / organisatie:
          <input
            onBlur={() => {
              if (projectOwnerTmp === "")
                setOwner(
                  `${uiStore.currentUser.name} ${uiStore.currentUser.surname}`
                );
            }}
            onClick={() =>
              (document.querySelector(".projectCheck").checked = true)
            }
            onChange={(e) => {
              setOwner(e.currentTarget.value);
              SetProjectOwnerTmp(e.currentTarget.value);
            }}
            ref={(input) => (ownerRef = input)}
            className={`${parentStyle.input} projectOwner`}
            name={"owner"}
            value={projectOwnerTmp}
            type={"text"}
          />
        </label>
      
        <label className={``} htmlFor={"CoWorker"}>
          <input
            onChange={() => {setEnableCoWorkers(!enableCoWorkers)}}
            className={`projectCheck`}
            name={"CoWorker"}
            id={"CoWorker"}
            value={""}
            type={"checkbox"}
          />
          Er werken meerdere mensen aan dit project
          <p className={parentStyle.inputDetail}>Enkel mensen met een account kunnen uitgenodigd worden</p>
          {errors.value["coWorker"] ? ( <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}> {errors.value["coWorker"]} </p> ) : ( "" )}
        </label>
      
        
        {enableCoWorkers ?
      <article className={style.option}>
        <h2 style={{display: 'none'}}>Co-workers</h2>
        
        {coWorkers.map((coWorker, index) => {
          return <div key={`coWorker_${index}`}  className={style.inputWrap}>
                    <input 
                    onChange={ e => {updateCoworkers(e.currentTarget.value, index)}} 
                    onBlur={validatecoWorkers}
                    className={parentStyle.input}
                    value={coWorker}  
                    type={'text'}
                    placeholder={'Email'}
                    /> 

                  <div onClick={
                    () => {
                      const tmpArray = coWorkers;
                      tmpArray.splice(index, 1)
                      setCoWorkers([...new Set(tmpArray)])
                    }
                  } className={style.deleteButton}>X</div>
                </div>
        })}
        <p className={style.addOption} onClick={() => updateCoworkers('', coWorkers.length)}> <span>+</span> Medewerker toevoegen</p>
      </article>
      : '' }
      </div>

      <label htmlFor={"images"}>
        <p className={parentStyle.inputTitle}>Afbeeldingen</p>
        <p className={parentStyle.inputSubtitle}>
          Voeg hier max{" "}
          <strong className={`${parentStyle.blackLetter}`}>5</strong>{" "}
          kwaliteitsvolle afbeeldingen van je project toe.
        </p>
        {errors.value["pictures"] ? (
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
            {errors.value["pictures"]}
          </p>
        ) : (
          ""
        )}
        <p className={parentStyle.inputDetail}>
          *De afbeeldingen worden aangepast naar een 16:9 formaat en mogem
          maximum 4 MB zijn
        </p>
        {pictures.length < 5 ? (
          //min 1
          <input
            onChange={handlePictureUpload}
            ref={(input) => (pictureRef = input)}
            style={{ display: "none" }}
            type="file"
            id={"images"}
          />
        ) : (
          ""
        )}
      </label>
      <div className={style.imagesWrapper}>
        {pictures.length < 5 ? (
          <p
            onClick={handleChangePhotoButton}
            className={`${parentStyle.blackLetter} ${style.addPicture}`}
          >
            {" "}
            + VOEG EEN FOTO TOE
          </p>
        ) : (
          ""
        )}
        {pictures.map((image, index) => {
          return (
            <div key={index} className={style.previewImage}>
              <img
                width={"426"}
                height={"240"}
                alt={`Project ${index}`}
                src={URL.createObjectURL(image)}
              />
              <span
                onClick={() => {
                  removeImage(index);
                  validatePictures();
                }}
              >
                X
              </span>
            </div>
          );
        })}
      </div>

      <label className={`${style.midsection__item}`} htmlFor={"introduction"}>
        <p className={`${parentStyle.inputTitle}`}>
          Beschrijf je project in 120 karakters
        </p>
        <p className={`${parentStyle.inputSubtitle}`}>
          Geef hier kort weer waarover het project gaat.
        </p>
        {errors.value["preview"] ? (
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
            {errors.value["preview"]}
          </p>
        ) : (
          ""
        )}
        <p className={parentStyle.inputDetail}>{preview.length}/120</p>

        <textarea
          onBlur={(e) => validatePreview(e.currentTarget.value)}
          onChange={(e) => {
            if (e.currentTarget.value.length <= 120)
              setPreview(e.currentTarget.value);
            if (errors.value["preview"]) validatePreview(e.currentTarget.value);
          }}
          className={`${parentStyle.input}`}
          name={"introduction"}
          id={"introduction"}
          value={preview}
          type={"textarea"}
        />
      </label>

      <label
        className={`${style.midsection__item} ${style.projectOwner}`}
        htmlFor={"location"}
      >
        <p className={`${parentStyle.inputTitle}`}>
          Waar is het project gelegen?
        </p>
        <p className={`${parentStyle.inputSubtitle}`}>
          Geef op in welke stad je project gelegen is.
        </p>
        {errors.value["location"] ? (
          <p className={`${parentStyle.inputSubtitle} ${parentStyle.error}`}>
            {errors.value["location"]}
          </p>
        ) : (
          ""
        )}

        <Select 
        className={`${style.dropdown}`}
        defaultValue={projectData.location ? {label: projectData.location, value: projectData.location} : ''}
        onChange={(e) => setLocation(e.value)}
        options={LOCATIONS}
        name={"location"}
        id={"location"}
        />
      </label>


      
      

      <NavButtons
        errors={errors}
        validate={validation}
        currentStep={navData.currentStep}
        STEPS={navData.STEPS}
      />
    </div>
  ));
};

export default CreateProjectFormStepOne;
