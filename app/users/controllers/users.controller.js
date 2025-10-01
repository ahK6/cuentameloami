const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersModel = require("../models/users.model");
const ConfigModel = require("../../config/models/config.models");
const { esIdMongo } = require("../../shared/utils/isMongoId");

exports.signup = async (req, res, next) => {
  const user = new UsersModel(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);

  try {
    const savedUser = await user.save();
    const userId = savedUser._id;
    await ConfigModel.createDefaultConfig(userId);

    res.status(200).json({ message: "Registrado correctamente" });
  } catch (error) {
    //si ocurre un problema devolvera el error
    if (error.errorResponse?.code === 11000) {
      return res.status(409).json({ error: "Email o apodo ya existe" });
    } else {
      return res.status(500).json({
        message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
      });
    }
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    if (user.status === "pending") {
      return res.status(403).json({ error: "Usuario no verificado" });
    }

    if (user.status === "banned") {
      return res.status(403).json({ error: "Usuario baneado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      "xddd",
      { expiresIn: "12h" }
    );

    res.status(200).json({
      userInformation: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        username: user.nickName,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.user;

  try {
    const userInfo = await UsersModel.findOne({ _id: id }).select("-password");

    if (!userInfo) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado el usuario" });
    }

    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.user;

  let updateFields = req.body;

  try {
    const userInfo = await UsersModel.findOne({ _id: id }).select("-password");

    if (userInfo.email === req.body.email) {
      updateFields = { ...updateFields, email: undefined };
    }

    if (userInfo.phoneNumber === req.body.phoneNumber) {
      updateFields = { ...updateFields, phoneNumber: undefined };
    }

    const updateObject = { $set: updateFields };

    const updatedUser = await UsersModel.findByIdAndUpdate(
      { _id: id },
      updateObject,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.errorResponse?.code === 11000) {
      return res
        .status(500)
        .json({ message: "Correo electrónico o teléfono ya existente" });
    } else {
      return res.status(500).json({
        message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
      });
    }
  }
};

exports.banUser = async (req, res, next) => {
  const { role } = req.user;

  let { userId, banMessage } = req.body;
  if (!esIdMongo(userId)) {
    return res.status(500).json({ message: "ID de usuaro invalido" });
  }

  if (!role === "moderator" || !role === "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta accion" });
  }

  try {
    const updateObject = { status: "banned", bannedComment: banMessage };
    const updatedUser = await UsersModel.findByIdAndUpdate(
      { _id: userId },
      updateObject,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("wrwer " + JSON.stringify(error));
    return res.status(500).json({
      message: "Ha ocurrido un error, intentalo de nuevo mas tarde",
    });
  }
};
