import User from './User.js'

let userData = 
{
  bio: "testing the fish in the pond when it is still hot",
  creationDate: 1611067622180,
  exp: 0,
  id: '8SzbHZQ7UygNou338Vks4KTPmf93',
  interestedTags: ['Ontspanning'],
  level: 0,
  mail: "migueleken@hotmail.com",
  surname: "de pelsmaeker",
  phone: "+32 478 99 38 47",
  picture: "https://firebasestorage.googleapis.com/v0/b/durf2030-65052.appspot.com/o/users%2F8SzbHZQ7UygNou338Vks4KTPmf93%2Faar_output.png?alt=media&token=9cacae59-d379-4511-a768-ffde73587287",
  publicMail: true,
  publicPhone: true,
  role: 0,
  statistics: {
    upvotes: ['7ogVf47Ir8Y9xUqMCf0J'],
    downvotes: []
  },
  name: "miguel",
  unlockedBadges: [],
  votes: []
}

test("Create new User with data", () => {
  const user = new User(userData);
  expect(user.interestedTags).toBeInstanceOf(Array);
  expect(user.statistics.upvotes).toBeInstanceOf(Array)
  expect(user.statistics.downvotes).toBeInstanceOf(Array)
  expect(user.unlockedBadges).toBeInstanceOf(Array)
  expect(user.votes).toBeInstanceOf(Array)
  expect(user.role).toBe(0)
});

test("Create new User", () => {
  const user = new User({id: 'id'});
  expect(user.publicMail).toBe(false)
  expect(user.publicPhone).toBe(false)
  expect(user.role).toBe(0)
  expect(user.exp).toBe(0)
  expect(user.level).toBe(0)
});

test("Update bio", () => {
  const user = new User({id: 'id'});
  const story = 'This is a story about a bird that couldn"t fly'
  user.updateBio(story)
  expect(user.bio).toBe(story)
});

test("Update profile image", () => {
  const user = new User({id: 'id'});
  const imgurl = 'inserImageUrl'
  user.updateImage(imgurl)
  expect(user.picture).toBe(imgurl)
});

test("Update id", () => {
  const user = new User({id: 'id'});
  const id = 'dwadawd2131241'
  user.changeId(id)
  expect(user.id).toBe(id)
});

test("add projectVote", () => {
  const user = new User({id: 'id'});
  const id = 'id of the project'
  user.addProjectVote(id)
  expect(user.votes[user.votes.length-1]).toBe(id)
});

test("add badge", () => {
  const user = new User({id: 'id'});
  const id = 'We are the badge'
  user.addBadge(id)
  expect(user.unlockedBadges[user.unlockedBadges.length-1]).toBe(id)
});

test("add badge", () => {
  const user = new User({id: 'id'});
  expect(user.interestedTags).toBeInstanceOf(Array)
  expect(user.interestedTags.length).toBe(0)
  const tags = ['een', 'twee', 'drie']
  user.setTags(tags)
  expect(user.interestedTags[2]).toBe('drie')
});