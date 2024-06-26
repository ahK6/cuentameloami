const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesReportsSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending", //close
    },
    comments: {
      type: String,
    },
    idRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
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

const messagesReports = mongoose.model(
  "messagesReports",
  messagesReportsSchema
);

module.exports = messagesReports;
