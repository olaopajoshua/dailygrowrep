const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔥 Import auth routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Mount auth routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://dailygrowuser:vjXLX5PK17cn9aRq@daily-grow.1wd64ge.mongodb.net/dailygrow"
  )
  .then(() => console.log("MongoDB connected successfully ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
