const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", todoRoutes);

module.exports = app;
