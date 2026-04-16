const Grade = require("../models/Grade");
const Assignment = require("../models/Assignment");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const AppError = require("../utils/appError");
const { ROLES } = require("../config/constants");

const create = async (user, body) => {
  const { student, course, assignment, score } = body;
  const a = await Assignment.findById(assignment);
  if (!a || a.course.toString() !== course) throw new AppError("Invalid assignment/course", 400);
  const c = await Course.findById(course);
  if (!c) throw new AppError("Course not found", 404);
  if (user.role === ROLES.INSTRUCTOR && c.instructor.toString() !== user.userId) throw new AppError("Forbidden", 403);
  if (!await Enrollment.findOne({ user: student, course })) throw new AppError("Student not enrolled", 400);
  return Grade.findOneAndUpdate(
    { student, assignment },
    { student, course, assignment, score },
    { upsert: true, new: true, runValidators: true }
  ).populate("student", "name email").populate("course", "title").populate("assignment", "title");
};

const list = (user, q) => {
  const filter = user.role === ROLES.STUDENT ? { student: user.userId } : {};
  if (q.studentId) filter.student = q.studentId;
  if (q.courseId) filter.course = q.courseId;
  return Grade.find(filter).populate("student", "name email").populate("course", "title").populate("assignment", "title");
};

module.exports = { create, list };
