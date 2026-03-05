import { useState, useEffect } from "react";
import {
  FaSadTear,
  FaFrown,
  FaMeh,
  FaSmile,
  FaGrinStars,
  FaShip,
  FaFish,
} from "react-icons/fa";
import RatingCard from "../components/RatingCard.jsx";
import FeedbackModal from "../components/FeedbackModal.jsx";
import FullPopup from "../components/FullPopup.jsx";

export default function UserDashboard() {
  const [open, setOpen] = useState(false); // Feedback modal
  const [selectedRating, setSelectedRating] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false); // Thank you popup
  const [dots, setDots] = useState([]);

  // Generate random blinking dots positions
  useEffect(() => {
    const tempDots = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 4 + 2 + "px",
      delay: Math.random() * 2 + "s",
    }));
    setDots(tempDots);
  }, []);

  const ratings = [
    { id: 1, label: "Very Poor", color: "#dc2626", icon: <FaSadTear /> },
    { id: 2, label: "Poor", color: "#f97316", icon: <FaFrown /> },
    { id: 3, label: "Average", color: "#eab308", icon: <FaMeh /> },
    { id: 4, label: "Good", color: "#22c55e", icon: <FaSmile /> },
    { id: 5, label: "Excellent", color: "#16a34a", icon: <FaGrinStars /> },
  ];

  // Called by FeedbackModal to submit rating + form
  const submitFeedback = async (form) => {
    try {
      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: selectedRating }),
      });
      alert("Feedback submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  // Handles card clicks
  const submitRatingOnly = (ratingId) => {
    setSelectedRating(ratingId);

    if (ratingId >= 3) {
      // Average / Good / Excellent → show thank you popup
      setPopupOpen(true);
      // Auto-submit rating to DB
      fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratingId }),
      }).catch((err) => console.error(err));
    } else {
      // Very Poor / Poor → show feedback form modal
      setOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700 flex items-center justify-center gap-3 py-4 fixed top-0 left-0 z-30">
        <FaShip className="text-blue-600 text-2xl animate-bounce-slow" />
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
          CEYLINE SHIPPING Pvt Ltd
        </span>
      </header>

      {/* Blinking Dots */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-black opacity-50 animate-blink"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
          }}
        ></div>
      ))}

      {/* Rating Cards Centered */}
      <div className="flex-1 flex justify-center items-center w-full z-10 relative pt-24 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {ratings.map((r) => (
            <RatingCard
              key={r.id}
              label={r.label}
              color={r.color}
              Icon={r.icon}
              onClick={() => submitRatingOnly(r.id)}
            />
          ))}
        </div>
      </div>

      {/* Sea & Ships at Bottom */}
      <div className="w-full relative mt-12 h-40 overflow-hidden">
        {/* Waves */}
        <div className="absolute bottom-0 w-full h-20 bg-blue-300 rounded-t-full animate-wave1"></div>
        <div className="absolute bottom-0 w-full h-16 bg-blue-400 rounded-t-full opacity-70 animate-wave2"></div>

        {/* Ships */}
        <FaShip className="absolute bottom-8 left-0 text-gray-800 text-4xl animate-ship1" />
        <FaShip className="absolute bottom-12 right-0 text-gray-600 text-3xl animate-ship2" />

        {/* Fish */}
        <FaFish className="absolute bottom-4 left-1/2 text-blue-700 text-2xl animate-fish1" />
        <FaFish className="absolute bottom-6 right-1/3 text-blue-500 text-xl animate-fish2" />
      </div>

      {/* Modals */}
      <FeedbackModal open={open} setOpen={setOpen} submit={submitFeedback} />
      <FullPopup open={popupOpen} setOpen={setPopupOpen} rating={selectedRating} />

      {/* Animations */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-blink { animation: blink 2s infinite; }

        @keyframes wave1 { 0% { transform: translateX(0); } 50% { transform: translateX(-50px); } 100% { transform: translateX(0); } }
        .animate-wave1 { animation: wave1 6s infinite linear; }
        @keyframes wave2 { 0% { transform: translateX(0); } 50% { transform: translateX(50px); } 100% { transform: translateX(0); } }
        .animate-wave2 { animation: wave2 8s infinite linear; }

        @keyframes ship1 { 0% { left: -10%; } 100% { left: 110%; } }
        .animate-ship1 { animation: ship1 20s linear infinite; }
        @keyframes ship2 { 0% { right: -10%; } 100% { right: 110%; } }
        .animate-ship2 { animation: ship2 18s linear infinite; }

        @keyframes fish1 { 0% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } 100% { transform: translateX(-50%) translateY(0); } }
        .animate-fish1 { animation: fish1 3s ease-in-out infinite; }
        @keyframes fish2 { 0% { transform: translateX(50%) translateY(0); } 50% { transform: translateX(50%) translateY(8px); } 100% { transform: translateX(50%) translateY(0); } }
        .animate-fish2 { animation: fish2 4s ease-in-out infinite; }

        @keyframes bounce-slow { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-4px); } }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}</style>
    </div>
  );
}
