
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 let chats = new Schema({
    users:  [{ref: 'users',type: mongoose.Types.ObjectId}],
      messages: [{message:[{type: String}], timeStamp: [{type: Number}], sender:[{ref: 'users',type: mongoose.Types.ObjectId}]}]
 },
 {collection: 'chats'});

  
  module.exports = mongoose.model("chats", chats);