import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Hardcoded login for admin and user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  // Admin login
  if (username === "admin" && password === "admin123") {
    return res.json({ success: true, role: "admin", message: "Login successful" });
  }

  // User login (optional if you want user login)
  if (username === "user" && password === "user123") {
    return res.json({ success: true, role: "user", message: "Login successful" });
  }

  // Invalid credentials
  return res.status(401).json({ message: "Invalid username or password" });
});

// Admin: fetch all feedback
router.get("/feedback", (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB fetch error:", err);
      return res.status(500).json({ message: "Database error", err });
    }
    res.json(results);
  });
});

export default router;
