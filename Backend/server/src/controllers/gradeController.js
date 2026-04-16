const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/gradeService");

const createGrade = asyncHandler(async (req, res) => {
  const { student, course, assignment, score } = req.body;
  if (!student || !course || !assignment || score === undefined) throw new AppError("student/course/assignment/score required", 400);
  res.status(201).json({ status: "success", data: await service.create(req.user, req.body) });
});

const getGrades = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.list(req.user, req.query) });
});

module.exports = { createGrade, getGrades };
