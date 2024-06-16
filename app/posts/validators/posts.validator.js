const Joi = require("joi");

const createpostValidation = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Titulo es requerido",
  }),
  content: Joi.string().required().messages({
    "any.required": "Contenido es requerido",
  }),
  keywords: Joi.string().required().messages({
    "any.required": "Palabras claves son requeridas",
  }),
});

exports.createpostValidation = (req, res, next) => {
  const { error } = createpostValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const getPostByIdValidation = Joi.object({
  idPost: Joi.string().required().messages({
    "any.required": "ID del post es requerido",
  }),
});

exports.getPostByIdValidation = (req, res, next) => {
  const { error } = getPostByIdValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
