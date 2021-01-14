import "firebase/firestore";
import 'firebase/storage'; 
//import { userConverter } from "../models/User";
//import { v4 } from "uuid";

class UserService {
  constructor(firebase) {
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

}

export default UserService;
