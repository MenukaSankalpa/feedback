export default function Message({ type, text }) {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${colors[type]} px-4 py-2 rounded mb-3 shadow-sm`}>
      {text}
    </div>
  );
}
