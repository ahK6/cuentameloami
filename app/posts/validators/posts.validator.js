const Joi = require("joi");

const createpostValidation = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Titulo es requerido",
  }),
  content: Joi.string().required().messages({
    "any.required": "Contenido es requerido",
  }),
  keywords: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Palabras claves son requeridas",
    "array.base": "Palabras claves debe ser un arreglo",
    "array.includes": "Cada palabra clave debe ser un string",
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
});

exports.getPostByIdValidation = (req, res, next) => {
  const { error } = getPostByIdValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const searchPostsValidation = Joi.object({
  q: Joi.string().optional().trim().max(100).messages({
    "string.max": "Query debe ser un string de máximo 100 caracteres",
  }),
  keywords: Joi.string().optional().custom((value) => {
    if (value) {
      const keywordArray = value.split(',');
      if (keywordArray.length > 10) {
        throw new Error('Máximo 10 keywords permitidos');
      }
    }
    return value;
  }).messages({
    "any.custom": "Máximo 10 keywords permitidos",
  }),
  page: Joi.number().integer().min(1).optional().default(1).messages({
    "number.base": "Page debe ser un número",
    "number.integer": "Page debe ser un número entero",
    "number.min": "Page debe ser mayor a 0",
  }),
  limit: Joi.number().integer().min(1).max(50).optional().default(10).messages({
    "number.base": "Limit debe ser un número",
    "number.integer": "Limit debe ser un número entero",
    "number.min": "Limit debe ser mayor a 0",
    "number.max": "Limit no puede ser mayor a 50",
  }),
  type: Joi.string().valid("requesting", "helping").optional().messages({
    "any.only": "Type debe ser requesting o helping",
  }),
});

exports.searchPostsValidation = (req, res, next) => {
  const { error } = searchPostsValidation.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};