const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email es requerido",
  }),
  password: Joi.string().required().messages({
    "any.required": "Contraseña es requerida",
  }),
});

exports.validateLogin = (req, res, next) => {
  const { error } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
