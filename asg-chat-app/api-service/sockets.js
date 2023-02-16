const msg = require('./schemas/chat.ts')
const user = require('./schemas/user.ts')
const { default: mongoose } = require('mongoose');


module.exports = (server) =>{
const socketIo = require('socket.io')(server)
    socketIo.on('connection', (socket) =>{
    
        socket.on("send-message",async (message)=>{
            let id=message._id
          try{ 
      
             var data=  await msg.findByIdAndUpdate(mongoose.Types.ObjectId(message._id),{
                $push: {messages: [{message:message.messages.message,
                                  timeStamp:message.messages.timeStamp,
                                  sender:mongoose.Types.ObjectId(message.messages.sender)}]
                                }})
                   if(data){
                    await socketIo.sockets.emit("back-to-chatroom",[id,message.messages])
                    console.log("file sent!", id)
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
      
        socket.on("delete-chat-room", async(id)=>{
          try{
            let res = await msg.findByIdAndRemove(id)
            if(res){
                console.log(res)
              await socketIo.sockets.emit("delete-chat-results",res)
            }
          }
          catch(err){
            console.log(err)
          }
        })
        
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
}