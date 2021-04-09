import { Election } from "./election";
import { Party } from "./party";

export interface PartyResult {
  party: Party,
  votes: number,
  mandates: number
}
