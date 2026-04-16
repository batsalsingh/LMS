const Course = require("../models/Course");
const AppError = require("../utils/appError");
const { ROLES } = require("../config/constants");

const create = (user, body) =>
  Course.create({ title: body.title, description: body.description, modules: body.modules || [], instructor: user.userId });

const list = async() => await Course.find().populate("instructor", "name email role");

const byId = async (id) => {
  const c = await Course.findById(id).populate("instructor", "name email role");
  if (!c) throw new AppError("Course not found", 404);
  return c;
};

const update = async (user, id, body) => {
  const c = await byId(id);
  const owner = c.instructor._id.toString() === user.userId;
  if (!owner && user.role !== ROLES.ADMIN) throw new AppError("Forbidden", 403);
  ["title", "description", "modules"].forEach((k) => { if (body[k] !== undefined) c[k] = body[k]; });
  await c.save();
  return c;
};

const remove = async (user, id) => {
  const c = await byId(id);
  const owner = c.instructor._id.toString() === user.userId;
  if (!owner && user.role !== ROLES.ADMIN) throw new AppError("Forbidden", 403);
  await Course.findByIdAndDelete(id);
  return { message: "Course deleted" };
};

module.exports = { create, list, byId, update, remove };
