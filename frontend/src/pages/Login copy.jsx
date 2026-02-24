import { useState } from "react";
import axios from "axios";

export default function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const login = async () => {
  //   const res = await axios.post("http://localhost:5000/api/auth/login", {
  //     username,
  //     password,
  //   });

  //   localStorage.setItem("token", res.data.token);
  //   setRole(res.data.role);
  // };

const login = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/admin/login", {
      username,
      password,
    });

    localStorage.setItem("role", res.data.role); // store role
    alert(res.data.message);
    setRole(res.data.role); // admin or user
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="h-screen flex items-center justify-center bg-green-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-center font-bold text-green-600">
          Login
        </h2>
        <input
          className="input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-green w-full" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
