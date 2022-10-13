const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const authSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ............static signUp method.............

authSchema.statics.register = async function (
  firstname,
  lastname,
  email,
  password
) {
  // validate fields

  if (!firstname || !lastname || !email || !password) {
    throw Error("all fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }
  const oldUser = await this.findOne({ email });
  if (oldUser) {
    throw Error("email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  return user;
};
//..............static login method....................
authSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("incorrect email or password");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User does not exist. Register Now to login please");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("incorrect email or password");
  }

  return user;
};
module.exports = mongoose.model("Users", authSchema);
