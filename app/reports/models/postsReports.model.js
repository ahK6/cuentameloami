const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsReportsSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending", //close
    },
    comments: {
      type: String,
    },
    idPosts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const postsReports = mongoose.model("postsReports", postsReportsSchema);

module.exports = postsReports;
