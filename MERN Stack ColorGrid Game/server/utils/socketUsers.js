
let users = [];


const addUser = (socketId, userId, username, room = 'waiting', playerProfilePic) => {

  userId = userId.toString();
  username = username.trim().toLowerCase();


  const existingUser = users.find(user => user.userId === userId || user.socketId === socketId);


  if (existingUser) {
    return { error: 'User is already connected' };
  }


  const user = { socketId, userId, username, room, playerProfilePic };
  users.push(user);
  return { user };
};


const removeUser = socketId => {
  const index = users.findIndex(user => user.socketId === socketId);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};


const getUser = socketId => users.find(user => user.socketId === socketId);


const getUsersInRoom = room => users.filter(user => user.room === room);


const getUsers = () => users;

export { addUser, removeUser, getUser, getUsersInRoom, getUsers };
