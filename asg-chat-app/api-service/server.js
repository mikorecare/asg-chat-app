const msg = require('./schemas/chat.ts')
const user = require('./schemas/user.ts')
const { default: mongoose } = require('mongoose');
const express = require('express');
const path = require('path');
const db = require('./db')
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const http = require('http');
const userRoute = require('././routes/user-routes');
const chatRoute = require('././routes/chat-routes');
const app = express();

server = http.Server(app)
const socketIo = require('socket.io')(server)
socketIo.removeAllListeners()

module.exports = {
    start
}

function start(){
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
      }),
    );
    app.use(cors());
    
    // Static directory path
    app.use(express.static(path.join(__dirname, 'dist/asg-chat-app')));
    // API root
    app.use('/api', userRoute);
    app.use('/api', chatRoute);
    
    // PORT
    const port = process.env.PORT || 8000
    
    // 404 Handler
    app.use((req, res, next) => {
      next(createError(404))
    });
    // Base Route
    app.get('/', (req, res) => {
      res.send('invaild endpoint')
    });
    app.get('*', (req, res) => {
      res.sendFile(
        path.join(__dirname, 'dist/asg-chat-app/index.html'),
      )
    });
    // error handler
    app.use(function (err, req, res, next) {
      console.error(err.message)
      if (!err.statusCode) err.statusCode = 500
      res.status(err.statusCode).send(err.message)
    });
    
    db();
    
    server.listen(port, () => {
      console.log('Listening on port ' + port)
    });
    
}





//SOCKET
socketIo.on('connection', (socket) =>{
    
  socket.on("send-message",async (message)=>{
    try{ 

       var data=  await msg.findByIdAndUpdate(mongoose.Types.ObjectId(message._id),{
          $push: {messages: [{message:message.messages.message,
                            timeStamp:message.messages.timeStamp,
                            sender:mongoose.Types.ObjectId(message.messages.sender)}]
                          }})
             if(data){
              await socketIo.sockets.emit("back-to-chatroom",message.messages)
              console.log("file sent!", message.messages)
             }
             
          
  
    }catch(e){
        console.log(e)
    }
      
  });

  socket.on("search-query", async (query)=>{
    let finalQuery = '^'+query;
    try{
      var data = await user.find({firstName:{$regex : finalQuery, $options: 'i'}})
      if(data){
        await socketIo.sockets.emit("search-results",data)
      }
    }
    catch(err){
      console.log(err)
    }
  });

  socket.on("create-chat-room", async (users)=>{
    let [currentUser, otherUser] = users;
    try{
      let result = await msg.find({users: {$all:[mongoose.Types.ObjectId(currentUser),mongoose.Types.ObjectId(otherUser)]}
      })
      console.log(result)
      if(result.length>0){
        console.log("result",result)
        await socketIo.sockets.emit("chat-room-exists",data)
      }
      else{
        try{
          let room = await msg.create({id: new mongoose.Types.ObjectId,users:[mongoose.Types.ObjectId(currentUser),mongoose.Types.ObjectId(otherUser)],messages:[]})
          if(room){
            let updatedRoom = await msg.aggregate([
              { $match : {
                 _id: mongoose.Types.ObjectId(room._id) 
               } 
             } ,
             {
              $lookup: 
              {
                 from: "users",
                 localField: "users",
                 foreignField: "_id",
                 as: "chats_users"
               }},
               {
                $project: {
                  chats_users:1,
                  messages: 1,
                  _id: 1
                }
               }
              ])
              await socketIo.emit("chat-room-result",updatedRoom)
              // await socketIo.emit("chat-room-result",updatedRoom);
              // console.log("room created",updatedRoom)
              // console.log("chat users",updatedRoom.chats_users)
            }
          }
          catch(err){
            console.log(err)
          }
      }
    }
    catch(err){

    }
    
  })

})