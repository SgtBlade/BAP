import { v4 } from "uuid";

class User {
  constructor({ id = v4(), name, color = "", chapter = 0, store = null, avatar = "", email, creationDate = Date.now() }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.chapter = chapter;
    this.avatar = avatar;
    this.creationDate = creationDate;
    this.store = store;
    this.email = email;
  }

  linkCreation(creation) {
    !this.creations.includes(creation) && this.creations.push(creation);
  }

  setName(name){
    this.name = name
  }

  setAvatar(avatar) {
    this.avatar = avatar
  }

  setColor(color) {
    this.color = color
  }

  setChapter(number){this.chapter = number}

}

const userConverter = {
  toFirestore: function(user) {
    return {
      userID: user.id,
      naam: user.name,
      chapter: user.chapter,
      avatar: user.avatar,
      kleur: user.color,
      email: user.email,
      aanmaakDatum: user.creationDate

    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new User({
      name: data.naam,
      email: data.email,
      chapter: data.chapter,
      avatar: data.avatar,
      color: data.kleur,
      id: data.userID,
      creationDate: data.aanmaakDatum
    });
  }
};

export { userConverter };
export default User;
