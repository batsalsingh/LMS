const User = require("../models/User");
const AppError = require("../utils/appError");
const { ROLES } = require("../config/constants");

const canAccess = (requester, id) => requester.role === ROLES.ADMIN || requester.userId === id;

const getById = async (requester, id) => {
  if (!canAccess(requester, id)) throw new AppError("Forbidden", 403);
  const user = await User.findById(id).select("-refreshToken");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const updateById = async (requester, id, body) => {
  if (!canAccess(requester, id)) throw new AppError("Forbidden", 403);
  const allowed = ["name", "email", "password"];
  if (requester.role === ROLES.ADMIN) allowed.push("role");
  const update = {};
  allowed.forEach((k) => { if (body[k] !== undefined) update[k] = body[k]; });
  const user = await User.findById(id).select("+password");
  if (!user) throw new AppError("User not found", 404);
  Object.assign(user, update);
  await user.save();
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

const removeById = async (requester, id) => {
  if (!canAccess(requester, id)) throw new AppError("Forbidden", 403);
  await User.findByIdAndDelete(id);
  return { message: "User deleted" };
};

module.exports = { getById, updateById, removeById };
