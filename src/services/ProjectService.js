import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 
import 'firebase/app'; 
import firebaseParent from 'firebase/app'; 
import { v4 } from "uuid";
import Project, { projectConverter } from "../models/Project";

class ProjectService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.fieldValue = firebaseParent.firestore.FieldValue;
    this.storage = firebase.storage();
  }

  //Simple query to get all projects that have been approved
  getArchivedProjects = async (onChange) => {
    this.db
      .collection('projects')
      .where("archived", "==", true)
      .withConverter(projectConverter)
      .onSnapshot(async snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === "added" || change.type === "removed") {
            const projectObj = change.doc.data();
            onChange([change.type, projectObj]);
          }
        });
      });
  };

  //Query to only get the projects that have not been approved yet
  getProjects = async (onChange) => {
    this.db
      .collection('projects')
      .where("archived", "==", false)
      .withConverter(projectConverter)
      .onSnapshot(async snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === "added" || change.type === "removed") {
            const projectObj = change.doc.data();
            onChange([change.type, projectObj]);
          }
        });
      });
  };

  //Query to get all projects at once
  //once they are fetched they're added to the store with the onChange
  getAllProjects = async (onChange) => {
    this.db
      .collection('projects')
      .withConverter(projectConverter)
      .onSnapshot(async snapshot => {
        snapshot.docChanges().forEach(async change => {
          //Looking what type it is and sending it to the other function
          //the type is used to know if we have to add/edit or delete from the store
          if (change.type === "added" || change.type === "removed" || change.type === 'modified') {
            const projectObj = change.doc.data();
            onChange([change.type, projectObj]);
          }
        });
      });
  };

  //remove a project completely with the files linked to it
  removeProject = async (project) => {

    this.db
    .collection("projects")
    .doc(project.id)
    .delete();

    //Folders can't be removed from firebase so we have to delete file by file
    var storageRef = this.storage.ref();
    var listRef = storageRef.child(`projects/${project.ownerID}/${project.id}`);
    // Find all the prefixes and items.
    listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.delete()
          .then(() => {
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
          // All the items under listRef.
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  //Update any value of project 
  addToProjectArray = (projectID, array, values) => {
    let projectRef = this.db.collection("projects").doc(projectID);
    projectRef.update({
        [array]: this.fieldValue.arrayUnion(...values)
    });
  }

  //get a project by id
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

  //Begin upload process of a project, this happens with multiple functions
  uploadProject = async (data, userID) => {
    
    //Prepare a new document and get the id of it
    const docRef = this.db.collection("projects").doc();
    const docId = docRef.id;
    const project = new Project(data);
    

    //Set the owner, upload the images and description
    project.setOwnerID(userID)
    project.changeID(docId)
    await this.uploadImages(data.pictures, docId, userID)
    .then(pics => project.setPictures(pics));
    return await this.uploadDescription(data.description, docId, userID)
    .then(res => project.setDescription(res))
    .then(() => {
                  //Once the description is uploaded, upload the rest of the data
                  docRef
                      .withConverter(projectConverter)
                      .set(project)
                      .then((result) => {
                        if(data.coWorkerRequests) {
                          data.coWorkerRequests.forEach(coWorker => {                             
                          this.db.collection("users").where('mail', '==', coWorker.toLowerCase())
                          .get()
                          .then((querySnapshot) => {
                              querySnapshot.forEach((doc) => {
                                  doc.ref.update({ notifications: this.fieldValue.arrayUnion({type: 'coRequest', title: data.title, projectID: docId}) });
                              });
                          })
                          })
                        }
                      })
                      .catch(function(error) {
                          console.error("Error writing document: ", error);
                      });
                })
                .then(() => {
                return project;
                })

    
  }

  //Upload all images from an array to the storage & return the download urls
  //used this type of promise because it needs to wait before uploading the project untill
  //all images are uploaded
  uploadImages = async (images, projectID, userID) => {
    let Urls = [];
    //Loop through all images

    return new Promise(async (resolve) => {
      if(images.length === 0) resolve({url: '/assets/project/cardPlaceholderLarge.jpg', path: false})
      else {
        await images.forEach((async (image, index) => {
    
          const storageRef = this.storage.ref();
          const name = v4();
    
          //convert then upload
          await this.blobToBase64(image).then(async res => {
    
            let ImageRef = storageRef.child(`projects/${userID}/${projectID}/${name}`).putString(res, 'data_url');
            await ImageRef.on("state_changed", {
              error: error => console.log(error),
              complete: () => {
                  //once you have the url push it to the array to collect them & push later
                  ImageRef.snapshot.ref.getDownloadURL()
                  .then(downloadURL => {

                    Urls.push({url: downloadURL, path: `projects/${userID}/${projectID}/${name}`})
                    if(index === images.length-1)resolve(Urls)
                  });
              }
            });
    
          })
        }))
      }
    })
    
  }

  //uploading the given description to a file in the storage
  uploadDescription = (file, projectID, userID) => {
      //Create a reference and push the data, once its done, return the url of the file
      const storageRef = this.storage.ref();

        let promise = new Promise(function(resolve, reject) {
          storageRef.child(`projects/${userID}/${projectID}/description.txt`).putString(file)
        .then((snapshot) => {
          const url = (snapshot.ref.getDownloadURL());
          resolve(url);
        });
        });
        return promise
        //return await descriptionRef
      
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
    let starsRef = storageRef.child(`projects/${userID}/${projectID}/description.txt`);
    // Get the download URL
    starsRef.getDownloadURL()
    .then((data => {
      fetch(data)
      .then(function(response) {
        response.text().then(function(text) {
        });
      });
    }))
    .catch((error) => {
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
  }

  //converting the description txt file to something that we can read with javascript
  convertDescriptionToData = async (url, setDescription) => {
    //Send a request to the url to get the txt file, update the file with the function once it's fetched
    try{
    let descriptionFile = new XMLHttpRequest();
    descriptionFile.open("GET",url,true);
    descriptionFile.send();
    descriptionFile.onreadystatechange = () => {
        if (descriptionFile.readyState === 4 && descriptionFile.status === 200) {
          setDescription(descriptionFile.responseText);
        }
     }}
     catch (e) {}
  }

  //simple upvote of project by pushing the user's id to it
  upvoteProject = (id, user) => {
    let projectRef = this.db.collection('projects').doc(id);
    projectRef.update({
      upvotes: this.fieldValue.arrayUnion(user.id)
    });

    let userRef = this.db.collection('users').doc(user.id);
    userRef.update({
          'statistics.upvotes': this.fieldValue.arrayUnion(id)
      });
  }

  //simple downvote of project by pushing the user's id to it
  downvoteProject = (id, user) => {
    let projectRef = this.db.collection('projects').doc(id);
    projectRef.update({
      downvotes: this.fieldValue.arrayUnion(user.id)
    });

    let userRef = this.db.collection('users').doc(user.id);
    userRef.update({
          'statistics.downvotes': this.fieldValue.arrayUnion(id)
      });
  }

  //Upload a commment to the database by pushing the data to the array
  uploadComment = (projectId, commentData) => {
    let projectRef = this.db.collection('projects').doc(projectId);
    projectRef.update({
      comments: this.fieldValue.arrayUnion(commentData)
    });

  }
  //same as above but remove from the array
  deleteComment = (projectId, comment) => {
    console.log('test')
    let projectRef = this.db.collection('projects').doc(projectId);
    projectRef.update({
      comments: this.fieldValue.arrayRemove(comment)
    })
  }
  //sending a notification to share the contact details with the other person
  sendContactDetails = (ownerId) => {
    let projectRef = this.db.collection('users').doc(ownerId);
    projectRef.update({ notifications: this.fieldValue.arrayUnion({type: 'participation', title: 'Hallo, ik heb interesse om mee te werken aan dit project, u kan mij op onderstaande manieren berijken', mail: this.auth.currentUser.email}) })
  }

  //update the yes-no question object on the array
  voteYesNo = (projectId, questions) => {
    let projectRef = this.db.collection('projects').doc(projectId);
    projectRef.update({ questions: questions });
  }

  //update the multiplechoice question object
  voteMultiplechoice = (projectId, questionObj) => {
    let projectRef = this.db.collection('projects').doc(projectId);
    projectRef.update({ multipleChoice: questionObj });
  }

  //set approval to true of the project
  approveProject = (projectId) => {
    let projectRef = this.db.collection('projects').doc(projectId);
    projectRef.update({ approved: true });
  }
}

export default ProjectService;
