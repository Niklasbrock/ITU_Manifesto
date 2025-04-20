// frontend/src/api.js
import { backend } from "../../src/declarations/backend";

export async function fetchPrinciples() {
  return await backend.listPrinciples();
}
export async function submitProposal(text) {
  return await backend.propose(text);
}
export async function fetchProposals() {
  return await backend.listProposals();
}
