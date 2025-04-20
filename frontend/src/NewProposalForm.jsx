import { useState } from "react";
import { submitProposal } from "./api";

export default function NewProposalForm({ onSuccess }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.startsWith("We") || text.length > 90) {
      setError("Principles must start with 'We' and be 5–90 characters.");
      return;
    }
    try {
      await submitProposal(text);
      setText("");
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to submit proposal.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Start with “We …” (5–90 chars)'
        className="w-full rounded border p-2"
        rows={3}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Submit Proposal
      </button>
    </form>
  );
}
