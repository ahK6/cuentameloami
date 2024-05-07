const MessagesModel = require("../models/messages.model");

exports.createChat = async (req, res, next) => {
  const message = new MessagesModel(req.body);

  try {
    await message.save();
    res.status(200).json({ message: "Se ha creado un chat" });
  } catch (error) {
    //si ocurre un problema devolvera el error

    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
