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

exports.getAllPost = async (req, res) => {
  const { page, pageSize } = req.query;

  console.log("paramss " + typeof page + " pagesize " + typeof pageSize);

  try {
    const pageInt = parseInt(page) || 1;
    const pageSizeInt = parseInt(pageSize) || 100;

    const allPost = await PostsModel.find()
      .skip((pageInt - 1) * pageSizeInt)
      .limit(pageSizeInt)
      .exec();

    res.status(200).json({ data: allPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
