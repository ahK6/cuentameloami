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
