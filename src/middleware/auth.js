const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, "RCT_KEY");
  if (!data) res.send("Invalid token");
  const check = User.auth(data);
  if (check) {
    req.user = data;
    next();
  } else res.status(404).send("Login Fail!");
};

module.exports = auth;
