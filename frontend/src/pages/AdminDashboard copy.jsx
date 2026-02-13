import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/feedback")
      .then((res) => {
        console.log("Fetched feedback:", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load feedback data:", err);
        alert("Failed to load feedback data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Loading feedback...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold text-green-600">Admin Dashboard</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No feedback yet</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-100 text-gray-700">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Feedback</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id} className="text-center">
                <td className="border px-4 py-2">{d.id}</td>
                <td className="border px-4 py-2">{d.rating}</td>
                <td className="border px-4 py-2">{d.name || "-"}</td>
                <td className="border px-4 py-2">{d.email || "-"}</td>
                <td className="border px-4 py-2">{d.phone || "-"}</td>
                <td className="border px-4 py-2">{d.feedback || "-"}</td>
                <td className="border px-4 py-2">
                  {new Date(d.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
