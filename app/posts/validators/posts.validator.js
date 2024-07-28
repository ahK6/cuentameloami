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
  type: Joi.string().valid("requesting", "helping").required().messages({
    "any.only": "Tipo de publicación invalido",
    "any.required": "Tipo de publicación es requerido",
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
  page: Joi.string().required().messages({
    "any.required": "Numero de pagina es requerido",
  }),
  pageSize: Joi.string().required().messages({
    "any.required": "Comentarios a mostrar es requerido",
  }),
});

exports.getPostByIdValidation = (req, res, next) => {
  const { error } = getPostByIdValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
