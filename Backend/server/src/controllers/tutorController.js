const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/tutorService");

const getTutors = asyncHandler(async (_req, res) => {
  const data = await service.listTutors();
  res.status(200).json({ status: "success", data });
});

const bookTutorSession = asyncHandler(async (req, res) => {
  const { tutorId } = req.body;
  if (!tutorId) throw new AppError("tutorId is required", 400);
  const data = await service.bookSession(req.user.userId, tutorId);
  res.status(201).json({ status: "success", data });
});

module.exports = { getTutors, bookTutorSession };
