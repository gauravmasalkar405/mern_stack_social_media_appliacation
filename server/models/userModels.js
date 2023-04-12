const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 30,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    isProfilePicSet: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
