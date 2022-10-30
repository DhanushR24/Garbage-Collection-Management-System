const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.handleError = (err) => {
  const error = {
    name: "",
    phone: "",
    password: "",
  };

  if (err.message === "Invalid phone") {
    error.phone = "Invalid phone";
  }
  if (err.message === "Invalid password") {
    error.password = "Invalid password";
  }

  if (err.code === 11000) {
    error.email = "User already exists";
    return error;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        console.log("err : " + err);
        // console.log(err.message)
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
