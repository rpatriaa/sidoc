const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let check_db = await db.query("SELECT 1");

    res.status(200).json({
      status: "OK",
      database: "CONNECTED",
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "ERROR",
      database: "DISCONNECTED",
      message: "Database connection failed",
    });
  }
});
  

module.exports = router;
