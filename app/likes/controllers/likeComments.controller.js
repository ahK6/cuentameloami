const LikeCommentsModel = require("../models/likeComments.model");
const CommentsModel = require("../../comments/models/comments.model");

exports.createLikeComment = async (req, res, next) => {
  const { idPost, idUser } = req.body;
  const liked = new LikeCommentsModel(req.body);

  try {
    if (!esIdMongo(idPost)) {
      return res.status(500).json({ message: "ID de comentario invalido" });
    }

    if (!esIdMongo(idUser)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }
    const commentInfo = await CommentsModel.findOne({ _id: idPost });

    if (!commentInfo) {
      return res.status(404).json({
        message: "El comentario no existe",
      });
    }

    await liked.save();
    res.status(200).json({ message: "Tu like se ha añadido" });
  } catch (error) {
    console.log("fwefef " + JSON.stringify(error));
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
