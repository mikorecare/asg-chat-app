
// const io = require('../server').getIo()

const http = require('http')
const express = require('express')
const app = express();
const chatRoute = express.Router()
const { default: mongoose } = require('mongoose')
let Chat = require('../schemas/chat.ts')





//get chat list
chatRoute.route('/chats').get((req, res) => {
  Chat.find((error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

//chat findById
chatRoute.route('/chat/:id').get(async (req,res)=>{
  
  try {
    let result = await Chat.aggregate([
     { $match : {
        _id: mongoose.Types.ObjectId(req.params.id) 
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
 
     res.send(result);
    
 } catch (e) {
     res.send(null)
 }
});

chatRoute.route('/chats-list').post(async (req,res) =>{

  try {
   let result = await Chat.aggregate([
    { $match : { users : { $in :  [mongoose.Types.ObjectId(req.body.myId)]  } } },
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
    res.send(result);
} catch (e) {
    res.send(null)
}
})

chatRoute.route('/send').post((res, req) =>{
  
    Chat.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
            pusher.trigger(data._id, "message" ,  {
                sender: req.body.userId,
                message: req.body.message
              });
        }
      })
})

module.exports = chatRoute;
