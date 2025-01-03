const mongoose = require("mongoose");
const { Schema } = mongoose;

const keywordsSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const keywords = mongoose.model("keywords", keywordsSchema);

module.exports = keywords;
