const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportsSchema = new Schema(
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

const reports = mongoose.model("reports", reportsSchema);

module.exports = reports;
