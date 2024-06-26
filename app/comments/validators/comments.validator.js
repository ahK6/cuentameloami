const Joi = require("joi");

const createCommentValidation = Joi.object({
  idPost: Joi.string().required().messages({
    "any.required": "ID del post es requerido",
  }),
  content: Joi.string().required().messages({
    "any.required": "Contenido del comentario es requerido",
  }),
});

exports.createCommentValidation = (req, res, next) => {
  const { error } = createCommentValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
