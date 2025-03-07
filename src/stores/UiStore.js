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
    this.currentUser = false;
    this.verifiedUser = false;
    this.isLoading = false;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.userService = new UserService(this.rootStore.firebase);
    this.projectService = new ProjectService(this.rootStore.firebase);
    this.allUsers = [];
  }

  deleteUser = (id) => {
    this.userService.deleteById(id)
  }

  uploadProject = async (data) => {

      this.isLoading = true;
      return await this.projectService.uploadProject(data, this.rootStore.uiStore.currentUser.id)
                  .then((res) => {this.isLoading = false; return res})
    
  }

  seed = () => {

    return new User({
      bio: "testing the fish in the pond when it is still hot",
      creationDate: 1611067622180,
      exp: 0,
      id: '8SzbHZQ7UygNou338Vks4KTPmf93',
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

  //Get a user by his Id
  getUserById = async (id) => {return await (this.userService.getUserById(id))}

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
    this.currentUser = false;
  }

  //log amount of requests sent to server
  logUserStoreRequests = () => this.userService.logRequests();

  //First function of email verification sequence that goes to UserService.js
  verifyEmail = (email) => this.userService.requestVerificationMail(email)

  //First function of password reset sequence that goes to UserService.js
  resetPassword = (email, func) => this.userService.sendPasswordResetMail(email, func)


  //Simple remove user by id from the local variable
  removeUser = (user) => this.allUsers.splice(this.allUsers.findIndex(item => item.id === user.id), 1);

  //add user to the local variable
  addUser = (user) => {this.allUsers.push(user);}

  //Looks if something changes about the user and act accordingly
  onAllUsersChange = usr => {
    const incomingUser = usr[1];
    console.log(usr[0])
    if(usr[0] === 'removed') this.removeUser(incomingUser)
    else if(this.allUsers.filter(usr => usr.id !== incomingUser.id))this.addUser(incomingUser)
  };

  updateTags = (tags) => { if(this.currentUser){this.userService.updateTags(this.currentUser.id, tags); this.currentUser.setTags(tags)} }

  getAllUsers = () => {return this.userService.getAllUsers(this.onAllUsersChange)}

  unlockBadge =(badgeUrl) => {
    if(this.currentUser)
      if(!this.currentUser.unlockedBadges.includes(badgeUrl)){
        this.currentUser.addBadge(badgeUrl);
        this.userService.unlockBadge(badgeUrl);
      }
    
  }


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
  uploadDescription: action,
  allUsers: observable,
  addUser: action,
  removeUser: action
});

export default UiStore;