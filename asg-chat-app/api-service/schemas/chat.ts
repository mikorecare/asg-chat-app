
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 let chats = new Schema({
    users:  [{ref: 'users',type: mongoose.Types.ObjectId}],
    messages: [{body: String, date: Date }]
 },
 {collection: 'chats'});

  
  module.exports = mongoose.model("chats", chats);