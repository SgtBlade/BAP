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
    //Array to track amount of requests I sent to the database
    //Could be useful for further development
    this.requests = [];
  }

  getUserById = async (id) => {
    //Basic database query to get user and convert to user object
    let user = await this.db
    .collection("users")
    .doc(id)
    .withConverter(userConverter)
    .get();
    //await for the data of the query above and take the data
    user = await user.data();
    //Update requests of this type
    this.requests['get user by id'] ? this.requests['get user by id']++ : this.requests['get user by id'] = 1;
    return user;
  }

  addUser = async (user, data, changeLoadingTo, updateUser) => {
    //create new user object to prepare for pushing to the firestore
    const newUser = new User({
      id: user.uid, 
      name: data.name, 
      surname: data.surname,
      mail: user.email.toLowerCase(),
      bio: data.bio,
      publicMail: data.publicMail,
      publicPhone: data.publicPhone,
      phone: data.phone,
    })
    //Continue to the next phase of adding a user
    this.addImageToStorage(newUser, data.image, changeLoadingTo, updateUser);
  };

  continueUserCreation = (newUser, result, updateUser, changeLoadingTo) => {

    //if the previous action was succesful, continue to create the new user
    if(result[0])
    {
    this.db
      .collection("users")
      .doc(newUser.id)
      .withConverter(userConverter)
      .set(newUser)
      .then(() => {
        //activate external function to set the new user
        updateUser(newUser);
        console.log('new user created, sending verification')
        //Send an email to verify the mail of the new user
        this.requestVerificationMail(newUser.mail);
        this.requests['continueUserCreation'] ? this.requests['continueUserCreation']++ : this.requests['continueUserCreation'] = 1;
      })
      .then(() => {
        //Small loop to capitalize first letter in case the user forgot
        const mySentence = `${newUser.surname} ${newUser.name}`;
        const words = mySentence.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        //Setting the basic information of the user in the firebase auth (not the user from firestore)
        this.auth.currentUser.updateProfile({
          photoURL: newUser.picture,
          displayName: words.join(" "),
          phoneNumber: newUser.phoneNumber,
        })
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
      //check if there's an email stored in the storage, if not request the user for it
      email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt(RESPONSE.emailVerificationPrompt);
      }
      //Continue with the signin with the email
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

    //Look if there's a file, if not -> set a default image
    if(file !== ''){
      const storageRef = this.storage.ref();
      const imageName = `${user.name}_${user.surname.replace(' ', '_')}`;
      const userID = user.id;
      //create the metadata for the image
      const metadata = {
        creator: `${user.name}_${user.surname}`,
        creationDate: Date.now()
      };
      
      //Begin upload to the cloud storage of firebase
      const uploadTask = storageRef.child(`users/${userID}/${imageName}.jpg`).putString(file, 'data_url', metadata)
        uploadTask.on("state_changed", {
          error: error => {
            //to prevent issues later, set the default image and continue creating the account
           this.continueUserCreation(user, [true, '/assets/profile/defaultProfileImage.png', error],changeLoadingTo, updateUser);
          },
          complete: () => {
            return uploadTask.snapshot.ref.getDownloadURL()
              .then(downloadURL => {
                //continueing to the user creation after the image has been uploaded
                this.continueUserCreation(user, [true, user.updateImage(downloadURL)],changeLoadingTo, updateUser);
                this.requests['addImageToStorage'] ? this.requests['addImageToStorage']++ : this.requests['addImageToStorage'] = 1;

              });
          }
        });
    }else {
      //Set the default image and continue
      this.continueUserCreation(user, [true, '/assets/profile/defaultProfileImage.png'],changeLoadingTo, updateUser);
      const mySentence = `${user.surname} ${user.name}`;
      const words = mySentence.split(" ");
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
  
      //Setting the basic information of the user in the firebase auth (not the user from firestore)
      this.requests['addImageToStorage'] ? this.requests['addImageToStorage']++ : this.requests['addImageToStorage'] = 1;
      this.auth.currentUser.updateProfile({
        photoURL: '/assets/profile/defaultProfileImage.png',
        displayName: words.join(" "),
        phoneNumber: user.phoneNumber,
      })
    }
   
      

  }

  sendPasswordResetMail = (mail, sendResponse) => {
    //Basic action settings for where the mail should redirect you to
    var actionCodeSettings = { url: RESPONSE.resetPasswordURL, handleCodeInApp: true, };
    this.auth.sendPasswordResetEmail(
        mail, actionCodeSettings)
        .then(() => {
          //Once finished send a response that it was successful
          sendResponse([true, 'positive', RESPONSE.resetPasswordSucces])
          this.requests['sendPasswordResetMail'] ? this.requests['sendPasswordResetMail']++ : this.requests['sendPasswordResetMail'] = 1;
        }) 
        .catch(function(error) {
          sendResponse([true, 'negative', RESPONSE.resetPasswordFail])
        });
  }

  requestVerificationMail = (mail) => {
    //Basic action settings for where the mail should redirect you to
    var actionCodeSettings = { url: RESPONSE.loginURL, handleCodeInApp: true, };
    this.auth.sendSignInLinkToEmail(mail, actionCodeSettings)
      .then(() => {
        console.log('--------------')
        //Set email in local storage to check later
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
  
  //In case a request gets sent from outside this class
  setRequest = (value) => this.requests[value] ? this.requests[value]++ : this.requests[value] = 1
  //Get requests
  getRequests = () => {return this.requests};
  //loop to log all requests sent
  logRequests = () => {
    for (let key in this.requests) {
      let value = this.requests[key];
      console.log(`${key} => ${value}`);
    }
  }

}

export default UserService;
