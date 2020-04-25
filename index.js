
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    console.log("connection created");
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('handleBeedClick', function(beedId) {
        console.log("inside server handleBeedClick, beedId" , beedId);
        io.emit('handleBeedClick', beedId);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});