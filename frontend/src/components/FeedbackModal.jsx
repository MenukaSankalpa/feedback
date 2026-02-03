export default function FeedbackModal({ open, setOpen, submit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96">
        <h3 className="mb-3 text-lg font-bold text-green-600">
          Feedback
        </h3>
        <input className="input" placeholder="Name" />
        <input className="input" placeholder="Phone" />
        <textarea className="input" placeholder="Feedback" />
        <button
          className="btn-green w-full"
          onClick={() => {
            submit();
            setOpen(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
