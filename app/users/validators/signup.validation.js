const Joi = require("joi");

const signUpValidation = Joi.object({
  phoneNumber: Joi.string(),
  password: Joi.string().required().messages({
    "any.required": "Contraseña es requerida",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "org", "net", "gov", "co", "us", "io", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Ingresa un correo electrónico válido",
      "any.required": "Correo electrónico es requerido",
    }),
  name: Joi.string().optional(),
  lastName: Joi.string().optional(),
  nickName: Joi.string().required().messages({
    "any.required": "Apodo es requerido",
  }),
  birthday: Joi.string().optional(),
  country: Joi.string().optional(),
  aboutMe: Joi.string().optional(),
  profession: Joi.string().optional(),
});

exports.validateSignUp = (req, res, next) => {
  const { error } = signUpValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
