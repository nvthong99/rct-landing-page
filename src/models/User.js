const jwt = require("jsonwebtoken");

const User = {
  username: "admin",
  password: "Cam200221",
  auth: function ({ username, password }) {
    if (username === this.username && password === this.password) {
      return jwt.sign(
        { username: this.username, password: this.password },
        "RCT_KEY"
      );
    } else {
      return false;
    }
  },
  tokenGenerator: function () {
    return jwt.sign(
      { username: this.username, password: this.password },
      "RCT_KEY"
    );
  },
};

module.exports = User;
