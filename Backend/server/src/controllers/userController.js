const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/userService");

const getProfile = asyncHandler(async (req, res) => {
  const user = await service.getById(req.user, req.user.userId);
  res.status(200).json({ status: "success", data: user });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.getById(req.user, req.params.id) });
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.updateById(req.user, req.params.id, req.body) });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: await service.removeById(req.user, req.params.id) });
});

module.exports = { getProfile, getUser, updateUser, deleteUser };
