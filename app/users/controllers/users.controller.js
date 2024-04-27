const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  const user = new usersModel(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);

  try {
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    //si ocurre un problema devolvera el error
    if (error.errorResponse?.code === 11000) {
      res.status(500).json({ message: "Email or Phonenumber already exist" });
    }
    console.log(
      "Ha ocurrido un error en AdminsUsersController/newAdminUser: " +
        JSON.stringify(error.errorResponse)
    );
  }
};
