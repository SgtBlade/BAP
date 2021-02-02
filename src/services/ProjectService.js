import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 
import User, { userConverter } from "../models/User";
import { RESPONSE } from "../consts/responses";
import { v4 } from "uuid";
import Project from "../models/Project";

class ProjectService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
    this.test = {
      allowComments: true,
      allowQuestions: false,
      contact: {mail: "mijnEmail.@gmail.com", phone: "032421 12 42"},
      deadline: true,
      deadlineDate: "2021-02-18",
      description: `<h1 class="ql-align-justify"><strong>Lorem's story</strong></h1><p class="ql-align-justify"><br></p><p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tristique tempus. Fusce iaculis urna ut lacus suscipit, vulputate condimentum ligula ullamcorper. Suspendisse ac mollis orci. Vestibulum sagittis sapien ut interdum consectetur. Nunc bibendum sodales ex, vitae ultricies libero dapibus ac. Proin porttitor, lacus vitae lacinia auctor, nulla sapien egestas sapien, id sodales elit quam vitae sapien. Nullam at lectus sem. Proin quis tellus vel elit auctor sodales a id urna.</p><p class="ql-align-justify">Sed ut augue dignissim quam porta lobortis. Fusce blandit imperdiet sapien id semper. Nullam vulputate justo id diam finibus euismod. Curabitur nisl odio, convallis aliquet libero id, viverra feugiat turpis. Aenean sed pretium dui. Nulla at nulla eget est consequat maximus vitae nec dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p class="ql-align-justify">Phasellus efficitur est at lectus euismod, a venenatis metus placerat. Vivamus sagittis nibh est, eget malesuada odio molestie dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pulvinar vehicula arcu, sed suscipit elit pharetra vel. Vestibulum eleifend mattis magna non elementum. Nunc ut augue vestibulum, laoreet nisi at, ultrices turpis. In porta pretium diam, sit amet lacinia neque tempor a. Cras placerat eleifend convallis.</p><p class="ql-align-justify">Proin ac varius urna, sit amet dictum neque. Integer et enim lectus. Fusce arcu augue, convallis eu enim sit amet, pretium scelerisque velit. Suspendisse euismod lacinia ante, sed semper libero. Sed rutrum finibus est, et tincidunt nisi dictum finibus. Pellentesque pretium tortor in rutrum sodales. Nullam luctus sed odio vel pretium. Etiam rhoncus volutpat sapien sit amet accumsan. Suspendisse feugiat a turpis ut semper. Aenean condimentum condimentum dolor, id aliquam sem finibus sed. Nulla ac ullamcorper nisi, eget congue odio. Cras ac orci sed diam elementum interdum ut id tortor. Integer auctor justo lacus, sed luctus odio posuere vitae.</p><p><br></p><p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tristique tempus. Fusce iaculis urna ut lacus suscipit, vulputate condimentum ligula ullamcorper. Suspendisse ac mollis orci. Vestibulum sagittis sapien ut interdum consectetur. Nunc bibendum sodales ex, vitae ultricies libero dapibus ac. Proin porttitor, lacus vitae lacinia auctor, nulla sapien egestas sapien, id sodales elit quam vitae sapien. Nullam at lectus sem. Proin quis tellus vel elit auctor sodales a id urna.</p><p class="ql-align-justify">Sed ut augue dignissim quam porta lobortis. Fusce blandit imperdiet sapien id semper. Nullam vulputate justo id diam finibus euismod. Curabitur nisl odio, convallis aliquet libero id, viverra feugiat turpis. Aenean sed pretium dui. Nulla at nulla eget est consequat maximus vitae nec dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p class="ql-align-justify">Phasellus efficitur est at lectus euismod, a venenatis metus placerat. Vivamus sagittis nibh est, eget malesuada odio molestie dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pulvinar vehicula arcu, sed suscipit elit pharetra vel. Vestibulum eleifend mattis magna non elementum. Nunc ut augue vestibulum, laoreet nisi at, ultrices turpis. In porta pretium diam, sit amet lacinia neque tempor a. Cras placerat eleifend convallis.</p><p class="ql-align-justify">Proin ac varius urna, sit amet dictum neque. Integer et enim lectus. Fusce arcu augue, convallis eu enim sit amet, pretium scelerisque velit. Suspendisse euismod lacinia ante, sed semper libero. Sed rutrum finibus est, et tincidunt nisi dictum finibus. Pellentesque pretium tortor in rutrum sodales. Nullam luctus sed odio vel pretium. Etiam rhoncus volutpat sapien sit amet accumsan. Suspendisse feugiat a turpis ut semper. Aenean condimentum condimentum dolor, id aliquam sem finibus sed. Nulla ac ullamcorper nisi, eget congue odio. Cras ac orci sed diam elementum interdum ut id tortor. Integer auctor justo lacus, sed luctus odio posuere vitae.</p><p><br></p>`,
      discussions: [],
      location: "Ghent",
      multipleChoice: [],
      personalIntroduction: "Ik heb geen idee hoe menzen mij moeten leren kennen",
      pictures: [],
      previewText: "Dit is de korte beschrijving die maximum 120 woorden mag bevatten amar ik weet niet meer wat te zeggen oh kijk 120 woord",
      publicOwner: "miguel de pelsmaeker",
      questions:  ["De ja-neen vraag", "Nog een ja-neen vraag"],
      requirements: [],
      tags: [],
      title: "This is the project title"}
  }


  uploadProject = async (data) => {
    //const docRef = this.dp.collection("projects").doc();
    //const docId = docRef.id;
    
    const project = new Project(this.test);

    project.setPictures(this.uploadImages(data.pictures))
    this.uploadDescription(data.description, 'projectID')
    .then((value) => project.setDescription(value))
    .then(() => {

      //console.log(project)
      console.log(project.description)
    })
    .then(() => {
      //console.log(data)
    })
    /*
    docRef.set(data)
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });*/

    
  }

  uploadImages = async (images, projectID) => {
    let Urls = [];
    await images.forEach((image => {
    
      const storageRef = this.storage.ref();
      const name = v4();
      const imageType = image.name.split('.')[image.name.split('.').length]

      this.blobToBase64(image).then(res => {

        let ImageRef = storageRef.child(`${5}/${projectID}/${name}.${imageType}`).putString(res, 'data_url');
        ImageRef.on("state_changed", {
          error: error => console.log(error),
          complete: () => {
              ImageRef.snapshot.ref.getDownloadURL()
              .then(downloadURL => {
                Urls.push(downloadURL)
              });
          }
        });

      });

    }))

    return Urls;
    
    
  }

  uploadDescription = async (file, projectID) => {
      
      const storageRef = this.storage.ref();
        let descriptionRef = await storageRef.child(`${5}/${5}/description.txt`).putString(file)
        .then((snapshot) => {
          const url = (snapshot.ref.getDownloadURL());
          return url;
        });
        return await (descriptionRef)
      
  }

  blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

}

export default ProjectService;
