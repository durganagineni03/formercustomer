const db = require("../config/db"); // Adjust based on your database setup

// ✅ Add a product to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { product_id } = req.body;
        const customer_id = req.user.id; // Ensure authMiddleware sets user in request

        // Check if product is already in wishlist
        const [existing] = await db.query(
            "SELECT * FROM wishlist WHERE customer_id = ? AND product_id = ?",
            [customer_id, product_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        await db.query(
            "INSERT INTO wishlist (customer_id, product_id) VALUES (?, ?)",
            [customer_id, product_id]
        );

        res.status(201).json({ message: "Product added to wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get all wishlist items
exports.getWishlist = async (req, res) => {
    try {
        const customer_id = req.user.id;

        const [wishlist] = await db.query(
            `SELECT w.id, p.id AS product_id, p.name, p.price, p.image_url
             FROM wishlist w 
             JOIN products p ON w.product_id = p.id 
             WHERE w.customer_id = ?`,
            [customer_id]
        );

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { product_id } = req.params;
        const customer_id = req.user.id;

        await db.query(
            "DELETE FROM wishlist WHERE customer_id = ? AND product_id = ?",
            [customer_id, product_id]
        );

        res.status(200).json({ message: "Product removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Clear entire wishlist
exports.clearWishlist = async (req, res) => {
    try {
        const customer_id = req.user.id;

        await db.query(
            "DELETE FROM wishlist WHERE customer_id = ?",
            [customer_id]
        );

        res.status(200).json({ message: "Wishlist cleared" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
