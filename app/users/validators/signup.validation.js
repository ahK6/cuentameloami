const Joi = require("joi");

const userValidation = Joi.object({
  phoneNumber: Joi.string().required().messages({
    "any.required": "Phone number is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "org", "net", "gov", "co", "us", "io", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "any.required": "Email is required",
    }),
  name: Joi.string().optional(),
  lastName: Joi.string().optional(),
  nickName: Joi.string().required().messages({
    "any.required": "Nickname is required",
  }),
  birthday: Joi.string().optional(),
  country: Joi.string().optional(),
  aboutMe: Joi.string().optional(),
  profession: Joi.string().optional(),
});

exports.validateSignUp = (req, res, next) => {
  console.log("xdd " + JSON.stringify(req.body));
  const { error } = userValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
