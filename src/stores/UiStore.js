import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthenticationService";
import UserService from "../services/UserService";
//import User from "../models/User";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.currentUser = undefined;
    this.verifiedUser = false;
    this.isLoading = false;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.userService = new UserService(this.rootStore.firebase);
  }


  onAuthStateChanged = async user => {
    if (user) {
      console.log('--------------')
      console.log('User auth changed')
      console.log(user)
      this.verifiedUser = user.emailVerified;
      console.log('--------------')
    }
    console.log(this.verifiedUser)
  };

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
          console.log(error);
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
          console.log(error)
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
    var actionCodeSettings = { url: 'https://localhost:3000/login', handleCodeInApp: true, };

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