import { motion } from "framer-motion";

export default function RatingCard({ label, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl text-white cursor-pointer shadow-lg"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold text-center">{label}</h2>
    </motion.div>
  );
}
