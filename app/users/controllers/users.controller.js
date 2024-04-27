const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");

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
    } else {
      res
        .status(500)
        .json({ message: "An error has occurred, please try again" });
    }
  }
};

exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  const user = await usersModel.findOne({ phoneNumber });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      phoneNumber: user.phoneNumber,
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
    },
    token,
  });
};
