const mongoose = require("mongoose");
const { Schema } = mongoose;

const configSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            unique: true,
        },
        notifications: {
            type: Boolean,
            default: true,
        },
        contactInfoVisible: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Índice para optimizar búsquedas por userId
configSchema.index({ userId: 1 });

// Middleware para crear configuración por defecto
configSchema.statics.createDefaultConfig = async function (
    userId,
    options = {}
) {
    try {
        const defaultConfig = new this({
            userId: userId,
        });
        return await defaultConfig.save(options);
    } catch (error) {
        throw error;
    }
};

// Método para actualizar una configuración específica - CORREGIDO
configSchema.methods.updateSetting = async function (setting, value) {
    try {
        // Verificar que el setting es válido
        if (!(setting in this.toObject())) {
            throw new Error(`Setting '${setting}' no válido`);
        }

        this[setting] = value;
        return await this.save();
    } catch (error) {
        throw error;
    }
};

// Método para obtener todas las configuraciones de un usuario
configSchema.statics.getUserConfig = async function (userId) {
    try {
        let config = await this.findOne({ userId });

        // Si no existe configuración, crear una por defecto
        if (!config) {
            config = await this.createDefaultConfig(userId);
        }

        return config;
    } catch (error) {
        throw error;
    }
};

const Config = mongoose.model("configs", configSchema);

module.exports = Config;
