const express = require("express");
const controller = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", protect, controller.logout);
router.post("/refresh-token", controller.refreshToken);

module.exports = router;
