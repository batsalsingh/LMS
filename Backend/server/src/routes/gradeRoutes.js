const express = require("express");
const controller = require("../controllers/gradeController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/constants");

const router = express.Router();
router.use(protect);
router.get("/", controller.getGrades);
router.post("/", authorizeRoles(ROLES.INSTRUCTOR, ROLES.ADMIN), controller.createGrade);

module.exports = router;
