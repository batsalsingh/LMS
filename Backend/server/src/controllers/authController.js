const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) throw new AppError("name, email, password required", 400);
  const data = await service.register({ name, email, password, role });
  res.status(201).json({
    status: "success",
    user: data.user,
    token: data.accessToken,
    data
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError("email and password required", 400);
  const data = await service.login({ email, password });
  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  };
  res.status(200)
    .cookie("refreshToken", data.refreshToken, option)
    .cookie("accessToken", data.accessToken, option)
    .json({
      status: "success",
      user: data.user,
      token: data.accessToken,
      data
    });
});

const logout = asyncHandler(async (req, res) => {
  const data = await service.logout(req.user.userId);
  res.status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json({ status: "success", data });
});

const refreshToken = asyncHandler(async (req, res) => {
  const data = await service.refresh(req.cookies.refreshToken);
  res.status(200).json({ status: "success", token: data.accessToken, data });
});

module.exports = { register, login, logout, refreshToken };
