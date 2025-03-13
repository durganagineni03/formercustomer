const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import your existing backend routes
const myRoutes = require("./src/app");  // Adjust based on your backend structure
app.use("/api", myRoutes);

exports.api = functions.https.onRequest(app);
