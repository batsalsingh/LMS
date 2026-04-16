const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/admissionService");

const createApplication = asyncHandler(async (req, res) => {
  const { fullName, email, phone, course, experience } = req.body;
  if (!fullName || !email || !phone || !course || !experience) {
    throw new AppError("fullName, email, phone, course, experience required", 400);
  }

  const data = await service.create(req.user.userId, req.body);
  res.status(201).json({ status: "success", data });
});

const getMyApplications = asyncHandler(async (req, res) => {
  const data = await service.listMine(req.user.userId);
  res.status(200).json({ status: "success", data });
});

module.exports = { createApplication, getMyApplications };
