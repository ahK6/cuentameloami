const mongoose = require("mongoose");

exports.esIdMongo = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
