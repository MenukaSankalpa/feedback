import React from "react";

export default function RatingCard({ label, color, onClick, Icon }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform group animate-pulseCard"
      style={{
        background: `linear-gradient(145deg, ${color}20, ${color}50)`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Icon */}
      <div
        className="text-5xl mb-2 group-hover:scale-110 transition-transform"
        style={{ color }}
      >
        {Icon}
      </div>

      {/* Label */}
      <span className="text-lg font-bold" style={{ color }}>
        {label}
      </span>

      {/* Card blink animation */}
      <style>{`
        @keyframes pulseCard {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        .animate-pulseCard {
          animation: pulseCard 2s infinite;
        }
      `}</style>
    </div>
  );
}
