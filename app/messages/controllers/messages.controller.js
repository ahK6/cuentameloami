const MessagesModel = require("../models/messages.model");

exports.createRoom = async (data) => {
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

exports.joinToRoom = async (data) => {
  const { chatId, idUserHelping } = data;

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

exports.getRoomById = async (roomId) => {
  console.log("roommm id " + roomId);
  try {
    const roomInfo = await MessagesModel.findOne({ _id: roomId });

    if (!roomInfo) {
      return 404;
    }

    return roomInfo;
  } catch (error) {
    return false;
  }
};
