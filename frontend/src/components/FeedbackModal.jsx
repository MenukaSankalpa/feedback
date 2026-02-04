import { useState } from "react";

export default function FeedbackModal({ open, setOpen, submit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    submit(form); // send full data to parent
    setOpen(false);
    setForm({ name: "", email: "", phone: "", feedback: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96 shadow-lg">
        <h3 className="mb-4 text-lg font-bold text-green-600">Feedback</h3>

        <input
          className="input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="input"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          className="input"
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
        />

        <button className="btn-green w-full mt-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
