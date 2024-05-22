const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
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

const rooms = mongoose.model("rooms", roomSchema);

module.exports = rooms;
