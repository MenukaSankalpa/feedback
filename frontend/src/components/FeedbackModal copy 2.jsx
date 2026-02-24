import React, { useState } from "react";
import Message from "./Message.jsx";

export default function FeedbackModal({ open, setOpen, submit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await submit(form);
    setSuccess(true);
    setTimeout(() => {
      setOpen(false);
      setSuccess(false);
      setForm({ name: "", email: "", phone: "", feedback: "" });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <h3 className="mb-4 text-lg font-bold text-green-600">Feedback</h3>

        {success && <Message type="success" text="Feedback submitted!" />}

        <input
          className="input mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="input mb-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="input mb-2"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          className="input mb-2"
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
        />

        <button
          className="btn-green w-full mt-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
