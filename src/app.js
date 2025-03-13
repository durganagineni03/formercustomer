require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // Ensure mysql2 is installed
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const agriRoutes = require('./routes/agriRoutes');
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // For form data

// Debugging: Log ALL incoming requests
app.use((req, res, next) => {
    console.log(`✅ Incoming Request: ${req.method} ${req.url}`);
    next();
});

// 🔹 Setup MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "yourdatabase"
});

// 🔹 Connect to Database
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// Register routes



console.log("✅ Registering routes...");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/agri", agriRoutes);
app.use("/api/wishlist", wishlistRoutes);
console.log("✅ Routes registered: /api/auth, /api/products, /api/cart, /api/orders, /api/agri");
console.log("✅ Registered Routes:");
app._router.stack.forEach((layer) => {
    if (layer.route) {
        console.log(`- ${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`);
    } else if (layer.name === "router") {
        layer.handle.stack.forEach((subLayer) => {
            if (subLayer.route) {
                console.log(`- ${Object.keys(subLayer.route.methods).join(", ").toUpperCase()} ${subLayer.route.path}`);
            }
        });
    }
});



// Debugging: Catch all unmatched routes
app.use((req, res, next) => {
    console.warn(`🚨 No route found for ${req.method} ${req.url}`);
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;
