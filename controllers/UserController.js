const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { handleError } = require("../helpers/helper");

module.exports.signup_get = (req, res) => {
  res.render("signup", {
    title: "Home",
  });
};

module.exports.signup_post = async (req, res) => {
  const { name, phone, address, lat, lng, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      phone,
      address,
      lat,
      lng,
      email,
      password,
    });

    console.log(user);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login", {
    title: "Home",
  });
};

module.exports.login_post = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error("Invalid phone");
  } else {
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    res.cookie("jwt", jwt.sign({ id: user._id }, "secret"), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  try {
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
