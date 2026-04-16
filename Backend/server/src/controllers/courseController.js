const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/courseService");

const createCourse = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) throw new AppError("title and description required", 400);
  res.status(201).json({ status: "success", data: await service.create(req.user, req.body) });
});

const getAllCourses = asyncHandler(async (_req, res) => {
  res.status(200).json({ status: "success", data: await service.list() });
});

const getCourse = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.byId(req.params.id) });
});

const updateCourse = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.update(req.user, req.params.id, req.body) });
});

const deleteCourse = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.remove(req.user, req.params.id) });
});

module.exports = { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse };
