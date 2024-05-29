const CommentsModel = require("../models/comments.model");
const PostsModel = require("../../posts/models/posts.model");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createComment = async (req, res) => {
  const { idPost } = req.body;
  const comment = new CommentsModel(req.body);
  const { id } = req.user;

  try {
    if (!esIdMongo(idPost)) {
      return res.status(500).json({ message: "ID de post invalido" });
    }

    const postInfo = await PostsModel.findOne({ _id: idPost });

    if (!postInfo) {
      return res.status(404).json({
        message: "El post no existe",
      });
    }

    comment.idUserCreator = id;
    await comment.save();

    res.status(200).json({ message: "Comentario hecho con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
