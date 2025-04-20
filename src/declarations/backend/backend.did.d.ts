import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Principle {
  'id' : bigint,
  'text' : string,
  'carvedAt' : Time,
  'proposer' : Principal,
}
export interface Proposal {
  'id' : bigint,
  'text' : string,
  'proposer' : Principal,
  'validatorsAtCreation' : bigint,
  'proposedAt' : Time,
  'approvals' : Array<Principal>,
}
export type Time = bigint;
export interface _SERVICE {
  'approve' : ActorMethod<[bigint], undefined>,
  'isValidator' : ActorMethod<[Principal], boolean>,
  'listPrinciples' : ActorMethod<[], Array<Principle>>,
  'listProposals' : ActorMethod<[], Array<Proposal>>,
  'propose' : ActorMethod<[string], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
