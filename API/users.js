  
const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: 1,
    username: 'tester',
    password: '$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou', // testerpassword
    firstname: 'Tester',
    lastname: 'The Jester',
    dateJoined: '2020-01-01',
    email: 'testerthejester@mail',
    location: 'Oulu, Finland'
  },
];

module.exports = {
  getUserById: (id) => users.find(u => u.id == id),
  getUserByName: (username) => users.find(u => u.username == username),
  addUser: (username,
    password,
    firstname,
    lastname,
    dateJoined,
    email,
    location) => {
    users.push({
      id: uuidv4(),
      username,
      password,
      firstname,
      lastname,
      dateJoined,
      email,
      location
    });
  }

}