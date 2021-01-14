import UiStore from "./UiStore";
import FriendStore from "./friendStore";

import * as firebase from "firebase/app";

class RootStore {
  constructor() {
    var firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId
    };
    // Initialize Firebase
    this.firebase = firebase.initializeApp(firebaseConfig);

    this.friendStore = new FriendStore(this);
    this.uiStore = new UiStore(this);
  }
}

const getCurrenTimeStamp = () => {
  return firebase.firestore.Timestamp.now();
};
export { getCurrenTimeStamp };

export default RootStore;
