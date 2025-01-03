const PostsModel = require("../models/posts.model");
const KeywordsModel = require("../models/keywords.model");
const CommentsModel = require("../../comments/models/comments.model");

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
  const { page, pageSize, type } = req.query;

  console.log("paramss " + typeof page + " pagesize " + typeof pageSize);

  try {
    const pageInt = parseInt(page) || 1;
    const pageSizeInt = parseInt(pageSize) || 100;

    const totalPosts = await PostsModel.countDocuments({ type });

    const totalPages = Math.ceil(totalPosts / pageSizeInt);

    const allPost = await PostsModel.find({ type })
      .populate({
        path: "idUserCreator",
        select: "nickName",
      })
      .populate({
        path: "comments",
        select: "_id", // Solo obtenemos el ID de los comentarios para poder contar
      })
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

exports.getPostById = async (req, res) => {
  const { idPost, page, pageSize } = req.body;

  try {
    const postInfo = await PostsModel.findOne({ _id: idPost }).populate({
      path: "comments",
      options: {
        skip: (page - 1) * pageSize, // Saltar los comentarios ya paginados
        limit: pageSize, // Limitar el número de comentarios
      },
    });

    if (!postInfo) {
      return res.status(404).json({
        message: "El post no existe",
      });
    }

    res.status(200).json({ data: postInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.getKeyWords = async (req, res) => {
  try {
    const keywordsList = await KeywordsModel.find();

    if (!keywordsList) {
      return res.status(404).json({
        message: "No hay palabras claves disponibles",
      });
    }

    res.status(200).json({ data: keywordsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
