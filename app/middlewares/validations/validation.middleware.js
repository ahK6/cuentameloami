const validate = (schema) => {
    return (req, res, next) => {
        const validationObjects = {};

        if (schema.params) {
            validationObjects.params = req.params;
        }
        if (schema.query) {
            validationObjects.query = req.query;
        }
        if (schema.body) {
            validationObjects.body = req.body;
        }

        const errors = [];

        Object.keys(validationObjects).forEach((key) => {
            const { error } = schema[key].validate(validationObjects[key], {
                abortEarly: false,
                allowUnknown: false,
                stripUnknown: true,
            });

            if (error) {
                error.details.forEach((detail) => {
                    errors.push({
                        field: detail.path.join("."),
                        message: detail.message,
                        type: detail.type,
                    });
                });
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Errores de validación",
                errors: errors,
            });
        }

        next();
    };
};

module.exports = validate;
