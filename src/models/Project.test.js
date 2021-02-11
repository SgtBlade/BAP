import Project from './Project'

let testData = {
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
  approved: false,
  featured: false
}

test("Create new project", () => {
  const project = new Project(testData);
  expect(project.pictures).toBeInstanceOf(Array);
  expect(project.coWorkers).toBeInstanceOf(Array)
  expect(project.discussions).toBeInstanceOf(Array)
  expect(project.downvotes).toBeInstanceOf(Array)
  expect(project.questions).toBeInstanceOf(Array)
  expect(project.requirements).toBeInstanceOf(Array)
  expect(project.tags).toBeInstanceOf(Array)
  expect(project.updates).toBeInstanceOf(Array)
  expect(project.upvotes).toBeInstanceOf(Array)
  expect(project.contact).toBeInstanceOf(Object)
  expect(project.collectedMoney).toBe(0)
});


test("Set approved", () => {
  const project = new Project(testData);
  expect(project.approved).toBe(false)
  project.setApproved(true)
  expect(project.approved).toBe(true)
});


test("Set Owner", () => {
  const project = new Project(testData);
  expect(project.ownerID).toBe('8SzbHZQ7UygNou338Vks4KTPmf93')
  project.setOwnerID('eenOwnerID')
  expect(project.ownerID).toBe('eenOwnerID')
});


test("Set id", () => {
  const project = new Project(testData);
  project.changeID('0000')
  expect(project.id).toBe('0000')
});

test("Add image", () => {
  const project = new Project(testData);
  project.addPictue('0000')
  expect(project.pictures[project.pictures.length-1]).toBe('0000')
});

test("Set description", () => {
  const project = new Project(testData);
  project.setDescription('Een beschrijving van het project')
  expect(project.description).toBe('Een beschrijving van het project')
});

test("Set pictures", () => {
  const project = new Project(testData);
  project.setPictures([true])
  expect(project.pictures[0]).toBe(true)
});

test("Add upvote", () => {
  const project = new Project(testData);
  project.addUpvote('useridXsaweasda')
  expect(project.upvotes[project.upvotes.length-1]).toBe('useridXsaweasda')
});

test("Add downvote", () => {
  const project = new Project(testData);
  project.addDownvote('useridXsaweasda')
  expect(project.downvotes[project.downvotes.length-1]).toBe('useridXsaweasda')
});

test("Add comment", () => {
  const project = new Project(testData);
  project.addComment({user: 'Abraham vonolso', id: 'dwdadadaw'})
  expect(project.comments[project.downvotes.length-1].user).toBe('Abraham vonolso')
});

