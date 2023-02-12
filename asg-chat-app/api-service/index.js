
const Server = require('./server')
Server.start();
const io = Server.getIo();
io.on('connection', (socket) =>{
  socket.emit("message","Hi Client!");
  socket.on("message",(message)=>{
    console.log(message)
  });
})


