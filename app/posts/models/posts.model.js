const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    idUserCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      default: "open", //open //closed //deleted
    },
  },
  {
    timestamps: true,
  }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
