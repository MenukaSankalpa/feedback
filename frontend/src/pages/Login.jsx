import { useState, useEffect } from "react";
import axios from "axios";
import { User, Lock, Sun, Moon } from "lucide-react";

// Message Component
const Message = ({ type, text }) => (
  <div
    className={`w-full text-center py-2 mb-4 rounded font-medium transition-all ${
      type === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    } animate-pulse`}
  >
    {text}
  </div>
);

// Dark Mode Toggle (clickable)
const DarkModeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:scale-110 transition"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />}
    </button>
  );
};

export default function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  // Persist dark mode
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Load remembered username
  useEffect(() => {
    const saved = localStorage.getItem("rememberedUser");
    if (saved) setUsername(saved);
  }, []);

  const login = async () => {
    setMessage(null);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      setRole(res.data.role);
      setMessage({ type: "success", text: res.data.message });
      if (remember) localStorage.setItem("rememberedUser", username);
      else localStorage.removeItem("rememberedUser");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Dark mode toggle */}
      <DarkModeToggle dark={dark} setDark={setDark} />

      {/* Blinking gradient circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-green-400/30 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-green-500/30 rounded-full animate-ping-slow delay-2000"></div>
        <div className="absolute top-[20%] right-[-40px] w-64 h-64 bg-green-300/40 rounded-full animate-ping-slow delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl w-full max-w-sm shadow-2xl flex flex-col items-center backdrop-blur-md">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Admin Login
        </h2>

        {message && <Message type={message.type} text={message.text} />}

        <div className="w-full mb-4 relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <div className="w-full mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <label className="flex items-center mb-6 w-full text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2 w-4 h-4 accent-green-600"
          />
          Remember Me
        </label>

        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-500 dark:text-gray-300 text-sm">
          Demo Accounts: Admin (admin/admin123) | User (user/user123)
        </p>
      </div>

      <style>
        {`
          @keyframes ping-slow {
            0% { transform: scale(0.8); opacity: 0.4; }
            50% { transform: scale(1); opacity: 0.2; }
            100% { transform: scale(0.8); opacity: 0.4; }
          }
          .animate-ping-slow {
            animation: ping-slow 4s infinite;
          }
        `}
      </style>
    </div>
  );
}
