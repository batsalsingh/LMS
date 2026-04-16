const Subscription = require("../models/Subscription");

const planPrices = {
  Basic: 9,
  Professional: 29,
  Premium: 49
};

const subscribe = async (userId, plan) => {
  const price = planPrices[plan];
  if (!price) {
    throw new Error("Invalid subscription plan");
  }

  await Subscription.updateMany({ user: userId, status: "active" }, { status: "cancelled" });

  return Subscription.create({
    user: userId,
    plan,
    price
  });
};

const getCurrent = async (userId) =>
  Subscription.findOne({ user: userId, status: "active" }).sort({ createdAt: -1 });

module.exports = { subscribe, getCurrent };
