import { decorate, observable, action } from "mobx";
import AuthService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import User from "../models/User";
import { RESPONSE } from "../consts/responses";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.currentUser = this.seed();
    this.verifiedUser = false;
    this.isLoading = false;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.userService = new UserService(this.rootStore.firebase);
  }

  seed = () => {
    return new User({
      bio: "testing the fish in the pond when it is still hot",
      creationDate: 1611067622180,
      exp: 0,
      id: '8SzbHZQ7UygNou338Vks4KTPmf93',
      interestedTags: [],
      level: 0,
      mail: "migueleken@hotmail.com",
      name: "de pelsmaeker",
      phone: "+32 478 99 38 47",
      picture: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/users%2F8SzbHZQ7UygNou338Vks4KTPmf93%2Fde%20pelsmaeker_miguel.jpg?alt=media&token=433024e8-d62a-4dba-8637-5b5e523dddc6",
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
      if(!this.currentUser){this.setCurrentUser(user.uid);console.log('getting user')}
      console.log('--------------')
    }
  };

  setCurrentUser = async (id) => {
    await (this.userService.getUserById(id))
    .then((usr)=> {
      usr.changeId(id);
      this.currentUser = usr;
    })
  }

  verifyLogin = async (email, password) => this.userService.loginUser(email, password)

  changeLoadingStatus = (status) =>  {
    this.isLoading = status;
  }

  updateCurrentUser = (user) => {this.currentUser = user; console.log('updateCurrentUserFunc')};

  createAccount = async (email, password, data) => {
    this.changeLoadingStatus(true)
    this.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.userService.addUser(result.user, data, this.changeLoadingStatus, this.updateCurrentUser)
          this.userService.setRequest('createUserWithEmailAndPassword')
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

  logUserStoreRequests = () => this.userService.logRequests();

  verifyEmail = (email) => this.userService.requestVerificationMail(email)

  resetPassword = (email, func) => this.userService.sendPasswordResetMail(email, func)

  }

decorate(UiStore, {
  currentUser: observable,
  verifiedUser: observable,
  updateCurrentUser: action,
  logout: action,
  verifyLogin: action,
  onAuthStateChanged: action,
  createAccount: action,
});

export default UiStore;