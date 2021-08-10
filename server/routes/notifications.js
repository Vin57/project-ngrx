const router = require("express").Router();
const fs = require("fs");
const Subsciption = require("../models/subscription.model");
const Webpush = require("web-push");

const VAPID_KEY_PRIVATE = fs
  .readFileSync("./secrets/vapid/key")
  .toString()
  .trim();
const VAPID_KEY_PUBLIC = fs
  .readFileSync("./secrets/vapid/key.pub")
  .toString()
  .trim();

Webpush.setVapidDetails(
  "mailto:contact@my-site.com",
  VAPID_KEY_PUBLIC,
  VAPID_KEY_PRIVATE
);

const notification = {
  notification: {
    title: "Notification title",
    body: "Contenu de la notification",
  },
};

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

router.get("/test", (req, res) => {
  Subscription.find({})
    .exec()
    .then((subscriptions) => {
      Promise.all(
        subscriptions.map((sub) => {
          Webpush.sendNotification(sub.details, JSON.stringify(notification));
        })
      )
        .then(() => {
          res.json("all notifications has been sent");
        })
        .catch((err) => {
          res.status(500).json("notifications not sent");
        });
    });
});

module.exports = router;
