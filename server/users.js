const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const deleteUser = (id) => {
  const idx = users.findIndex((user) => user.id === id);

  if (idx) {
    return users.splice(idx, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id)
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const getUsers = () => {
  return users;
};

module.exports = { addUser, deleteUser, getUser, getUsersInRoom, getUsers };
