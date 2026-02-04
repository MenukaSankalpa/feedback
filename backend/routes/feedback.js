import express from "express";
import { db } from "../db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ---------------------------
// Submit feedback
// ---------------------------
router.post("/", auth, (req, res) => {
  const { rating, name, email, phone, feedback } = req.body;

  if (!rating)
    return res.status(400).json({ message: "Rating is required" });

  const sql =
    "INSERT INTO feedback (rating, name, email, phone, feedback) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [rating, name || null, email || null, phone || null, feedback || null],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Database error", error: err });
      res.json({ success: true, message: "Feedback submitted" });
    }
  );
});

// ---------------------------
// Get all feedback (with optional filters)
// ---------------------------
router.get("/", auth, (req, res) => {
  const { start, end, rating } = req.query;

  let sql = "SELECT * FROM feedback WHERE 1=1";
  const values = [];

  if (rating && rating !== "all") {
    sql += " AND rating=?";
    values.push(rating);
  }

  if (start && end) {
    sql += " AND DATE(created_at) BETWEEN ? AND ?";
    values.push(start, end);
  }

  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ---------------------------
// Dashboard stats (for cards)
// ---------------------------
router.get("/stats", auth, (req, res) => {
  const { start, end } = req.query;

  const sql = `
    SELECT rating, COUNT(*) AS total
    FROM feedback
    WHERE DATE(created_at) BETWEEN ? AND ?
    GROUP BY rating
  `;

  db.query(sql, [start, end], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export default router;
