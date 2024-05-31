const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeCommentsSchema = new Schema(
  {
    idComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const likeComments = mongoose.model("likeComments", likeCommentsSchema);

module.exports = likeComments;
