import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import User from "../models/User";
import { RESPONSE } from "../consts/responses";
import ProjectService from "../services/ProjectService";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.currentUser = this.seed();
    this.verifiedUser = false;
    this.isLoading = false;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.userService = new UserService(this.rootStore.firebase);
    this.projectService = new ProjectService(this.rootStore.firebase);
  }

  test = async () => {
    this.isLoading = true;
    await setTimeout(() => {this.isLoading = false;  return true; }, 2000)
  }

  uploadProject = async (data) => {
    this.isLoading = true;
    this.projectService.uploadProject(data, this.currentUser.id)
    .then(() => {this.isLoading = false;})
  }

  seed = () => {

    return new User({
      bio: "testing the fish in the pond when it is still hot",
      creationDate: 1611067622180,
      exp: 0,
      id: '8SzbHZQ7UygNdawwou338Vks4KTPmf93',
      interestedTags: ['Ontspanning'],
      level: 0,
      mail: "migueleken@hotmail.com",
      surname: "de pelsmaeker",
      phone: "+32 478 99 38 47",
      picture: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/users%2F8SzbHZQ7UygNou338Vks4KTPmf93%2Faar_output.png?alt=media&token=9cacae59-d379-4511-a768-ffde73587287",
      publicMail: true,
      publicPhone: true,
      role: 0,
      statistics: {
        upvotes: ['7ogVf47Ir8Y9xUqMCf0J'],
        downvotes: []
      },
      name: "miguel",
      unlockedBadges: [],
      votes: []
    })
  }

  onAuthStateChanged = async user => {
    if (user) {
      console.log('--------------')
      console.log('User auth changed')
      console.log(user)
      //If there's no current user, set a new user
      if(!this.currentUser){this.setCurrentUser(user.uid);console.log('getting user')}
      console.log('--------------')
    }
  };

  //Function used to set a new user as current user
  setCurrentUser = async (id) => {
    this.currentUser = await (this.userService.getUserById(id))
  }

  //First function of login sequence that goes to UserService.js
  verifyLogin = async (email, password) => this.userService.loginUser(email, password)

  //Simple function in order to know if the app is doing something
  changeLoadingStatus = (status) =>  {
    this.isLoading = status;
  }

  //Update current user to new object
  updateCurrentUser = (user) => {this.currentUser = user; console.log('updateCurrentUserFunc')};

  //Create an account
  createAccount = async (email, password, data) => {
    //Set to true to tell that the app is doing something
    this.changeLoadingStatus(true)
    //Firebase create function
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          //Continue to the userService with the given data
          this.userService.addUser(result.user, data, this.changeLoadingStatus, this.updateCurrentUser)
          this.userService.setRequest('createUserWithEmailAndPassword')
        })
        .catch((error) => {
          console.log('===========')
          console.log('createUserWithEmailAndPassword ERROR:')
          //Show error message
          if(error.message === "The email address is already in use by another account." && document.querySelector('.alertwindow')) document.querySelector('.alertwindow').textContent = RESPONSE.createAccountDuplicateMail
          console.log(error)
          console.log('===========')
        });

  }

  //Simple function to log out
  logOut = () => {
    this.firebase.auth().signOut().then(function() {
      console.log('Logged out')
    }).catch(function(error) {
      console.log('--------------')
      console.log('error logging out')
      console.log(error)
      console.log('--------------')
    });
    //reset to initial state
    this.verifiedUser = false;
    this.currentUser = undefined;
  }

  //log amount of requests sent to server
  logUserStoreRequests = () => this.userService.logRequests();

  //First function of email verification sequence that goes to UserService.js
  verifyEmail = (email) => this.userService.requestVerificationMail(email)

  //First function of password reset sequence that goes to UserService.js
  resetPassword = (email, func) => this.userService.sendPasswordResetMail(email, func)

}

decorate(UiStore, {
  currentUser: observable,
  verifiedUser: observable,
  isLoading: observable,
  updateCurrentUser: action,
  logout: action,
  verifyLogin: action,
  onAuthStateChanged: action,
  createAccount: action,
  test: action,
  uploadDescription: action,
});

export default UiStore;