const LikePostModel = require("../models/likePost.model");
const PostsModel = require("../../posts/controllers/posts.controller");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.createLikeComment = async (req, res, next) => {
  const { idPost, userId } = req.body;
  const liked = new LikePostModel(req.body);

  try {
    if (!esIdMongo(idPost)) {
      return res.status(500).json({ message: "ID de post invalido" });
    }

    if (!esIdMongo(userId)) {
      return res.status(500).json({ message: "ID de usuaro invalido" });
    }

    const postInfo = await PostsModel.findOne({ _id: idPost });

    if (!postInfo) {
      return res.status(404).json({
        message: "El post no existe",
      });
    }

    const likesPostInfo = await LikePostModel.findOne({
      idPost,
      userId,
    });

    if (likesPostInfo) {
      return res.status(404).json({
        message: "Ya has dado like a este post",
      });
    }

    await liked.save();
    res.status(200).json({ message: "Has dado like" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
