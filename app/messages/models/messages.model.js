const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    topic: {
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
    idUserHelping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    canSetPublic: {
      type: Boolean,
      required: true,
    },
    canSeeCreatorInformation: {
      type: Boolean,
      required: true,
    },
    chatStatus: {
      type: String,
      default: "searching", //searching //open //ended
    },
  },
  {
    timestamps: true,
  }
);

const messages = mongoose.model("messages", messagesSchema);

module.exports = messages;
