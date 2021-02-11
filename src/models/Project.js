import { decorate, observable, action } from "mobx";
class Project {
  
  constructor({ id = '', title, allowComments, allowQuestions, ownerID, publicOwner, budget, contact, coWorkers = [], deadline, deadlineDate, description = '', discussions, location, multipleChoice, personalIntroduction, pictures = ['/assets/project/default.jpg'], previewText, questions, requirements, tags, updates = [], creationDate = Date.now(), upvotes = [], downvotes = [], isInFundingStage = false, collectedMoney = 0, archived = false, approved = false, featured = false, comments = []})
  {
    //Numbers
    this.id = id;
    this.ownerID = ownerID;
    this.budget = budget;
    this.collectedMoney = collectedMoney;
    this.upvotes = upvotes;
    this.downvotes = downvotes;

    //Dates
    this.deadlineDate = deadlineDate;
    this.creationDate = creationDate;

    //Strings
    this.title = title;
    this.location = location;
    this.personalIntroduction = personalIntroduction;
    this.publicOwner = publicOwner;
    this.description = description;

    //Arrays
    this.tags = tags;
    this.updates = updates;
    this.previewText = previewText;
    this.questions = questions;
    this.requirements = requirements;
    this.pictures = pictures;
    this.multipleChoice = multipleChoice;
    this.contact = contact;
    this.coWorkers = coWorkers;
    this.discussions = discussions;
    this.comments = comments;

    //Booleans
    this.allowComments = allowComments;
    this.allowQuestions = allowQuestions;
    this.isInFundingStage = isInFundingStage;
    this.archived = archived;
    this.approved = approved;
    this.deadline = deadline;
    this.featured = featured;
  }

  //change the owner id, used because owner id is unknown at start of creating new project
  setOwnerID = (id) => this.ownerID = id;

  //Change id for same reason as above
  changeID = (id) => this.id = id;

  //Push picture to the picture array
  addPictue = (pic) => this.pictures.push(pic)

  //Set the description, used to change from data to an url in project service
  setDescription = (desc) => this.description = desc;

  //instead of saving the whole array can be set, also used in project service
  setPictures = (picArr) => this.pictures = picArr;

  //The description is saved to a storage database because it can become large in size
  //We need to get it and convert it from a file to the text again
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

  
  addUpvote = (id) => { this.upvotes.push(id); }

  addDownvote = (id) => { this.downvotes.push(id); }

  addComment = (comment) => {this.comments.push(comment)}

  deleteComment = (index) => this.comments.splice(index, 1)

  setYesNo = (obj) => this.questions = obj;

  //changing the whole object at once because it's more efficient than searching for what to change
  setMultipleChoice = (obj) => this.multipleChoice = obj

  setApproved = (bool) => this.approved = bool;

  setTitle = (value) => this.title = value;

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
      archived: project.archived,
      approved: project.approved,
      featured: project.featured,
      comments: project.comments
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
      archived: data.archived,
      approved: data.approved,
      featured: data.featured,
      comments: data.comments,
    });
  }
};

decorate(Project, {
  description: observable,
  convertDescriptionToData: action,
});

export { projectConverter };
export default Project;
