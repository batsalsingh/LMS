const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const AppError = require("../utils/appError");

const enroll = async (userId, courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError("Course not found", 404);
  if (await Enrollment.findOne({ user: userId, course: courseId })) throw new AppError("Already enrolled", 409);
  const enrollment = await Enrollment.create({ user: userId, course: courseId });
  await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });
  return enrollment;
};

const list = (userId) => Enrollment.find({ user: userId }).populate({
  path: "course",
  populate: { path: "instructor", select: "name email role" }
});

const drop = async (userId, id) => {
  const e = await Enrollment.findById(id);
  if (!e) throw new AppError("Enrollment not found", 404);
  if (e.user.toString() !== userId) throw new AppError("Forbidden", 403);
  await Enrollment.findByIdAndDelete(id);
  await Course.findByIdAndUpdate(e.course, { $inc: { studentsCount: -1 } });
  return { message: "Enrollment dropped" };
};

const dropByCourse = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) throw new AppError("Enrollment not found", 404);
  await Enrollment.findByIdAndDelete(enrollment._id);
  await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: -1 } });
  return { message: "Enrollment dropped" };
};

module.exports = { enroll, list, drop, dropByCourse };
