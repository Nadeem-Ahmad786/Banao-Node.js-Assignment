const mongoose = require('mongoose');
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email:{
    type: String,
    required: true,
    validate: validator.isEmail,
  },
  password:{
    type:String,
    required: true,
  }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;