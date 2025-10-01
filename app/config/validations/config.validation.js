const Joi = require("joi");

// Validación para obtener configuración de usuario
const getUserConfig = {
    params: Joi.object().keys({
        userId: Joi.string().required().hex().length(24).messages({
            "string.empty": "El ID de usuario es requerido",
            "string.hex": "El ID de usuario debe ser un ObjectId válido",
            "string.length": "El ID de usuario debe tener 24 caracteres",
        }),
    }),
};

// Validación para actualizar una configuración específica
const updateSingleSetting = {
    params: Joi.object().keys({
        userId: Joi.string().required().hex().length(24),
    }),
    body: Joi.object().keys({
        setting: Joi.string()
            .required()
            .valid("notifications", "contactInfoVisible")
            .messages({
                "string.empty": "El nombre de la configuración es requerido",
                "any.only":
                    "La configuración debe ser: notifications o contactInfoVisible",
            }),
        value: Joi.boolean().required().messages({
            "any.required": "El valor es requerido",
            "boolean.base": "El valor debe ser verdadero o falso",
        }),
    }),
};

// Validación para actualizar múltiples configuraciones
const updateMultipleSettings = {
    params: Joi.object().keys({
        userId: Joi.string().required().hex().length(24),
    }),
    body: Joi.object()
        .keys({
            notifications: Joi.boolean().messages({
                "boolean.base":
                    "Las notificaciones deben ser verdadero o falso",
            }),
            contactInfoVisible: Joi.boolean().messages({
                "boolean.base":
                    "La visibilidad de contacto debe ser verdadero o falso",
            }),
        })
        .min(1)
        .messages({
            "object.min":
                "Debe proporcionar al menos una configuración para actualizar",
        }),
};

// Validación para actualizar mi configuración (sin userId en params)
const updateMyConfig = {
    body: Joi.object()
        .keys({
            notifications: Joi.boolean().messages({
                "boolean.base":
                    "Las notificaciones deben ser verdadero o falso",
            }),
            contactInfoVisible: Joi.boolean().messages({
                "boolean.base":
                    "La visibilidad de contacto debe ser verdadero o falso",
            }),
        })
        .min(1)
        .messages({
            "object.min":
                "Debe proporcionar al menos una configuración para actualizar",
        }),
};

// Validación para actualizar una configuración específica (mi config)
const updateMySingleSetting = {
    body: Joi.object().keys({
        setting: Joi.string()
            .required()
            .valid("notifications", "contactInfoVisible")
            .messages({
                "string.empty": "El nombre de la configuración es requerido",
                "any.only":
                    "La configuración debe ser: notifications o contactInfoVisible",
            }),
        value: Joi.boolean().required().messages({
            "any.required": "El valor es requerido",
            "boolean.base": "El valor debe ser verdadero o falso",
        }),
    }),
};

// Validación para resetear configuración
const resetConfig = {
    params: Joi.object().keys({
        userId: Joi.string().required().hex().length(24).messages({
            "string.empty": "El ID de usuario es requerido",
            "string.hex": "El ID de usuario debe ser un ObjectId válido",
            "string.length": "El ID de usuario debe tener 24 caracteres",
        }),
    }),
};

// Validación para endpoints que no requieren parámetros
const noParams = {};

module.exports = {
    getUserConfig,
    updateSingleSetting,
    updateMultipleSettings,
    updateMyConfig,
    updateMySingleSetting,
    resetConfig,
    noParams,
};
