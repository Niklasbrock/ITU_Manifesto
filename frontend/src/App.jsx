// frontend/src/App.jsx
import { useEffect, useState } from "react";
import { fetchPrinciples } from "./api";
import PrincipleCard from "./PrincipleCard";
import NewProposalForm from "./NewProposalForm";
import { fetchProposals } from "./api";
import ProposalCard from "./ProposalCard";

export default function App() {
  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPrinciples = async () => {
    setLoading(true);
    const data = await fetchPrinciples();
    setPrinciples(data);
    setLoading(false);
  };
    const [proposals, setProposals] = useState([]);
    const loadProposals = async () => {
    const res = await fetchProposals();
    setProposals(res);
    };

  useEffect(() => {
    loadPrinciples();
    loadProposals();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
          ITU Manifesto
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Viewing the current principles is open to all.
        </p>
        {loading ? (
          <p className="text-center text-gray-500">Loading…</p>
        ) : (
          <ul className="list-inside list-disc space-y-2">
            {principles.map((text, i) => (
              <PrincipleCard key={i} text={text} index={i} />
            ))}
          </ul>
        )}
        <NewProposalForm onSuccess={loadPrinciples} />
        <h2 className="mt-10 mb-2 text-xl font-semibold text-gray-800">Pending Proposals</h2>
        <ul>
            {proposals.map((p) => (
                <ProposalCard key={p.id} p={p} />
            ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            onClick={loadPrinciples}
            className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Reload Principles
          </button>
        </div>
      </div>
    </div>
  );
}
