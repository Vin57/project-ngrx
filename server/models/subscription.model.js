const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = Schema({
  details: Schema.Types.Mixed,
});

const Subsciption = mongoose.model("subscription", subscriptionSchema);

module.exports = Subsciption;
