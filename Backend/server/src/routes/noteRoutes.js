const express = require("express");
const controller = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.get("/:courseId/:lessonId", controller.getLessonNote);
router.post("/:courseId/:lessonId", controller.saveLessonNote);

module.exports = router;
