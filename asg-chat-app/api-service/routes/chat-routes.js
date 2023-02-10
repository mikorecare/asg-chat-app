
const express = require('express');
const Pusher = require("pusher");
const chatRoute = express.Router();
let Chat = require('../schemas/chat.ts');

//get chat list
chatRoute.route('/').get(async(res, req)=>{
    Chat.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
});

chatRoute.route('/chat/:id').post((res,req)=>{
    Chat.findById(req.params.id,(error, data) =>{
        if (error) {
            return next(error)
          } else {
            res.json(data)
          }
    })
});

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

const pusher = new Pusher({
  appId: "1552456",
  key: "e72e3cfda8a1a4f93f7c",
  secret: "9a05761b233482b53260",
  cluster: "ap1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});
