const MessageModel = require("../models/messages.model");

exports.saveChat = async (data) => {
  const message = new MessageModel(data);

  console.log("aveerrkljwerfklwjef " + JSON.stringify(data));

  try {
    await message.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
