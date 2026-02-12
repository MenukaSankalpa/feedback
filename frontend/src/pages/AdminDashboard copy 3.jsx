import { useEffect, useState } from "react";
import axios from "axios";
import { FaFileCsv, FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars } from "react-icons/fa";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState("all");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const ratingMap = {
    1: { label: "Very Poor", color: "#ef4444", icon: <FaSadTear /> },
    2: { label: "Poor", color: "#f97316", icon: <FaFrown /> },
    3: { label: "Average", color: "#eab308", icon: <FaMeh /> },
    4: { label: "Good", color: "#22c55e", icon: <FaSmile /> },
    5: { label: "Excellent", color: "#3b82f6", icon: <FaGrinStars /> },
  };

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/feedback")
      .then((res) => {
        setData(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load feedback data");
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...data];

    // Rating filter
    if (filterRating !== "all") temp = temp.filter((d) => d.rating === parseInt(filterRating));

    // Date filter (inclusive)
    if (filterFrom) temp = temp.filter((d) => new Date(d.created_at) >= new Date(filterFrom));
    if (filterTo) temp = temp.filter((d) => new Date(d.created_at) <= new Date(filterTo + "T23:59:59"));

    setFiltered(temp);
  }, [filterRating, filterFrom, filterTo, data]);

  // Count per rating
  const counts = [1, 2, 3, 4, 5].map((r) => filtered.filter((d) => d.rating === r).length);

  // Download CSV
  const downloadCSV = () => {
    const header = ["ID", "Rating", "Name", "Email", "Phone", "Feedback", "Date"];
    const rows = filtered.map((d) => [
      d.id,
      d.rating,
      d.name || "",
      d.email || "",
      d.phone || "",
      d.feedback || "",
      new Date(d.created_at).toLocaleString(),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback_report.csv";
    link.click();
  };

  if (loading) return <div className="p-6 text-center">Loading feedback...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Admin Dashboard</h2>

      {/* Filter Panel */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Rating filter */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Rating:</span>
          <button
            className={`px-3 py-1 rounded-full text-white font-semibold ${
              filterRating === "all" ? "bg-gray-400" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterRating("all")}
          >
            All
          </button>
          {Object.entries(ratingMap).map(([key, r]) => (
            <button
              key={key}
              style={{ backgroundColor: r.color }}
              className={`px-3 py-1 rounded-full text-white font-semibold ${
                filterRating === key ? "ring-2 ring-offset-2 ring-green-500" : ""
              }`}
              onClick={() => setFilterRating(key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Date filters */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold">From:</span>
          <input
            type="date"
            className="px-2 py-1 rounded border border-gray-300"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
          />
          <span className="font-semibold">To:</span>
          <input
            type="date"
            className="px-2 py-1 rounded border border-gray-300"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
          />
        </div>

        {/* Download CSV */}
        <button
          className="flex items-center gap-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={downloadCSV}
        >
          <FaFileCsv /> Download CSV
        </button>
      </div>

      {/* Rating Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(ratingMap).map(([key, r], i) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg"
            style={{ backgroundColor: r.color + "33", color: r.color }}
          >
            <div className="text-3xl mb-2">{r.icon}</div>
            <div className="font-bold text-lg">{r.label}</div>
            <div className="text-2xl font-extrabold">{counts[i]}</div>
          </div>
        ))}
      </div>

      {/* Feedback Table */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No feedback found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-gray-700">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Rating</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Feedback</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, idx) => {
                // Only color ratings 1 and 2
                const bgColor = d.rating === 1 ? "#fee2e2" : d.rating === 2 ? "#ffedd5" : idx % 2 === 0 ? "#ffffff" : "#f9fafb";
                const textColor = d.rating === 1 ? "#b91c1c" : d.rating === 2 ? "#c2410c" : "#000000";
                return (
                  <tr
                    key={d.id}
                    className="text-center hover:bg-green-50"
                    style={{ backgroundColor: bgColor, color: textColor }}
                  >
                    <td className="px-4 py-2 border-b">{d.id}</td>
                    <td className="px-4 py-2 border-b font-bold">{d.rating}</td>
                    <td className="px-4 py-2 border-b">{d.name || "-"}</td>
                    <td className="px-4 py-2 border-b">{d.email || "-"}</td>
                    <td className="px-4 py-2 border-b">{d.phone || "-"}</td>
                    <td className="px-4 py-2 border-b">{d.feedback || "-"}</td>
                    <td className="px-4 py-2 border-b">{new Date(d.created_at).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
