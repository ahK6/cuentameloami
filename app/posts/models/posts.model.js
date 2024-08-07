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
    type: {
      type: String, //requesting //helping
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

postSchema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "idPost",
});

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
