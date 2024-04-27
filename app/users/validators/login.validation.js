const Joi = require("joi");

const loginValidation = Joi.object({
  phoneNumber: Joi.string().required().messages({
    "any.required": "Phone number is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

exports.validateLogin = (req, res, next) => {
  const { error } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
