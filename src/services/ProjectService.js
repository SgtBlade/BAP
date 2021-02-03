import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 
import { v4 } from "uuid";
import Project, { projectConverter } from "../models/Project";

class ProjectService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }

  getProjectById = async (id) => {
    //Basic database query to get project and convert to project object
    let project = await this.db
    .collection("projects")
    .doc(id)
    .withConverter(projectConverter)
    .get();
    //await for the data of the query above and take the data
    project = await project.data();
    //Update requests of this type
    return project;
  }

  uploadProject = async (data, userID) => {
    
    //Prepare a new document and get the id of it
    const docRef = this.db.collection("projects").doc();
    const docId = docRef.id;
    const project = new Project(data);

    //Set the owner, upload the images and description
    project.setOwnerID(userID)
    await this.uploadImages(data.pictures, docId, userID)
    .then(pics => project.setPictures(pics))
    .then(async () => 
                await this.uploadDescription(data.description, docId, userID)
                .then((value) => project.setDescription(value))
                .then(() => {
                  //Once the description is uploaded, upload the rest of the data
                  docRef
                      .withConverter(projectConverter)
                      .set(project)
                      .then(function() {
                        console.log("Document successfully written!");
                        console.log(project)
                      })
                      .catch(function(error) {
                          console.error("Error writing document: ", error);
                      });
                })
                .then(() => {
                  console.log(project)
                  
                return true;
                }))

    return true;

    
  }

  uploadImages = async (images, projectID, userID) => {
    let Urls = [];
    //Loop through all images
    await images.forEach((async image => {
    
      const storageRef = this.storage.ref();
      const name = v4();
      //Getting the file type
      const imageType = image.name.split('.')[image.name.split('.').length]

      //convert then upload
      await this.blobToBase64(image).then(async res => {

        let ImageRef = storageRef.child(`projects/${userID}/${projectID}/${name}.${imageType}`).putString(res, 'data_url');
        await ImageRef.on("state_changed", {
          error: error => console.log(error),
          complete: () => {
              //once you have the url push it to the array to collect them & push later
              ImageRef.snapshot.ref.getDownloadURL()
              .then(downloadURL => {
                Urls.push(downloadURL)
              });
          }
        });

      })
    }))
    return await Urls;
    
  }

  uploadDescription = async (file, projectID, userID) => {
      //Create a reference and push the data, once its done, return the url of the file
      const storageRef = this.storage.ref();
        let descriptionRef = await storageRef.child(`projects/${userID}/${projectID}/description.txt`).putString(file)
        .then((snapshot) => {
          const url = (snapshot.ref.getDownloadURL());
          return url;
        });
        return await (descriptionRef)
      
  }

  //convert blob to base64, this is used to upload pictures
  blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  
  //CURRENTLY UNUSED DELETE LATER
  getDescriptionDownloadData = (userID, projectID) => {

    const storageRef = this.storage.ref();
    var starsRef = storageRef.child('projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/description.txt');
    // Get the download URL
    starsRef.getDownloadURL()
    .then((data => {
      fetch(data)
      .then(function(response) {
        response.text().then(function(text) {
          console.log(text);
        });
      });
    }))
  
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
        default:
          // User canceled the upload
          break;
      }
    });


    /*
    const ref = this.storage.ref(`projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/description.txt`);
    ref.getDownloadURL().subscribe(data => {
      fetch(data)
      .then(function(response) {
        response.text().then(function(text) {
          console.log(text);
        });
      });
    });*/
  }

  convertDescriptionToData = async (url, setDescription) => {
    //Send a request to the url to get the txt file, update the file with the function once it's fetched
    var descriptionFile = new XMLHttpRequest();
    descriptionFile.open("GET",url,true);
    descriptionFile.send();
    descriptionFile.onreadystatechange = () => {
        if (descriptionFile.readyState === 4 && descriptionFile.status === 200) {
          setDescription(descriptionFile.responseText);
        }
     }
  }
}

export default ProjectService;
