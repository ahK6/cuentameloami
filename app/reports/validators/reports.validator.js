const Joi = require("joi");

const createReportValidation = Joi.object({
  idRoom: Joi.string().required().messages({
    "any.required": "ID de la sala es requerido",
  }),
  reporterId: Joi.string().required().messages({
    "any.required": "ID del usuario que reporta es requerido",
  }),
});

exports.validateCreateReport = (req, res, next) => {
  const { error } = createReportValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
