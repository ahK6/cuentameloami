const PostsModel = require("../models/posts.model");
const KeywordsModel = require("../models/keywords.model");
const CommentsModel = require("../../comments/models/comments.model");

exports.createPost = async (req, res) => {
  const posts = new PostsModel(req.body);
  const { id } = req.user;

  try {
    posts.idUserCreator = id;
    const post = await posts.save();

    res
      .status(200)
      .json({ message: "Publicación hecha con éxito", data: post });
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

    res.status(200).json({ data: allPost, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.getPostById = async (req, res) => {
  const { idPost } = req.query;

  try {
    const postInfo = await PostsModel.findOne({ _id: idPost }).populate({
      path: "idUserCreator",
      select: "nickName",
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

exports.searchPosts = async (req, res) => {
  try {
    const {
      q: query = '',
      keywords = '',
      page = 1,
      limit = 10,
      type = 'requesting' // requesting | helping
    } = req.query;

    // Crear filtros de búsqueda
    let searchFilter = {};
    
    // Filtro por tipo de post
    if (type) {
      searchFilter.type = type;
    }

    // Filtro por texto (título y contenido)
    if (query && query.trim() !== '') {
      searchFilter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ];
    }

    // Filtro por keywords
    if (keywords && keywords.trim() !== '') {
      const keywordArray = keywords.split(',').map(k => k.trim());
      searchFilter.keywords = { $in: keywordArray };
    }

    // Calcular skip para paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Buscar posts
    const posts = await PostsModel.find(searchFilter)
      .populate('idUserCreator', 'name nickName')
      .populate('keywords', 'value')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Contar total de documentos
    const total = await PostsModel.countDocuments(searchFilter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      data: posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      },
      filters: {
        query,
        keywords: keywords.split(',').filter(k => k.trim()),
        type
      }
    });

  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({
      message: "Error al buscar posts",
      error: error.message
    });
  }
};
