const Joi = require("joi");

const createChatValidation = Joi.object({
  topic: Joi.string().required().messages({
    "any.required": "Tema es requerido",
  }),
  keywords: Joi.string().required().messages({
    "any.required": "Palabras claves son requeridas",
  }),
  idUserCreator: Joi.string().required().messages({
    "any.required": "Usuario creador es requerido",
  }),
  canSetPublic: Joi.string().required().messages({
    "any.required":
      "Establece si el chat puede mostrarse al público después de finalizado",
  }),
  canSeeCreatorInformation: Joi.string().required().messages({
    "any.required": "Establece si deseas que tu información sea visible",
  }),
});

exports.validateCreateChat = (req, res, next) => {
  const { error } = createChatValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
