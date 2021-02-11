import { decorate, observable, action } from "mobx";
import Project from "../models/Project";
import ProjectService from "../services/ProjectService";
class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.projectService = new ProjectService(this.rootStore.firebase);
    this.projects = [];
    this.initialized = false;
    this.currentProject = false;
    this.fetchedArchived = false;
    this.currentProjectDescription = ''
    //this.seed();
    this.getProjectsFromDatabase();
  }

  //Core functions
  getAllDefaultProjects = (projectsArr) => {return projectsArr.filter(project => project.archived === false)}

  getApprovedProjects = (projectsArr) => {return projectsArr.filter(project => project.approved === true)}

  getFeaturedProjects = (projectsArr) => {return projectsArr.filter(project => project.featured === true)}

  getProjectByIdFromServer = async (id) => this.currentProject = await this.projectService.getProjectById(id);

  //FILTERS
  filterByTags = (projectsArr, tagsToCompare) => { return projectsArr.filter(project => project.tags.some(r=> tagsToCompare.includes(r)))} 
  
  filterByLocation = (projectsArr, location) => {return projectsArr.filter(project => project.location === location)}

  filterFunding = (projectsArr) => {return projectsArr.filter(project => project.isInFundingStage === true && project.archived === false)}

  filterVoting = (projectsArr) => {return projectsArr.filter(project => project.isInFundingStage === false && project.archived === false)}

  filterArchived = (projectsArr) => {return projectsArr.filter(project => project.archived === true)}

  get currentUserProjects() { return this.projects.filter(project => project.ownerID === this.rootStore.uiStore.currentUser.id) }

  //DB Functions
  get getProjects() { return this.projects;}

  getProjectsFromDatabase = async () => {await this.projectService.getAllProjects(this.onProjectsChange); this.initialized = true}; 
  
  addProject = (project) => this.projects.push((project))

  removeProject = (project) =>  {this.projects.splice(this.projects.findIndex(item => item.id === project.id), 1);}

  onProjectsChange = proj => {
    const incomingProject = proj[1];
    if(proj[0] === 'removed') this.removeProject(incomingProject)
    else this.addProject(incomingProject)
  };



  seed = async () => {
    let test = new Project({
      allowComments: true,
      allowQuestions: true,
      budget: "2100",
      coWorkers: [
        {name: 'Gilles', surname: 'Pilzen', id: '8SzbHZQ7UygNou338Vks4KTPmf93'},
        {name: 'Aaron', surname: 'Heartstone', id: '8SzbHfQ7UygNou338Vks4KTPmf93'}
      ],
      collectedMoney: 0,
      contact: { mail: "gilzenPillen@gmail.com", phone: "+32488 75 38 44"},
      creationDate: 1612775743727,
      deadline: true,
      deadlineDate: "2021-02-11",
      description: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2Fdescription.txt?alt=media&token=fa814d3e-d7aa-4e02-8684-f71b991c79f3",
      discussions: [{name: "Facebook", url: "https://www.facebook.com/aaron.harinck"}, {name: "Discord", url: "open.discord.com"}],
      downvotes: [],
      id: "7ogVf47Ir8Y9xUqMCf0J",
      isInFundingStage: false,
      location: "Assenede",
      multipleChoice: [{options: [{value: "optie 1", count: 0}, {value: "optie 2", count: 0}], question: "Een meerkeuze vraag"}, {options: [{value: "otpie 1.1", count: 0}, {value: "optie 1.2", count: 0}], question: "Nog een meerkeuze vraag"}], 
      ownerID: "8SzbHZQ7UygNou338Vks4KTPmf93",
      personalIntroduction: "hier komt een persoonlijke introductie over mezelf, de groep of andere dingen",
      pictures:                                                                                                       
          [{path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined',url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=529d3ccb-6e4f-4051-81f5-c0f93c78cd77"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/11124975-ff11-4851-9b4a-d0602ae51ddd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=8d65ed4a-e77f-43f3-8888-e0ae37ef12f0"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/77e3c04d-149b-4b3d-98d1-1eac6bd3becd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=15001a77-38bf-4018-a5d1-0719e1db6be8"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/f6aab8af-eac3-4da2-87d1-2f86454bd72b.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=9658efd4-f85b-4c0c-9a85-1193fe2727e4"}],
      previewText: "Dit is een preview text van maximaal 120 woorden",
      publicOwner: "miguel de pelsmaeker",
      questions: [ {value: "Een ja neen vraag", yes: [], no: []}, {value: "Nog een ja neen vraag", yes: [], no: []}],
      requirements: [{name: "Een vork", count: "12"}, {name: "Een Gilles", count: 1}, {name: "Een Aaron", count: 1}],
      tags: ["Spelen", "Familie", "Eten", "Vriendengroep/vrienden"],
      title: "Dit is een project titel 12 upvotes",
      updates: [],
      upvotes: [],
      archived: false,
      approved: true,
      featured: false
    })

    let test1 =  new Project({ allowComments: true, allowQuestions: true, budget: "1943", coWorkers: [], collectedMoney: 0, contact: { mail: "gilzenPillen@gmail.com", phone: "+32488 75 38 44"}, creationDate: Date.now(), deadline: false, deadlineDate: "2021-02-01", description: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2Fdescription.txt?alt=media&token=fa814d3e-d7aa-4e02-8684-f71b991c79f3", discussions: [{name: "Facebook", url: "https://www.facebook.com/aaron.harinck"}, {name: "Discord", url: "open.discord.com"}], downvotes: [], id: "7ogVf47Ir8Y9xUqMCf0J", isInFundingStage: false, location: "Assenede", multipleChoice: [{options: [{value: "optie 1", count: 0}, {value: "optie 2", count: 0}], question: "Een meerkeuze vraag"}, {options: [{value: "otpie 1.1", count: 0}, {value: "optie 1.2", count: 0}], question: "Nog een meerkeuze vraag"}], ownerID: "8SzbHZQ7UygNou338Vks4KTPmf93", personalIntroduction: "hier komt een persoonlijke introductie over mezelf, de groep of andere dingen", pictures: [{path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined',url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=529d3ccb-6e4f-4051-81f5-c0f93c78cd77"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/11124975-ff11-4851-9b4a-d0602ae51ddd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=8d65ed4a-e77f-43f3-8888-e0ae37ef12f0"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/77e3c04d-149b-4b3d-98d1-1eac6bd3becd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=15001a77-38bf-4018-a5d1-0719e1db6be8"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/f6aab8af-eac3-4da2-87d1-2f86454bd72b.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=9658efd4-f85b-4c0c-9a85-1193fe2727e4"}], previewText: "Dit is een preview text van maximaal 120 woorden", publicOwner: "miguel de pelsmaeker", questions: [ {value: "Een ja neen vraag", yes: [], no: []}, {value: "Nog een ja neen vraag", yes: [], no: []}], requirements: [{name: "Een vork", count: "12"}, {name: "Een Gilles", count: 1}, {name: "Een Aaron", count: 1}], tags: ["Godsdienst", "Diversiteit", "Ontspanning"], title: "Test titel", updates: [], upvotes: [], archived: true, approved: false, featured: false })
    

    let test2 =  new Project({ allowComments: true, allowQuestions: true, budget: "1944", coWorkers: [], collectedMoney: 0, contact: { mail: "gilzenPillen@gmail.com", phone: "+32488 75 38 44"}, creationDate: 1614375743727, deadline: true, deadlineDate: "2021-02-25", description: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2Fdescription.txt?alt=media&token=fa814d3e-d7aa-4e02-8684-f71b991c79f3", discussions: [{name: "Facebook", url: "https://www.facebook.com/aaron.harinck"}, {name: "Discord", url: "open.discord.com"}], downvotes: [], id: "7ogVf47Ir8Y9xUqMCf0J", isInFundingStage: false, location: "Assenede", multipleChoice: [{options: [{value: "optie 1", count: 0}, {value: "optie 2", count: 0}], question: "Een meerkeuze vraag"}, {options: [{value: "otpie 1.1", count: 0}, {value: "optie 1.2", count: 0}], question: "Nog een meerkeuze vraag"}], ownerID: "8SzbHZQ7UygNou338Vks4KTPmf93", personalIntroduction: "hier komt een persoonlijke introductie over mezelf, de groep of andere dingen", pictures: [{path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined',url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=529d3ccb-6e4f-4051-81f5-c0f93c78cd77"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/11124975-ff11-4851-9b4a-d0602ae51ddd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=8d65ed4a-e77f-43f3-8888-e0ae37ef12f0"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/77e3c04d-149b-4b3d-98d1-1eac6bd3becd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=15001a77-38bf-4018-a5d1-0719e1db6be8"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/f6aab8af-eac3-4da2-87d1-2f86454bd72b.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=9658efd4-f85b-4c0c-9a85-1193fe2727e4"}], previewText: "Dit is een preview text van maximaal 120 woorden", publicOwner: "miguel de pelsmaeker", questions: [ {value: "Een ja neen vraag", yes: [], no: []}, {value: "Nog een ja neen vraag", yes: [], no: []}], requirements: [{name: "Een vork", count: "12"}, {name: "Een Gilles", count: 1}, {name: "Een Aaron", count: 1}], tags: ["Natuur", "Fotografie", "Eten", "Technologie"], title: "Test titel nr 2 met 10 upvotes", updates: [], upvotes: [], archived: true, approved: true, featured: false })
    let test3 =  new Project({ allowComments: true, allowQuestions: true, budget: "1944", coWorkers: [], collectedMoney: 1240, contact: { mail: "gilzenPillen@gmail.com", phone: "+32488 75 38 44"}, creationDate: 1614375743727, deadline: true, deadlineDate: "2021-02-17", description: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2Fdescription.txt?alt=media&token=fa814d3e-d7aa-4e02-8684-f71b991c79f3", discussions: [{name: "Facebook", url: "https://www.facebook.com/aaron.harinck"}, {name: "Discord", url: "open.discord.com"}], downvotes: [], id: "7ogVf47Ir8Y9xUqMCf0J", isInFundingStage: true, location: "Assenede", multipleChoice: [{options: [{value: "optie 1", count: 0}, {value: "optie 2", count: 0}], question: "Een meerkeuze vraag"}, {options: [{value: "otpie 1.1", count: 0}, {value: "optie 1.2", count: 0}], question: "Nog een meerkeuze vraag"}], ownerID: "8SzbHZQ7UygNou338Vks4KTPmf93", personalIntroduction: "hier komt een persoonlijke introductie over mezelf, de groep of andere dingen", pictures: [{path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined',url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=529d3ccb-6e4f-4051-81f5-c0f93c78cd77"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/11124975-ff11-4851-9b4a-d0602ae51ddd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=8d65ed4a-e77f-43f3-8888-e0ae37ef12f0"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/77e3c04d-149b-4b3d-98d1-1eac6bd3becd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=15001a77-38bf-4018-a5d1-0719e1db6be8"}, {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/f6aab8af-eac3-4da2-87d1-2f86454bd72b.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2F06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined?alt=media&token=9658efd4-f85b-4c0c-9a85-1193fe2727e4"}], previewText: "Dit is een preview text van maximaal 120 woorden", publicOwner: "miguel de pelsmaeker", questions: [ {value: "Een ja neen vraag", yes: [], no: []}, {value: "Nog een ja neen vraag", yes: [], no: []}], requirements: [{name: "Een vork", count: "12"}, {name: "Een Gilles", count: 1}, {name: "Een Aaron", count: 1}], tags: ["Natuur", "Drinken", "Ambacht"], title: "Test titel nr 2 met 3 upvotes", updates: [], upvotes: [], archived: false, approved: true, featured: false })


    this.addProject(test)
    this.addProject(test1)
    this.addProject(test2)
    this.addProject(test3)
    this.projectService.convertDescriptionToData(this.currentProject.description, this.updateDescription)
    this.initialized = true
  }

  getProjectById = async (id) => {
      const newProject = await this.projects.filter(proj => proj.id === id)[0];
      this.currentProjectDescription = 'Loading';
      this.currentProject = newProject;

      //TURN ON
      if(newProject !== undefined)this.projectService.convertDescriptionToData(this.currentProject.description, this.updateDescription)
      return newProject;
  }
  
  upvoteProject = (id) => this.projectService.upvoteProject(id, this.rootStore.uiStore.currentUser);

  downvoteProject = (id) => this.projectService.downvoteProject(id, this.rootStore.uiStore.currentUser);
  
  updateDescription = (desc) => {this.currentProjectDescription = (desc);}

  uploadComment = (projectID, commentData) => this.projectService.uploadComment(projectID, commentData)

  deleteComment = (projectId, comment) => this.projectService.deleteComment(projectId, comment)

  sendContactDetails = (ownerid) => this.projectService.sendContactDetails(ownerid)

  voteYesNo = (projectId, questions) => this.projectService.voteYesNo(projectId, questions)
  
  voteMultiplechoice = (projectId, questionObj) => this.projectService.voteMultiplechoice(projectId, questionObj)


}

decorate(ProjectStore, {
  currentProject: observable,
  currentProjectDescription: observable,
  projects: observable,
  getProjectById: action,
  test: action,
  updateDescription: action,
  getProjectsByTags: action,
  addProject: action,
  removeProject: action,
  upvoteProject: action,
  initialized: observable,
  getProjectsFromDatabase: action
});


export default ProjectStore;