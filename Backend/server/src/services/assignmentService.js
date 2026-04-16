const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const Submission = require("../models/Submission");
const Enrollment = require("../models/Enrollment");
const AppError = require("../utils/appError");

const create = async (user, courseId, body) => {
  const c = await Course.findById(courseId);
  if (!c) throw new AppError("Course not found", 404);
  if (c.instructor.toString() !== user.userId) throw new AppError("Forbidden", 403);
  return Assignment.create({ course: courseId, title: body.title, description: body.description, dueDate: body.dueDate });
};

const listByCourse = (courseId) => Assignment.find({ course: courseId });

const submit = async (studentId, assignmentId, answer) => {
  const a = await Assignment.findById(assignmentId);
  if (!a) throw new AppError("Assignment not found", 404);
  if (!(await Enrollment.findOne({ user: studentId, course: a.course }))) throw new AppError("Not enrolled", 403);
  return Submission.findOneAndUpdate(
    { assignment: assignmentId, student: studentId },
    { answer },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );
};

module.exports = { create, listByCourse, submit };
