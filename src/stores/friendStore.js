import { decorate, observable } from "mobx";
import UserService from "../services/UserService";

class FriendStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userService = new UserService(this.rootStore.firebase);
    this.friends = [];
    this.requests = [];
  }

}
decorate(FriendStore, {
  requests: observable,
  friends: observable,
});
export default FriendStore;
