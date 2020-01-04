var express = require('express');
var socket = require('socket.io');

// app setup
const app = express();
const port = 4000;

const server = app.listen(port, function () {
    console.log('listening to request on port 4000');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket io connection', socket.id)

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});