import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedback.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes); // user feedback
app.use("/api/admin", adminRoutes);       // admin/user login + fetch feedback

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
