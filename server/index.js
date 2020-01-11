const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('We have a new connection');

  socket.on('join', ({ name, room }, cb) => {
    // const error = false;
    console.log('Join', name, room);

    // if (error) {
    //   cb({ error: 'error' });
    // }


    cb()
  });
  
  socket.on('disconnect', () => {
    console.log('User has left!!!');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
