const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || "";
  //const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  const token = req.cookies.accessToken || (header.startsWith("Bearer ") ? header.split(" ")[1] : null);

  if (!token) throw new AppError("Unauthorized", 401);

  const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  
  const user = await User.findById(payload.userId);
  if (!user) throw new AppError("Unauthorized", 401);
  req.user = { userId: user._id.toString(), role: user.role };
  next();
});

module.exports = { protect };
