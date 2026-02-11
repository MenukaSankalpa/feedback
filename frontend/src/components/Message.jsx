export default function Message({ type, text }) {
  return (
    <div
      className={`w-full text-center py-2 mb-4 rounded font-medium ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      } animate-pulse`}
    >
      {text}
    </div>
  );
}
