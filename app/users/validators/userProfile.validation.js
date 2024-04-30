const Joi = require("joi");

const banValidation = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "ID de usuario requerido",
  }),
  banMessage: Joi.string().required().messages({
    "any.required": "El motivo del baneo es requerido",
  }),
});

exports.validateBan = (req, res, next) => {
  const { error } = banValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
