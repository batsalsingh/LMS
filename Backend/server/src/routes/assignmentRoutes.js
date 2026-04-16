const express = require("express");
const controller = require("../controllers/assignmentController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/constants");

const router = express.Router();
router.post("/:id/submit", protect, authorizeRoles(ROLES.STUDENT), controller.submitAssignment);
router.post("/:courseId", protect, authorizeRoles(ROLES.INSTRUCTOR), controller.createAssignment);
module.exports = router;
