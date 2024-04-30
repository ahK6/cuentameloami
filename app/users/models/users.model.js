const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    nickName: {
      type: String,
      trim: true,
      require: true,
    },
    birthday: {
      type: String,
    },
    status: {
      type: String,
      default: "pending", //pending / active / banned
    },
    bannedComment: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
    },
    aboutMe: {
      type: String,
    },
    profession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "professions",
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
