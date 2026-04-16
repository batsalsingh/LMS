const express = require("express");
const controller = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);
router.post("/", controller.enroll);
router.get("/", controller.getEnrollments);
router.delete("/:id", controller.dropEnrollment);

module.exports = router;
