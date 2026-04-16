const express = require("express");
const controller = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.get("/", controller.getWishlist);
router.post("/", controller.addToWishlist);
router.delete("/:courseId", controller.removeFromWishlist);

module.exports = router;
