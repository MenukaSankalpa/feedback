import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, data) => {
      if (!data.length) return res.status(404).json("User not found");

      const valid = await bcrypt.compare(password, data[0].password);
      if (!valid) return res.status(401).json("Wrong password");

      const token = jwt.sign(
        { id: data[0].id, role: data[0].role },
        "secret",
        { expiresIn: "1d" }
      );

      res.json({ token, role: data[0].role });
    }
  );
});

export default router;
