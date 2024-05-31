const mongoose = require("mongoose");
const { Schema } = mongoose;

const likesPostsSchema = new Schema(
  {
    idPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
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

const likePosts = mongoose.model("likesPosts", likesPostsSchema);

module.exports = likePosts;
