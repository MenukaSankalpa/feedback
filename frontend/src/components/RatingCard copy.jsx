import React from "react";

export default function RatingCard({ label, color, onClick, Icon }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:scale-105 transition-transform group"
      style={{
        background: `linear-gradient(145deg, ${color}20, ${color}40)`, // polished gradient
        backdropFilter: "blur(10px)", // soft glassy effect
      }}
    >
      {/* Icon with original color */}
      <div
        className="text-4xl mb-2 group-hover:scale-110 transition-transform"
        style={{ color: color }}
      >
        {Icon}
      </div>

      {/* Label with original color */}
      <span className="font-semibold text-lg" style={{ color: color }}>
        {label}
      </span>

      {/* Small animated dots */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-3 right-4 w-2 h-2 bg-white rounded-full animate-bounce-slow delay-500"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce-slow delay-1000"></div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}
