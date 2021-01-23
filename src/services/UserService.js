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
    this.requests = [];
  }

  getUserById = async (id) => {
    let user = await this.db
    .collection("users")
    .doc(id)
    .withConverter(userConverter)
    .get();
    user = await user.data();
    this.requests['get user by id'] ? this.requests['get user by id']++ : this.requests['get user by id'] = 1;
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
      .then(() => {
        updateUser(newUser);
        console.log('new user created, sending verification')
        this.requestVerificationMail(newUser.mail);
        this.requests['continueUserCreation'] ? this.requests['continueUserCreation']++ : this.requests['continueUserCreation'] = 1;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return false;
      });
    }else {
      alert(result[1])
      console.log(result[2])
    }
    changeLoadingTo(false)
  }

  loginUser = (email, password) => {

    //First part of the if is for when the user visits to verify his email
    if (this.auth.isSignInWithEmailLink(window.location.href)) {
      email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      this.auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          console.log('--------------')
          console.log('Succes signing in with email after verify')
          console.log(result)
          this.verifiedUser = result.user.emailVerified;
          this.requests['loginUser'] ? this.requests['loginUser']++ : this.requests['loginUser'] = 1;
          console.log('--------------')
        })
        .catch((error) => {
          console.log('--------------')
          console.log('error signing in with email')
          console.log(error)
          console.log('--------------')
        });
    }else 
    console.log('second login -- without link')
      this.auth.signInWithEmailAndPassword(email, password)
        .then(function(result) {
          console.log('--logged in--')
          console.log(result)
          this.requests['loginUser'] ? this.requests['loginUser']++ : this.requests['loginUser'] = 1;
          console.log('--END login message--')
        })
        .catch(function(error) {
          console.log('--------------')
          console.log('Error loging in')
          if(error.message === "The password is invalid or the user does not have a password." && document.querySelector('.alertwindow')) document.querySelector('.alertwindow').textContent = RESPONSE.loginWrongPasswordError
          if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted." && document.querySelector('.alertwindow')) document.querySelector('.alertwindow').textContent = RESPONSE.loginNonExistingMail
          console.log(error.message);
          console.log('--------------')
        });
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
            //to prevent issues later, set the default image and continue creating the account
           this.continueUserCreation(user, [true, './assets/profile/defaultProfileImage.png', error],changeLoadingTo, updateUser);
          },
          complete: () => {
            return uploadTask.snapshot.ref.getDownloadURL()
              .then(downloadURL => {
                //continueing to the user creation after the image has been uploaded
                this.continueUserCreation(user, [true, user.updateImage(downloadURL)],changeLoadingTo, updateUser);
  
                  //Small loop to capitalize first letter in case the user forgot
                  const mySentence = `${user.surname} ${user.name}`;
                  const words = mySentence.split(" ");
                  for (let i = 0; i < words.length; i++) {
                      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                  }
                
                //Setting the basic information of the user in the firebase auth (not the user from firestore)
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
  
      this.requests['addImageToStorage'] ? this.requests['addImageToStorage']++ : this.requests['addImageToStorage'] = 1;
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
          this.requests['sendPasswordResetMail'] ? this.requests['sendPasswordResetMail']++ : this.requests['sendPasswordResetMail'] = 1;
        })
        .catch(function(error) {
          sendResponse([true, 'negative', RESPONSE.resetPasswordFail])
        });
  }

  requestVerificationMail = (mail) => {
    var actionCodeSettings = { url: RESPONSE.loginURL, handleCodeInApp: true, };
    this.auth.sendSignInLinkToEmail(mail, actionCodeSettings)
      .then(() => {
        console.log('--------------')
        window.localStorage.setItem('emailForSignIn', mail);
        this.requests['requestVerificationMail'] ? this.requests['requestVerificationMail']++ : this.requests['requestVerificationMail'] = 1;
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
  }
  
  setRequest = (value) => this.requests[value] ? this.requests[value]++ : this.requests[value] = 1

  getRequests = () => {return this.requests};

  logRequests = () => {
    for (let key in this.requests) {
      let value = this.requests[key];
      console.log(`${key} => ${value}`);
    }
  }

}

export default UserService;
