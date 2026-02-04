import { useState } from "react";
import axios from "axios";
import RatingCard from "../components/RatingCard";
import FeedbackModal from "../components/FeedbackModal";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = [
    { id: 1, label: "Very Poor", color: "#dc2626" },
    { id: 2, label: "Poor", color: "#f97316" },
    { id: 3, label: "Average", color: "#eab308" },
    { id: 4, label: "Good", color: "#22c55e" },
    { id: 5, label: "Excellent", color: "#16a34a" },
  ];

  // ✅ Function to submit feedback (with all fields)
  const submitFeedback = async (data) => {
    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          rating: selectedRating, // id of the rating clicked
          name: data.name,
          email: data.email,
          phone: data.phone,
          feedback: data.feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  // ✅ Function for ratings without feedback modal (Good/Excellent)
  const submitRatingOnly = async (ratingId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        { rating: ratingId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Rating submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
      {ratings.map((r) => (
        <RatingCard
          key={r.id}
          label={r.label}
          color={r.color}
          onClick={() => {
            setSelectedRating(r.id);
            r.id <= 2 ? setOpen(true) : submitRatingOnly(r.id); // Very Poor / Poor → open modal
          }}
        />
      ))}

      {/* Feedback Modal */}
      <FeedbackModal open={open} setOpen={setOpen} submit={submitFeedback} />
    </div>
  );
}
