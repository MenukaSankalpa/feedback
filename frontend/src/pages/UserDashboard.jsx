import { useState } from "react";
import axios from "axios";
import RatingCard from "../components/RatingCard";
import FeedbackModal from "../components/FeedbackModal";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);

  const ratings = [
    { id: 1, label: "Very Poor", color: "#dc2626" },
    { id: 2, label: "Poor", color: "#f97316" },
    { id: 3, label: "Average", color: "#eab308" },
    { id: 4, label: "Good", color: "#22c55e" },
    { id: 5, label: "Excellent", color: "#16a34a" },
  ];

  const submitRating = async () => {
    await axios.post("http://localhost:5000/api/feedback", {
      rating,
    });
    alert("Submitted!");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
      {ratings.map((r) => (
        <RatingCard
          key={r.id}
          label={r.label}
          color={r.color}
          onClick={() => {
            setRating(r.id);
            r.id <= 2 ? setOpen(true) : submitRating();
          }}
        />
      ))}

      <FeedbackModal open={open} setOpen={setOpen} submit={submitRating} />
    </div>
  );
}
