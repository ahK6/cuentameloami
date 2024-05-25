const Joi = require("joi");

const updateReportValidation = Joi.object({
  reportId: Joi.string().required().messages({
    "any.required": "ID del reporte es requerido",
  }),
  comments: Joi.string().required().messages({
    "any.required": "Observacion del reporte es requerida",
  }),
});

exports.validateUpdateReport = (req, res, next) => {
  const { error } = updateReportValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
