const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
const { addUser, deleteUser, getUser, getUsersInRoom, getUsers } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('We have a new connection');
  socket.on('join', ({ name, room }, cb) => {
    console.log('Join', name, room);
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log('usersss', user);
    if (error) return cb(error);
    
    console.log('User', user);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
    socket.join(user.room);

    cb();
  });

  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id);
    console.log(getUsers());
    console.log(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    cb();
  });
  
  socket.on('disconnect', () => {
    console.log('User has left!!!');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
