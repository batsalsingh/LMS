const express = require("express");
const controller = require("../controllers/tutorController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", controller.getTutors);
router.post("/book", protect, controller.bookTutorSession);

module.exports = router;
