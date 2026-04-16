const express = require("express");
const controller = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);
router.post("/", controller.subscribe);
router.get("/current", controller.getCurrentSubscription);

module.exports = router;
