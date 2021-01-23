
class Project {
  
  constructor({ id, title, description, impact, requiredAmount, updates = [], questions = [], coWorkers = [], mainPicture = './assets/project/default.jpg', extraPictures = [], deadline = false, tags = [], owner, upvotes = 0, downvotes = 0, creationDate = Date.now(), upvotesRequiredForFunding = false, isInFundingStage = false})
  {
    this.id = id;
    this.title = title;
    this.description = description;
    this.impact = impact;
    this.requiredAmount = requiredAmount;
    this.updates = updates;
    this.questions = questions;
    this.coWorkers = coWorkers;
    this.mainPicture = mainPicture;
    this.extraPictures = extraPictures;
    this.deadline = false = deadline;
    this.tags = tags;
    this.owner = owner;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.creationDate = creationDate;
    this.upvotesRequiredForFunding = upvotesRequiredForFunding;
    this.isInFundingStage = isInFundingStage;
    
  }

}

const projectConverter = {
  toFirestore: function(project) {
    return {
      name: project.name,
      surname: project.surname,
      picture: project.picture,
      mail: project.mail,
      statistics: project.statistics,
      unlockedBadges: project.unlockedBadges,
      bio: project.bio,
      creationDate: project.creationDate,
      interestedTags: project.interestedTags,
      role: project.role,
      level: project.level,
      exp: project.exp,
      publicMail: project.publicMail,
      publicPhone: project.publicPhone,
      phone: project.phone,

    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Project({
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
      publicMail: data.publicMail,
      publicPhone: data.publicPhone,
      phone: data.phone
    });
  }
};

export { projectConverter };
export default Project;
