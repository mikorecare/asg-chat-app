
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 let chats = new Schema({
   users:  [{ref: 'users',type: mongoose.Types.ObjectId}],
   messages: [{message:{type: String}, 
         timeStamp: {type: Date},_id: false,
         sender:{type: mongoose.Types.ObjectId, 
         required: true,
         ref:"users"}}]
 },
 {collection: 'chats'});

  
  module.exports = mongoose.model("chats", chats);