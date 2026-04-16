const express = require("express");
const controller = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.get("/:courseId", controller.getCourseProgress);
router.post("/:courseId", controller.updateCourseProgress);
router.get("/:courseId/certificate", controller.getCertificate);

module.exports = router;
