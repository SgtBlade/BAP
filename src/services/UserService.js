import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 
import User, { userConverter } from "../models/User";
//import { v4 } from "uuid";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }


  addUser = async (user, data, changeLoadingTo, updateUser) => {
    const newUser = new User({
      id: user.uid, 
      name: data.name, 
      surname: data.surname,
      mail: user.email,
      bio: data.bio,
    })

    this.addImageToStorage(newUser, data.image, changeLoadingTo, updateUser);
  };

  continueUserCreation = (newUser, result, updateUser, changeLoadingTo) => {

    console.log(newUser)
    
    if(result[0])
    {
    this.db
      .collection("users")
      .doc(newUser.id)
      .withConverter(userConverter)
      .set(newUser)
      .then(function () {
        updateUser(newUser);
        console.log(newUser)
        return true;
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        return false;
      });
    }else {
      alert(result[1])
      console.log(result[2])
    }
    changeLoadingTo(false)
  }

  addImageToStorage = async (user, file, changeLoadingTo, updateUser) => {

    const storageRef = this.storage.ref();
    const imageName = `${user.name}_${user.surname.replace(' ', '_')}`;
    const userID = user.id;

    const metadata = {
      contentType: 'image/jpeg',
      creator: `${user.name}_${user.surname}`,
      creationDate: Date.now()
    };
    console.log(`users/${userID}/${imageName}.jpg`)
    

    const uploadTask = storageRef.child(`users/${userID}/${imageName}.jpg`).putString(file, 'data_url', metadata)
      uploadTask.on("state_changed", {
        error: error => {
         this.continueUserCreation(user, [false, "Er is een fout opgetreden", error],changeLoadingTo, updateUser);
        },
        complete: () => {
          return uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              this.continueUserCreation(user, [true, user.updateImage(downloadURL)],changeLoadingTo, updateUser);

                const mySentence = `${user.surname} ${user.name}`;
                const words = mySentence.split(" ");
                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

              this.auth.currentUser.updateProfile({
                photoURL: downloadURL,
                displayName: words.join(" ")
              })
            });
        }
      });
      

  }

}

export default UserService;
