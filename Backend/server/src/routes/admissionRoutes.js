const express = require("express");
const controller = require("../controllers/admissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", controller.createApplication);
router.get("/mine", controller.getMyApplications);

module.exports = router;
