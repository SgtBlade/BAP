import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import User from "../models/User";
import { RESPONSE } from "../consts/responses";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.currentUser = false//this.seed();
    this.verifiedUser = false;
    this.isLoading = false;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.userService = new UserService(this.rootStore.firebase);
  }

  seed = () => {
    return new User({
      bio: "testing the fish in the pond when it is still hot",
      creationDate: 1610836332668,
      exp: 0,
      id: 'vdqzNZUaqGYZr3LF6JflTPKjXQs1',
      interestedTags: [],
      level: 0,
      mail: "migueleken@hotmail.com",
      name: "de pelsmaeker",
      phone: "+32 478 99 38 47",
      picture: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/users%2FvdqzNZUaqGYZr3LF6JflTPKjXQs1%2Fde%20pelsmaeker_miguel.jpg?alt=media&token=8a17b3a3-0c3a-4f9a-b149-421af7efaee6",
      publicMail: true,
      publicPhone: true,
      role: 0,
      statistics: [],
      surname: "miguel",
      unlockedBadges: [],
    })
  }

  onAuthStateChanged = async user => {
    if (user) {
      console.log('--------------')
      console.log('User auth changed')
      console.log(user)
      if(!this.currentUser)this.setCurrentUser(user.uid);
      console.log('--------------')
    }
  };

  setCurrentUser = async (id) => {
    this.currentUser = await (this.userService.getUserById(id));
  }

  verifyLogin = async (email, password) => {
    
    if (this.firebase.auth().isSignInWithEmailLink(window.location.href)) {
      email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      this.firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          console.log('--------------')
          console.log('Succes signing in with email after verify')
          console.log(result)
          this.verifiedUser = result.user.emailVerified;
          console.log('--------------')
        })
        .catch((error) => {
          console.log('--------------')
          console.log('error signing in with email')
          console.log(error)
          console.log('--------------')
        });
    }else 
      this.firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result) {
          console.log('--logged in--')
          console.log(result)
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
  
  };

  changeLoadingStatus = (status) =>  {
    this.isLoading = status;
  }

  updateCurrentUser = (user) => this.currentUser = user;

  createAccount = async (email, password, data) => {
    this.changeLoadingStatus(true)
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.userService.addUser(result.user, data, this.changeLoadingStatus, this.updateCurrentUser)
          
        })
        .catch((error) => {
          console.log('===========')
          console.log('createUserWithEmailAndPassword ERROR:')
          if(error.message === "The email address is already in use by another account." && document.querySelector('.alertwindow')) document.querySelector('.alertwindow').textContent = RESPONSE.createAccountDuplicateMail
          console.log(error)
          console.log('===========')
        });

  }

  logOut = () => {
    this.firebase.auth().signOut().then(function() {
      console.log('Logged out')
    }).catch(function(error) {
      console.log('--------------')
      console.log('error logging out')
      console.log(error)
      console.log('--------------')
    });
    this.verifiedUser = false;
    this.currentUser = undefined;
  }

  verifyEmail = (email) => {
    var actionCodeSettings = { url: RESPONSE.loginURL, handleCodeInApp: true, };

    this.firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        console.log('--------------')
        window.localStorage.setItem('emailForSignIn', email);
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

  resetPassword = (email, func) => this.userService.sendPasswordResetMail(email, func)

  }

decorate(UiStore, {
  currentUser: observable,
  verifyLogin: action,
  onAuthStateChanged: action,
  createAccount: action,
  logout: action,
  verifiedUser: observable
});

export default UiStore;