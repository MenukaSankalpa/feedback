import { useState } from "react";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [role, setRole] = useState(null);

  if (!role) return <Login setRole={setRole} />;

  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
}
