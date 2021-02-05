import { decorate, observable, action } from "mobx";
import Project from "../models/Project";
import ProjectService from "../services/ProjectService";
class ProjectStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.projectService = new ProjectService(this.rootStore.firebase);
    this.projects = [];
    this.currentProject = false;
    this.fetchedArchived = false;
    this.currentProjectDescription = ''
    this.seed();
  }

  test = async () => {};

  getAllDefaultProjects = () => {return this.projects.filter(project => project.archived = false)}

  getProjectsByTags = (tagsToCompare) => { return this.projects.filter(project => project.tags.some(r=> tagsToCompare.includes(r)))} 
  
  getProjectsFromDatabase = async () => await this.projectService.getAllProjects(this.onProjectsChange); 

  getProjectById = async (id) => this.currentProject = await this.projectService.getProjectById(id);
  
  addProject = (project) => this.projects.push((project))

  removeProject = (project) =>  {this.projects.splice(this.projects.findIndex(item => item.id === project.id), 1);}

  onProjectsChange = proj => {
    const incomingProject = proj[1];
    if(proj[0] === 'removed') this.rootStore.friendStore.removeProject(incomingProject)
    else this.rootStore.friendStore.addProject(incomingProject)
  };

  seed = async () => {
    this.currentProject = new Project({
      allowComments: false,
      allowQuestions: true,
      budget: "2100",
      coWorkers: [],
      collectedMoney: 0,
      contact: { mail: "gilzenPillen@gmail.com", phone: "+32488 75 38 44"},
      creationDate: 1612375743727,
      deadline: true,
      deadlineDate: "2021-02-17",
      description: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/projects%2F8SzbHZQ7UygNou338Vks4KTPmf93%2F7ogVf47Ir8Y9xUqMCf0J%2Fdescription.txt?alt=media&token=fa814d3e-d7aa-4e02-8684-f71b991c79f3",
      discussions: [{name: "Facebook", url: "https://www.facebook.com/aaron.harinck"}, {name: "Discord", url: "open.discord.com"}],
      downvotes: 0,
      id: "7ogVf47Ir8Y9xUqMCf0J",
      isInFundingStage: false,
      location: "Ghent",
      multipleChoice: [{options: [{value: "optie 1", count: 0}, {value: "optie 2", count: 0}], question: "Een meerkeuze vraag"}, {options: [{value: "otpie 1.1", count: 0}, {value: "optie 1.2", count: 0}], question: "Nog een meerkeuze vraag"}],
      ownerID: "8SzbHZQ7UygNou338Vks4KTPmf93",
      personalIntroduction: "hier komt een persoonlijke introductie over mezelf, de groep of andere dingen",
      pictures: 
          [{path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/06ae58a1-b7e3-46ab-a15f-4d7ee145a1f6.undefined',url: "https://firebasestorage.googleapis.com/v0/b/durf20…=media&token=529d3ccb-6e4f-4051-81f5-c0f93c78cd77"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/11124975-ff11-4851-9b4a-d0602ae51ddd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf20…=media&token=8d65ed4a-e77f-43f3-8888-e0ae37ef12f0"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/77e3c04d-149b-4b3d-98d1-1eac6bd3becd.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf20…=media&token=15001a77-38bf-4018-a5d1-0719e1db6be8"}, 
          {path: 'projects/8SzbHZQ7UygNou338Vks4KTPmf93/7ogVf47Ir8Y9xUqMCf0J/f6aab8af-eac3-4da2-87d1-2f86454bd72b.undefined', url: "https://firebasestorage.googleapis.com/v0/b/durf20…=media&token=9658efd4-f85b-4c0c-9a85-1193fe2727e4"}],
      previewText: "Dit is een preview text van maximaal 120 woorden",
      publicOwner: "miguel de pelsmaeker",
      questions: [ {value: "Een ja neen vraag", yes: 0, no: 0}, {value: "Nog een ja neen vraag", yes: 0, no: 0}],
      requirements: [{name: "Een vork", count: "12"}, {name: "Een Gilles", count: 1}, {name: "Een Aaron", count: 1}],
      tags: ["Spelen", "Familie", "Educatie", "Vriendengroep/vrienden"],
      title: "Dit is een project titel",
      updates: [],
      upvotes: 0,
    })
    this.projectService.convertDescriptionToData(this.currentProject.description, this.updateDescription)
  }

  updateDescription = (desc) => {this.currentProjectDescription = (desc);}

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
});


export default ProjectStore;