const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    idUserCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    idPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },

    content: {
      type: String,
    },
    status: {
      type: String,
      default: "visible", //deleted
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const comments = mongoose.model("comments", commentsSchema);

module.exports = comments;
