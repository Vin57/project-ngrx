const router = require("express").Router();

const auth = require("./auth");
const user = require("./user");
const notifications = require("./notifications");

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/notifications", notifications);

module.exports = router;
