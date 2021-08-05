const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const RSA_KEY_PRIVATE = fs.readFileSync("./rsa/key");
const RSA_KEY_PUBLIC = fs.readFileSync("./rsa/key.pub");

router.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
  });

  newUser.save((err) => {
    if (err) {
      res.status(500).json("erreur signup !");
    } else {
      res.status(200).json("signup ok !");
    }
  });
});

router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json(signToken(user._id.toString()));
    } else {
      res.status(401).json("signin failed !");
    }
  });
});

router.get("/refresh-token", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json(403).json("no token provided");
  }
  jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
    if (err) {
      return res.json(403).json("invalid token");
    }
    const decoded_subject = decoded.sub;
    res.status(200).json(signToken(decoded_subject.toString()));
  });
});

/**
 * Return a signed token for given p_bsubject.
 * @param {String} p_bsubject Token subject.
 * @param {String} p_expiresIn Token expiration delay.
 * Default is 15 seconds, but in real conditions, the expiration
 * time should be something like 15 minutes
 * @returns
 */
function signToken(p_bsubject, p_expiresIn = "15s") {
  return jwt.sign({}, RSA_KEY_PRIVATE, {
    algorithm: "RS256",
    expiresIn: p_expiresIn,
    subject: p_bsubject,
  });
}

module.exports = router;
