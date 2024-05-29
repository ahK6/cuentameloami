const CommentsModel = require("../models/comments.model");

exports.createPost = async (req, res) => {
  const comment = new CommentsModel(req.body);
  const { id } = req.user;

  try {
    comment.idUserCreator = id;
    await comment.save();

    res.status(200).json({ message: "Publicación hecha con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
