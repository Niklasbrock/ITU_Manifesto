export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Principle = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'carvedAt' : Time,
    'proposer' : IDL.Principal,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'proposer' : IDL.Principal,
    'validatorsAtCreation' : IDL.Nat,
    'proposedAt' : Time,
    'approvals' : IDL.Vec(IDL.Principal),
  });
  return IDL.Service({
    'approve' : IDL.Func([IDL.Nat], [], []),
    'isValidator' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'listPrinciples' : IDL.Func([], [IDL.Vec(Principle)], ['query']),
    'listProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'propose' : IDL.Func([IDL.Text], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
