import "firebase/auth";

class AuthService {
  constructor(firebase, onAuthStateChanged) {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.auth.onAuthStateChanged((user) => onAuthStateChanged(user));
  }

}
export default AuthService;
