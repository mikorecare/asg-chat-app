
const express = require('express')
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

chatRoute.route('/chat').post((req,res)=>{
    Chat.findById(req.params.id,(error, data) =>{
        if (error) {
            return next(error)
          } else {
            res.json(data)
          }
    })
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
