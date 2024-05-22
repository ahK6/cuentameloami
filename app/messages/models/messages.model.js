const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
    },
    idRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const messages = mongoose.model("messages", messageSchema);

module.exports = messages;
