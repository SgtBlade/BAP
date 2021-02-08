
class User {
  
  constructor({ id, name, surname, publicMail = false, publicPhone = false, phone = '', picture = '/assets/profile/defaultProfileImage.png', mail, statistics = [], unlockedBadges = [], bio, creationDate = Date.now(), interestedTags = [], role = 0, exp = 0, level = 0, notifications = [], votes = [] }) 
  {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.picture = picture;
    this.mail = mail;
    this.statistics = statistics;
    this.unlockedBadges = unlockedBadges;
    this.bio = bio;
    this.creationDate = creationDate; 
    this.interestedTags = interestedTags;
    this.publicMail = publicMail;
    this.publicPhone = publicPhone;
    this.phone = phone;
    this.role = role;
    this.exp = exp;
    this.level = level;
    this.notifications = notifications
    this.votes = votes;
  }

  updateBio = (newBio) => this.bio = newBio;

  updateImage = (imageUrl) => this.picture = imageUrl;

  changeId = (newId) => {this.id = newId}
  
  addProjectVote = (id) => { this.votes.push(id) }

}

const userConverter = {
  toFirestore: function(user) {
    return {
      name: user.name,
      surname: user.surname,
      picture: user.picture,
      mail: user.mail,
      statistics: user.statistics,
      unlockedBadges: user.unlockedBadges,
      bio: user.bio,
      creationDate: user.creationDate,
      interestedTags: user.interestedTags,
      role: user.role,
      level: user.level,
      exp: user.exp,
      //publicMail: user.publicMail,
      //publicPhone: user.publicPhone,
      phone: user.phone,
      notifications: user.notifications,
      votes: user.votes
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    console.log(data)
    return new User({
      id: snapshot.id,
      name: data.name,
      surname: data.surname,
      picture: data.picture,
      mail: data.mail,
      statistics: data.statistics,
      unlockedBadges: data.unlockedBadges,
      bio: data.bio,
      creationDate: data.creationDate,
      interestedTags: data.interestedTags,
      role: data.role,
      level: data.level,
      exp: data.exp,
      publicMail: snapshot.publicMail,
      publicPhone: snapshot.publicPhone,
      phone: data.phone,
      notifications: data.notifications,
      votes: data.votes
    });
  }
};

export { userConverter };
export default User;
