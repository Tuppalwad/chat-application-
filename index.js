
const users={};
var express= require('express');
var app = express();
var http = require('http').createServer(app);
var socketIo = require("socket.io")(http,{
    cors:{
        origin:"*"
    }
})
http.listen(3000,function(){
    console.log('server started...')
    socketIo.on('connection',function(socket){
        
        console.log('user connected:',socket.id);

        socket.on('new-user-joined',names=>{
            users[socket.id]=names;
            socket.broadcast.emit('user-joined',names);
        });

        socket.on('send',message=>{
            socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
        });

        socket.on('disconnect',message=>{
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.io];
        });

    });
});