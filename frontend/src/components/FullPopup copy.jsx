import React, { useEffect } from "react";
import { FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars } from "react-icons/fa";

export default function FullPopup({ open, setOpen, rating }) {
  // Map rating to corresponding icon and color
  const ratingMap = {
    1: { icon: <FaSadTear />, color: "#dc2626" }, // Red
    2: { icon: <FaFrown />, color: "#f97316" },    // Orange
    3: { icon: <FaMeh />, color: "#eab308" },      // Yellow
    4: { icon: <FaSmile />, color: "#22c55e" },    // Light Green
    5: { icon: <FaGrinStars />, color: "#16a34a" } // Dark Green
  };

  const current = ratingMap[rating] || { icon: <FaSmile />, color: "#16a34a" };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 2000); // auto-close after 2s
      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-11/12 max-w-xs flex flex-col items-center justify-center animate-scaleUp">
        {/* Icon */}
        <div
          className="text-8xl mb-4 flex items-center justify-center animate-bounce"
          style={{ color: current.color }}
        >
          {current.icon}
        </div>

        {/* Thank You Message */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 text-center">
          Thank You!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
          You rated {rating} star{rating > 1 ? "s" : ""}!
        </p>

        {/* Animation styles */}
        <style>{`
          @keyframes scaleUp {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleUp { animation: scaleUp 0.5s ease-out forwards; }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce { animation: bounce 1s infinite; }
        `}</style>
      </div>
    </div>
  );
}
