import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 
import User, { userConverter } from "../models/User";
import { RESPONSE } from "../consts/responses";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }

  getUserById = async (id) => {
    let user = await this.db
    .collection("users")
    .doc(id)
    .withConverter(userConverter)
    .get();
    user = await user.data();
    await user.changeId(id);
    console.log('request sent')
    return user;
  }

  addUser = async (user, data, changeLoadingTo, updateUser) => {
    const newUser = new User({
      id: user.uid, 
      name: data.name, 
      surname: data.surname,
      mail: user.email,
      bio: data.bio,
      publicMail: data.publicMail,
      publicPhone: data.publicPhone,
      phone: data.phone,
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
        console.log('new user created, sending verification')
        
        var actionCodeSettings = { url: RESPONSE.loginURL, handleCodeInApp: true, };
        this.auth.sendSignInLinkToEmail(newUser.mail, actionCodeSettings)
          .then(() => {
            console.log('--------------')
            window.localStorage.setItem('emailForSignIn', newUser.mail);
            console.log('Email set in local storage')
            console.log('--------------')
            // ...
          })
          .catch((error) => {
            console.log('--------------')
            console.log('error setting email')
            console.log(error)
            console.log('--------------')
          });

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

    if(file !== ''){
      const storageRef = this.storage.ref();
      const imageName = `${user.name}_${user.surname.replace(' ', '_')}`;
      const userID = user.id;
  
      const metadata = {
        contentType: 'image/jpeg',
        creator: `${user.name}_${user.surname}`,
        creationDate: Date.now()
      };
  
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
                  displayName: words.join(" "),
                  phoneNumber: user.phoneNumber,
                })
              });
          }
        });
    }else {
      this.continueUserCreation(user, [true, './assets/profile/defaultProfileImage.png'],changeLoadingTo, updateUser);
      const mySentence = `${user.surname} ${user.name}`;
      const words = mySentence.split(" ");
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
  
      this.auth.currentUser.updateProfile({
        photoURL: './assets/profile/defaultProfileImage.png',
        displayName: words.join(" "),
        phoneNumber: user.phoneNumber,
      })
    }
   
      

  }

  sendPasswordResetMail = (mail, sendResponse) => {
    var actionCodeSettings = { url: RESPONSE.resetPasswordURL, handleCodeInApp: true, };
    this.auth.sendPasswordResetEmail(
        mail, actionCodeSettings)
        .then(function() {
          sendResponse([true, 'positive', RESPONSE.resetPasswordSucces])
        })
        .catch(function(error) {
          sendResponse([true, 'negative', RESPONSE.resetPasswordFail])
        });
  }

}

export default UserService;
