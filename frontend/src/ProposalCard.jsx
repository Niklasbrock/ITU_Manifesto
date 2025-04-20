// frontend/src/ProposalCard.jsx
export default function ProposalCard({ p }) {
    const date = new Date(Number(p.proposedAt) / 1_000_000);
    const approved = Number(p.approvals.length);
    const total = Number(p.validatorsAtCreation);
    const percentApproved = total === 0 ? 0 : Math.floor((approved / total) * 100);
    
    return (
      <li className="mb-4 rounded border border-yellow-300 bg-yellow-50 p-3 shadow-sm">
        <p className="text-sm text-gray-700">
          <strong>Proposal:</strong> {p.text}
        </p>
        <p className="text-xs text-gray-500">
          {p.approvals.length} of {p.validatorsAtCreation} approvals ({percentApproved}%)
        </p>
        <p className="text-xs text-gray-400">Proposed on {date.toLocaleString()}</p>
      </li>
    );
  }
  