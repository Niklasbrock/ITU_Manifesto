// frontend/src/PrincipleCard.jsx
export default function PrincipleCard({ text, index }) {
    return (
      <li className="mb-2 rounded bg-white px-4 py-2 shadow">
        <span className="mr-2 font-bold text-gray-500">{index + 1}.</span>
        {text}
      </li>
    );
  }
  