import Timer "mo:base/Timer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor {

  // ---------- DATA TYPES ----------
  public type Principle = {
    id        : Nat;
    text      : Text;
    carvedAt  : Time.Time;
    proposer  : Principal;
  };

  public type Proposal = {
    id        : Nat;
    text      : Text;
    proposer  : Principal;
    proposedAt: Time.Time;
    approvals : [Principal];
    validatorsAtCreation : Nat;
  };

  // ---------- STATE ----------
  stable var principles : [Principle] = [];
  stable var proposals  : [Proposal]  = [];
  stable var validators : [Principal] = [Principal.fromText("aaaaa-aa")]; // will be overwritten after first carve

  // ---------- CONSTANTS ----------
  let THRESHOLD : Nat = 60;    // percentage

  // ---------- QUERIES ----------
  public query func listPrinciples() : async [Principle] {
    principles
  };

  public query func listProposals()  : async [Proposal] {
    proposals
  };

  public query func isValidator(p : Principal) : async Bool {
    Array.find<Principal>(validators, func (v) { v == p }) != null
  };

  // ---------- CALLS ----------
  public shared({ caller }) func propose(text : Text) : async Nat {
    assert text.size() >= 5 and text.size() <= 90;
    assert Text.startsWith(text, #text "We") == true;

    let id = proposals.size();
    let now = Time.now();
    let prop : Proposal = {
      id = id;
      text = text;
      proposer = caller;
      proposedAt = now;
      approvals = [];
      validatorsAtCreation = validators.size();
    };
    proposals := Array.append(proposals, [prop]);
    id
  };

  public shared({ caller }) func approve(id : Nat) : async () {
    assert(id < proposals.size());
    let isVal = await isValidator(caller);
    assert isVal;
    
    // Create a mutable copy of the proposals array
    var updatedProposals = Array.thaw<Proposal>(proposals);
    var prop = updatedProposals[id];
    
    if(Array.find<Principal>(prop.approvals, func (p){ p==caller}) == null){
      // Create a new proposal with updated approvals
      let updatedProp : Proposal = {
        id = prop.id;
        text = prop.text;
        proposer = prop.proposer;
        proposedAt = prop.proposedAt;
        approvals = Array.append(prop.approvals, [caller]);
        validatorsAtCreation = prop.validatorsAtCreation;
      };
      
      updatedProposals[id] := updatedProp;
      proposals := Array.freeze(updatedProposals);
      
      if (updatedProp.approvals.size() * 100 >= THRESHOLD * updatedProp.validatorsAtCreation){
        carveInternal(id);
      };
    };
  };

  // ---------- PRIVATE ----------
  private func carveInternal(id : Nat){
    let prop = proposals[id];
    principles := Array.append(principles,[{
      id = principles.size();
      text = prop.text;
      carvedAt = Time.now();
      proposer = prop.proposer;
    }]);
    validators := Array.append(validators,[prop.proposer]);
    
    // Create a new array without the proposal at index id
    let newProposals = Array.tabulate<Proposal>(proposals.size()-1, func(i){
      if (i < id) { proposals[i] } else { proposals[i+1] };
    });
    
    proposals := newProposals;
  };

  // ---------- TIMER : purge 24h time‑outs ----------
  func purge() : async (){
    let cutoff = Time.now() - (24*60*60*1_000_000_000);
    proposals := Array.filter<Proposal>(proposals, func (p){ p.proposedAt >= cutoff });
  };

  ignore Timer.recurringTimer(#seconds 3600, purge);
}