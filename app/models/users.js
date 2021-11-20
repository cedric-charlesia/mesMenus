const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      max: 1024
    }
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;