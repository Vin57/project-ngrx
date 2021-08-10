const router = require("express").Router();
const fs = require("fs");
const Subsciption = require("../models/subscription.model");

const VAPID_KEY_PRIVATE = fs.readFileSync("./secrets/vapid/key");

router.post("/", (req, res) => {
  const subscription = req.body;
  if (!subscription) {
    return res.status(404).json("no subscription !");
  }
  const newSubscription = new Subscription({
    details: subscription,
  });
  newSubscription.save((err) =>
    err
      ? res.status(500).json("save subscription failed")
      : res.json("subscription ok")
  );
});

module.exports = router;
