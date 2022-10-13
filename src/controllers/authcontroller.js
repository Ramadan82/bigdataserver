const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3h" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const name = `${user.firstname} ${user.lastname}`;
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.register(firstname, lastname, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAuser = async (req, res) => {
  const { id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  return res.status(200).json(user);
};
const deleteAuser = async (req, res) => {
  const { id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: " No such user" });
  }
  const user = await User.findByIdAndDelete(id);
  return res.status(200).json(user);
};
const updateAuser = async (req, res) => {
  const { id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const { password, firstname, lastname, email } = req.body;
  if (!password || !firstname || !lastname || !email) {
    return res.status(400).json({ error: "all fields are required" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      email: email,
    }
  );
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  return res.status(200).json(user);
};

module.exports = {
  loginUser,
  registerUser,
  getAuser,
  deleteAuser,
  updateAuser,
};
