

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


 let users = new Schema({
    username: {
      required: true,  
      type: String,
      unique: true
    },
    firstName: {
        required: true,
      type: String
    },
    lastName: {
        required: true,
      type: String
    },
    password: {
        required: true,
        type: String
      }
  }, {
    collection: 'users'
  })

  
  module.exports = mongoose.model("users", users);