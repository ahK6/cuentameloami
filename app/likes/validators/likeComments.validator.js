const Joi = require("joi");

const createLikeCommentValidation = Joi.object({
  idComment: Joi.string().required().messages({
    "any.required": "ID del comentario es requerido",
  }),
  userId: Joi.string().required().messages({
    "any.required": "ID del usuario que da like es requerido",
  }),
});

exports.createLikeCommentValidation = (req, res, next) => {
  const { error } = createLikeCommentValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const createLikePostValidation = Joi.object({
  idPost: Joi.string().required().messages({
    "any.required": "ID del post es requerido",
  }),
  userId: Joi.string().required().messages({
    "any.required": "ID del usuario que da like es requerido",
  }),
});

exports.createLikePostValidation = (req, res, next) => {
  const { error } = createLikePostValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
