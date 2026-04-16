const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");
const { accessToken, refreshToken } = require("../utils/tokenUtils");

const pick = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

const register = async ({ name, email, password, role }) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (await User.findOne({ email: normalizedEmail })) throw new AppError("Email already exists", 409);
  const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role });
  const at = accessToken({ userId: user._id, role: user.role });
  const rt = refreshToken({ userId: user._id, role: user.role });
  user.refreshToken = await bcrypt.hash(rt, 10);
  await user.save();
  return { user: pick(user), accessToken: at, refreshToken: rt };
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+password +refreshToken");
  if (!user || !(await user.comparePassword(password))) throw new AppError("Invalid credentials", 401);
  const at = accessToken({ userId: user._id, role: user.role });
  const rt = refreshToken({ userId: user._id, role: user.role });
  user.refreshToken = await bcrypt.hash(rt, 10);
  await user.save();
  return { user: pick(user), accessToken: at, refreshToken: rt };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  return { message: "Logged out successfully" };
};

const refresh = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(payload.userId).select("+refreshToken");
  if (!user || !user.refreshToken) throw new AppError("Invalid refresh token", 401);
  if (!(await bcrypt.compare(token, user.refreshToken))) throw new AppError("Invalid refresh token", 401);
  const at = accessToken({ userId: user._id, role: user.role });
  const rt = refreshToken({ userId: user._id, role: user.role });
  user.refreshToken = await bcrypt.hash(rt, 10);
  await user.save();
  return { accessToken: at, refreshToken: rt };
};

module.exports = { register, login, logout, refresh };
