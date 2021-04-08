const User = require("../models/User");

class userController {
  login(req, res) {
    console.log(req.body);
    const token = User.auth(req.body);
    if (token) {
      res.status(200).send(token);
    } else {
      res.status(201).send("login fail!");
    }
  }

  checkLogin(req, res) {
    res.status(200).send(true);
  }
}

module.exports = new userController();
