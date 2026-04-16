const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/assignmentService");

const getAssignments = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.listByCourse(req.params.courseId) });
});

const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) throw new AppError("title, description, dueDate required", 400);
  res.status(201).json({ status: "success", data: await service.create(req.user, req.params.courseId, req.body) });
});

const submitAssignment = asyncHandler(async (req, res) => {
  if (!req.body.answer) throw new AppError("answer required", 400);
  res.status(201).json({ status: "success", data: await service.submit(req.user.userId, req.params.id, req.body.answer) });
});

module.exports = { getAssignments, createAssignment, submitAssignment };
