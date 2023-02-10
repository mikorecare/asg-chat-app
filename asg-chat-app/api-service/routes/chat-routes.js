
const express = require('express');
const chatRoute = express.Router();
const { default: mongoose } = require('mongoose');
let Chat = require('../schemas/chat.ts');

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

chatRoute.route('/chat/:id').post((res,req)=>{
    Chat.findById(req.params.id,(error, data) =>{
        if (error) {
            return next(error)
          } else {
            res.json(data)
          }
    })
});

chatRoute.route('/chat-users/:id/:p_id').post((res,req,next) =>{
  Chat.findById(req.params.id,
    (error,data)=> {
      if (error) {
        return next({message: "hahaha"})
      }
      else if(data.length<1){
        res.next({message: data});
      }
      else{
        res.next({message: "Found 1!"})
      }
    }
  )
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
