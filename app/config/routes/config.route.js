const express = require("express");
const router = express.Router();
const configController = require("../controllers/config.controller");
const configValidation = require("../validations/config.validation");
const { verifyToken } = require("../../middlewares/auth/verify_jwt.middleware");
const validate = require("../../middlewares/validations/validation.middleware");

// Obtener configuración de usuario específico
router.get(
    "/user/:userId",
    verifyToken,
    validate(configValidation.getUserConfig),
    configController.getUserConfig
);

// Actualizar configuración específica de usuario
router.patch(
    "/user/:userId/setting",
    verifyToken,
    validate(configValidation.updateSingleSetting),
    configController.updateSingleSetting
);

// Actualizar múltiples configuraciones de usuario
router.patch(
    "/user/:userId",
    verifyToken,
    validate(configValidation.updateMultipleSettings),
    configController.updateMultipleSettings
);

// Obtener mi configuración
router.get(
    "/me",
    verifyToken,
    validate(configValidation.noParams),
    configController.getMyConfig
);

// Actualizar mi configuración específica
router.patch(
    "/me/setting",
    verifyToken,
    validate(configValidation.updateMySingleSetting),
    configController.updateMySingleSetting
);

// Actualizar mis múltiples configuraciones
router.patch(
    "/me",
    verifyToken,
    validate(configValidation.updateMyConfig),
    configController.updateMyConfig
);

// Resetear configuración de usuario específico
router.delete(
    "/user/:userId/reset",
    verifyToken,
    validate(configValidation.resetConfig),
    configController.resetUserConfig
);

// Resetear mi configuración
router.delete(
    "/me/reset",
    verifyToken,
    validate(configValidation.noParams),
    configController.resetMyConfig
);

module.exports = router;
