const LikeCommentsModel = require("../models/likeComments.model");
const CommentsModel = require("../../comments/models/comments.model");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createLikeComment = async (req, res, next) => {
  const { idComment, userId } = req.body;
  const liked = new LikeCommentsModel(req.body);

  try {
    if (!esIdMongo(idComment)) {
      return res.status(500).json({ message: "ID de comentario invalido" });
    }

    if (!esIdMongo(userId)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }

    const commentInfo = await CommentsModel.findOne({ _id: idComment });

    if (!commentInfo) {
      return res.status(404).json({
        message: "El comentario no existe",
      });
    }

    const likesCommentInfo = await LikeCommentsModel.findOne({
      idComment,
      userId,
    });

    if (likesCommentInfo) {
      return res.status(404).json({
        message: "Ya has dado like a este comentario",
      });
    }

    await liked.save();
    res.status(200).json({ message: "Tu like se ha añadido" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
