import { decorate, observable, action } from "mobx";
class Project {
  
  constructor({ id = '', title, allowComments, allowQuestions, ownerID, publicOwner, budget, contact, coWorkers = [], deadline, deadlineDate, description = '', discussions, location, multipleChoice, personalIntroduction, pictures = ['./assets/project/default.jpg'], previewText, questions, requirements, tags, updates = [], creationDate = Date.now(), upvotes = 0, downvotes = 0, isInFundingStage = false, collectedMoney = 0})
  {
    this.id = id;
    this.title = title;
    this.allowComments = allowComments;
    this.allowQuestions = allowQuestions;
    this.ownerID = ownerID;
    this.publicOwner = publicOwner;
    this.budget = budget;
    this.collectedMoney = collectedMoney;
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

  setOwnerID = (id) => this.ownerID = id;

  changeID = (id) => this.id = id;

  addPictue = (pic) => this.pictures.push(pic)

  setDescription = (desc) => this.description = desc;

  setPictures = (picArr) => this.pictures = picArr;

  convertDescriptionToData = async () => {
    var descriptionFile = new XMLHttpRequest();
    descriptionFile.open("GET",this.description,true);
    descriptionFile.send();
    descriptionFile.onreadystatechange = () => {
        if (descriptionFile.readyState === 4 && descriptionFile.status === 200) {
            this.description = (descriptionFile.responseText);
        }
     }
     return true;
  }

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
      collectedMoney: project.collectedMoney,
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
      collectedMoney: data.collectedMoney,
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

decorate(Project, {
  description: observable,
  convertDescriptionToData: action,
});

export { projectConverter };
export default Project;
