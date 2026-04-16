const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/wishlistService");

const getWishlist = asyncHandler(async (req, res) => {
  const data = await service.list(req.user.userId);
  res.status(200).json({ status: "success", data });
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) throw new AppError("courseId is required", 400);
  const data = await service.add(req.user.userId, courseId);
  res.status(201).json({ status: "success", data });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  await service.remove(req.user.userId, req.params.courseId);
  res.status(200).json({ status: "success", data: { message: "Removed from wishlist" } });
});

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
