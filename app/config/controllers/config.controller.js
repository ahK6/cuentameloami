const Config = require("../models/config.models");

// Obtener configuración de usuario específico
exports.getUserConfig = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verificar que el usuario autenticado pueda acceder a esta configuración
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para acceder a esta configuración",
            });
        }

        const config = await Config.getUserConfig(userId);

        res.status(200).json({
            success: true,
            data: config,
            message: "Configuración obtenida exitosamente",
        });
    } catch (error) {
        console.error("Error getting user config:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Obtener mi configuración
exports.getMyConfig = async (req, res) => {
    try {
        const userId = req.user.id;
        const config = await Config.getUserConfig(userId);

        res.status(200).json({
            success: true,
            data: config,
            message: "Tu configuración obtenida exitosamente",
        });
    } catch (error) {
        console.error("Error getting my config:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Actualizar configuración específica
exports.updateSingleSetting = async (req, res) => {
    try {
        const { userId } = req.params;
        const { setting, value } = req.body;

        // Verificar permisos
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para modificar esta configuración",
            });
        }

        let config = await Config.findOne({ userId });

        if (!config) {
            config = await Config.createDefaultConfig(userId);
        }

        // Actualizar la configuración directamente
        await config.updateSetting(setting, value);

        res.status(200).json({
            success: true,
            data: config,
            message: "Configuración actualizada exitosamente",
        });
    } catch (error) {
        console.error("Error updating single setting:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Actualizar mi configuración específica
exports.updateMySingleSetting = async (req, res) => {
    try {
        const userId = req.user.id;
        const { setting, value } = req.body;

        let config = await Config.findOne({ userId });

        if (!config) {
            config = await Config.createDefaultConfig(userId);
        }

        // Actualizar la configuración directamente
        await config.updateSetting(setting, value);

        res.status(200).json({
            success: true,
            data: config,
            message: "Tu configuración actualizada exitosamente",
        });
    } catch (error) {
        console.error("Error updating my single setting:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Actualizar múltiples configuraciones
exports.updateMultipleSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Verificar permisos
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para modificar esta configuración",
            });
        }

        let config = await Config.findOne({ userId });

        if (!config) {
            config = await Config.createDefaultConfig(userId);
        }

        // Actualizar las configuraciones directamente
        Object.keys(updates).forEach((setting) => {
            if (setting in config.toObject()) {
                config[setting] = updates[setting];
            }
        });

        await config.save();

        res.status(200).json({
            success: true,
            data: config,
            message: "Configuraciones actualizadas exitosamente",
        });
    } catch (error) {
        console.error("Error updating multiple settings:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Actualizar mi configuración
exports.updateMyConfig = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        let config = await Config.findOne({ userId });

        if (!config) {
            config = await Config.createDefaultConfig(userId);
        }

        // Actualizar las configuraciones directamente
        Object.keys(updates).forEach((setting) => {
            if (setting in config.toObject()) {
                config[setting] = updates[setting];
            }
        });

        await config.save();

        res.status(200).json({
            success: true,
            data: config,
            message: "Tu configuración actualizada exitosamente",
        });
    } catch (error) {
        console.error("Error updating my config:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Resetear configuraciones de usuario específico
exports.resetUserConfig = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verificar permisos
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para resetear esta configuración",
            });
        }

        await Config.findOneAndDelete({ userId });
        const newConfig = await Config.createDefaultConfig(userId);

        res.status(200).json({
            success: true,
            data: newConfig,
            message: "Configuración reseteada a valores por defecto",
        });
    } catch (error) {
        console.error("Error resetting user config:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Resetear mi configuración
exports.resetMyConfig = async (req, res) => {
    try {
        const userId = req.user.id;

        await Config.findOneAndDelete({ userId });
        const newConfig = await Config.createDefaultConfig(userId);

        res.status(200).json({
            success: true,
            data: newConfig,
            message: "Tu configuración ha sido reseteada a valores por defecto",
        });
    } catch (error) {
        console.error("Error resetting my config:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};
