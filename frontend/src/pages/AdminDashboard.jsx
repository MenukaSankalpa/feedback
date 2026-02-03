import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold text-green-600">
        Admin Dashboard
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-green-100">
            <th>ID</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="text-center">
              <td>{d.id}</td>
              <td>{d.rating}</td>
              <td>{d.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
