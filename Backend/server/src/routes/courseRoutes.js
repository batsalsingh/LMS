const express = require("express");
const controller = require("../controllers/courseController");
const assignmentController = require("../controllers/assignmentController");
const enrollmentController = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/constants");

const router = express.Router();

router.get("/", controller.getAllCourses);
router.get("/:id", controller.getCourse);
router.post("/", protect, authorizeRoles(ROLES.INSTRUCTOR, ROLES.ADMIN), controller.createCourse);
router.put("/:id", protect, authorizeRoles(ROLES.INSTRUCTOR, ROLES.ADMIN), controller.updateCourse);
router.delete("/:id", protect, authorizeRoles(ROLES.INSTRUCTOR, ROLES.ADMIN), controller.deleteCourse);
router.post("/:courseId/enroll", protect, enrollmentController.enrollByCourseId);
router.post("/:courseId/drop", protect, enrollmentController.dropByCourseId);

router.get("/:courseId/assignments", protect, assignmentController.getAssignments);
router.post("/:courseId/assignments", protect, authorizeRoles(ROLES.INSTRUCTOR), assignmentController.createAssignment);

module.exports = router;
