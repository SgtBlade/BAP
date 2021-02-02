'./assets/project/default.jpg'


class Project {
  
  constructor({ id = '', title, allowComments, allowQuestions, ownerID, publicOwner, budget, contact, coWorkers, deadline, deadlineDate, description = '', discussions, location, multipleChoice, personalIntroduction, pictures = [], previewText, questions, requirements, tags, updates, creationDate = Date.now(), upvotes = 0, downvotes = 0, isInFundingStage = false})
  {
    this.id = id;
    this.title = title;
    this.allowComments = allowComments;
    this.allowQuestions = allowQuestions;
    this.ownerID = ownerID;
    this.publicOwner = publicOwner;
    this.budget = budget;
    this.contact = contact;
    this.coWorkers = coWorkers;
    this.deadlineDate = deadlineDate;
    this.deadline = deadline;
    this.description = description;
    this.discussions = discussions;
    this.location = location;
    this.multipleChoice = multipleChoice;
    this.personalIntroduction = personalIntroduction;
    this.pictures = pictures;
    this.previewText = previewText;
    this.questions = questions;
    this.requirements = requirements;
    this.tags = tags;
    this.updates = updates;
    this.isInFundingStage = isInFundingStage;
    this.creationDate = creationDate;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
  }


  changeID = (id) => this.id = id;

  addPictue = (pic) => this.pictures.push(pic)

  setDescription = (desc) => this.description = desc;

  setPictures = (picArr) => this.pictures = picArr;








}

const projectConverter = {
  toFirestore: function(project) {
    return {
      id: project.id, 
      title: project.title, 
      allowComments: project.allowComments, 
      allowQuestions: project.allowQuestions, 
      ownerID: project.ownerID, 
      publicOwner: project.publicOwner, 
      budget: project.budget, 
      contact: project.contact, 
      coWorkers: project.coWorkers, 
      deadline: project.deadline, 
      deadlineDate: project.deadlineDate, 
      description: project.description, 
      discussions: project.discussions, 
      location: project.location, 
      multipleChoice: project.multipleChoice, 
      personalIntroduction: project.personalIntroduction, 
      pictures: project.pictures, 
      previewText: project.previewText, 
      questions: project.questions, 
      requirements: project.requirements, 
      tags: project.tags, 
      updates: project.updates, 
      isInFundingStage: project.isInFundingStage, 
      creationDate: project.creationDate, 
      upvotes: project.upvotes, 
      downvotes: project.downvotes,
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Project({
      id: snapshot.id,
      title: data.title,
      allowComments: data.allowComments,
      allowQuestions: data.allowQuestions,
      ownerID: data.ownerID,
      publicOwner: data.publicOwner,
      budget: data.budget,
      contact: data.contact,
      coWorkers: data.coWorkers,
      deadline: data.deadline,
      deadlineDate: data.deadlineDate,
      description: data.description,
      discussions: data.discussions,
      location: data.location,
      multipleChoice: data.multipleChoice,
      personalIntroduction: data.personalIntroduction,
      pictures: data.pictures,
      previewText: data.previewText,
      questions: data.questions,
      requirements: data.requirements,
      tags: data.tags,
      updates: data.updates,
      isInFundingStage: data.isInFundingStage,
      creationDate: data.creationDate,
      upvotes: data.upvotes,
      downvotes: data.downvotes,
    });
  }
};

export { projectConverter };
export default Project;
