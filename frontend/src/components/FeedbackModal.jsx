import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Message from "./Message.jsx";

export default function FeedbackModal({ open, setOpen }) {
  const [form, setForm] = useState({
    rating: 5,
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
    try {
      /* 1️⃣ Save to Database */
      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      /* 2️⃣ Send Email via EmailJS */
      await emailjs.send(
  "service_91s2ptd",
  "template_kbewwgf",
  form,
  "NMPdIAC3jeDWOKcC0"
).then(
  (result) => {
    console.log("SUCCESS:", result);
  },
  (error) => {
    console.log("FULL ERROR:", error);
  }
);

      setSuccess(true);

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setForm({
          rating: 5,
          name: "",
          email: "",
          phone: "",
          feedback: "",
        });
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <h3 className="mb-4 text-lg font-bold text-green-600">Feedback</h3>

        {success && <Message type="success" text="Feedback submitted!" />}

        <input className="input mb-2" name="name" placeholder="Name"
          value={form.name} onChange={handleChange} />

        <input className="input mb-2" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} />

        <input className="input mb-2" name="phone" placeholder="Phone"
          value={form.phone} onChange={handleChange} />

        <textarea className="input mb-2" name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange} />

        <button className="btn-green w-full mt-2"
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}