import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Submit feedback
router.post("/", (req, res) => {
  const { rating, name, phone, message } = req.body;

  db.query(
    "INSERT INTO feedback (rating, name, phone, message) VALUES (?,?,?,?)",
    [rating, name || null, phone || null, message || null],
    () => res.json({ success: true })
  );
});

// Get records with filters
router.get("/", (req, res) => {
  const { start, end, rating } = req.query;

  let q = "SELECT * FROM feedback WHERE 1=1";
  const v = [];

  if (rating && rating !== "all") {
    q += " AND rating=?";
    v.push(rating);
  }

  if (start && end) {
    q += " AND DATE(created_at) BETWEEN ? AND ?";
    v.push(start, end);
  }

  db.query(q, v, (err, data) => res.json(data));
});

// Dashboard cards
router.get("/stats", (req, res) => {
  const { start, end } = req.query;

  db.query(
    `
    SELECT rating, COUNT(*) total
    FROM feedback
    WHERE DATE(created_at) BETWEEN ? AND ?
    GROUP BY rating
    `,
    [start, end],
    (err, data) => res.json(data)
  );
});

export default router;
