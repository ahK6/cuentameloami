const Joi = require("joi");

const createReportMessageValidation = Joi.object({
  idRoom: Joi.string().required().messages({
    "any.required": "ID de la sala es requerido",
  }),
  reporterId: Joi.string().required().messages({
    "any.required": "ID del usuario que reporta es requerido",
  }),
});

exports.validateCreateReportMessage = (req, res, next) => {
  const { error } = createReportMessageValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
