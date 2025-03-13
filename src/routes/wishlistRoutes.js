const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");

// ✅ Add product to wishlist
router.post("/add/:product_id", authMiddleware, addToWishlist);

// ✅ Get wishlist items
router.get("/", authMiddleware, getWishlist);

// ✅ Remove product from wishlist
router.delete("/remove/:product_id", authMiddleware, removeFromWishlist);

module.exports = router;
