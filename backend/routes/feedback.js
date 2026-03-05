import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/*
   DATABASE CONNECTION
 */

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "feedback_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* 
   SUBMIT FEEDBACK
 */

router.post("/", (req, res) => {
  const { rating, name, email, phone, feedback } = req.body;

  // Validation
  if (!rating) {
    return res.status(400).json({
      success: false,
      message: "Rating is required",
    });
  }

  const sql =
    "INSERT INTO feedback (rating, name, email, phone, feedback) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      rating,
      name || null,
      email || null,
      phone || null,
      feedback || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Database Insert Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Feedback saved successfully",
        insertId: result.insertId,
      });
    }
  );
});

export default router;