const MessagesModel = require("../models/messages.model");

exports.createChat = async (data) => {
  const message = new MessagesModel(data);

  try {
    console.log(data);
    const result = await message.save();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.joinToChat = async (data) => {
  const { chatId, idUserHelping } = data;

  console.log("dataaaaa " + JSON.stringify(data));

  try {
    const updatedUser = await MessagesModel.findByIdAndUpdate(
      { _id: chatId },
      { idUserHelping },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return 404;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
