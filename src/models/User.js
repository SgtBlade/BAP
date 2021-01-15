import { v4 } from "uuid";

class User {
  constructor(
    { id = v4(), name, surname, picture, mail, statistics, unlockedBadges, bio, creationDate, interestedTags, admin = 0, originalOwner = 0, creationDate = Date.now() }) {
    let id = id;
    let name = name;
    let surname = surname;
    let picture = picture;
    let mail = mail;
    let statistics = statistics;
    let unlockedBadges = unlockedBadges;
    let bio = bio;
    let creationDate = creationDate; 
    let interestedTags = interestedTags;
    let admin = admin;
    let originalOwner = originalOwner;
  }

  updateBio = (newBio) => this.bio = newBio;
  


}

const userConverter = {
  toFirestore: function(user) {
    return {
      userID: user.id,
      name: user.name,
      surname: user.surname,
      picture: user.picture,
      mail: user.mail,
      statistics: user.statistics,
      unlockedBadges: user.unlockedBadges,
      bio: user.bio,
      creationDate: user.creationDate,
      interestedTags: user.interestedTags,
      admin: user.admin,
      originalOwner: user.originalOwner

    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new User({
      id: data.userID,
      name: data.name,
      surname: data.surname,
      picture: data.picture,
      mail: data.mail,
      statistics: data.statistics,
      unlockedBadges: data.unlockedBadges,
      bio: data.bio,
      creationDate: data.creationDate,
      interestedTags: data.interestedTags,
      admin: data.admin,
      originalOwner: data.originalOwner
    });
  }
};

export { userConverter };
export default User;
