import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Submit feedback (no login required)
router.post("/", (req, res) => {
  console.log("Received feedback:", req.body);

  const { rating, name, email, phone, feedback } = req.body;

  if (!rating) return res.status(400).json({ message: "Rating is required" });

  const sql =
    "INSERT INTO feedback (rating, name, email, phone, feedback) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [rating, name || null, email || null, phone || null, feedback || null],
    (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ message: "Database error", err });
      }
      console.log("Inserted row ID:", result.insertId);
      res.json({ success: true, message: "Feedback submitted successfully" });
    }
  );
});

export default router;
