const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/enrollmentService");

const enroll = asyncHandler(async (req, res) => {
  if (!req.body.courseId) throw new AppError("courseId required", 400);
  res.status(201).json({ status: "success", data: await service.enroll(req.user.userId, req.body.courseId) });
});

const getEnrollments = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.list(req.user.userId) });
});

const dropEnrollment = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.drop(req.user.userId, req.params.id) });
});

const enrollByCourseId = asyncHandler(async (req, res) => {
  res.status(201).json({ status: "success", data: await service.enroll(req.user.userId, req.params.courseId) });
});

const dropByCourseId = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.dropByCourse(req.user.userId, req.params.courseId) });
});

module.exports = { enroll, getEnrollments, dropEnrollment, enrollByCourseId, dropByCourseId };
