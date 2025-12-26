const mongoose = require("mongoose");
const User = require("../app/users/models/users.model");
const Config = require("../app/config/models/config.models");

async function migrateUserConfigs() {
    try {
        // Conectar a la base de datos
        await mongoose.connect("mongodb://127.0.0.1:27017/talktome", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Obtener todos los usuarios que no tienen configuración
        const users = await User.find({});

        for (const user of users) {
            const existingConfig = await Config.findOne({ userId: user._id });

            if (!existingConfig) {
                try {
                    await Config.createDefaultConfig(user._id);
                    console.log(
                        `✅ Configuración creada para usuario: ${user.username}`
                    );
                } catch (error) {
                    console.error(
                        `❌ Error creando configuración para ${user.username}:`,
                        error.message
                    );
                }
            } else {
                console.log(
                    `⏭️ Usuario ${user.username} ya tiene configuración`
                );
            }
        }

        console.log("🎉 Migración completada");
    } catch (error) {
        console.error("Error en migración:", error);
    } finally {
        await mongoose.disconnect();
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    migrateUserConfigs();
}

module.exports = migrateUserConfigs;
