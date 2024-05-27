const PostsModel = require("../models/posts.model");

exports.createPost = async (req, res) => {
  const posts = new PostsModel(req.body);
  const { id } = req.user;

  try {
    posts.idUserCreator = id;
    await posts.save();

    res.status(200).json({ message: "Publicación hecha con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
