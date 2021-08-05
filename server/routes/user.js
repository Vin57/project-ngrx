const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const RSA_KEY_PUBLIC = fs.readFileSync("./rsa/key.pub");

function isLoggedIn(req, res, next) {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    return res.status(401).json("unauthenticated user");
  }
  jwt.verify(jwtToken, RSA_KEY_PUBLIC, (err, decoded) => {
    if (err) {
      return res.status(401).json("invalid token");
    }
    const decoded_subject = decoded.sub;
    User.findOne({ _id: decoded_subject }).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json("unexpected error");
      }
      res.user = user;
      next();
    });
  });
}

router.get("/current", isLoggedIn, (req, res) => {
  res.status(200).json(res.user);
});

module.exports = router;
