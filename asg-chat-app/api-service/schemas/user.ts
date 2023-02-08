

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const variables = require("../variables.ts") 
 const dateOptions1 = variables.dateOptions;
 const emailRegex1 = variables.emailRegex;
const userSchema = new Schema(
    {
      email: {
        match: emailRegex1,
        required: true,
        type: String,
        unique: true,
      },
      firstName: String,
      lastName: String,
      password: { type: String, required: true, select: false },
    },
    dateOptions1
  );
  
  module.exports = mongoose.model("users", userSchema);