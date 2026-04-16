const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/subscriptionService");

const subscribe = asyncHandler(async (req, res) => {
  const { plan } = req.body;
  if (!plan) throw new AppError("plan is required", 400);
  try {
    const data = await service.subscribe(req.user.userId, plan);
    res.status(201).json({ status: "success", data });
  } catch (_error) {
    throw new AppError("Invalid subscription plan", 400);
  }
});

const getCurrentSubscription = asyncHandler(async (req, res) => {
  const data = await service.getCurrent(req.user.userId);
  res.status(200).json({ status: "success", data });
});

module.exports = { subscribe, getCurrentSubscription };
