import { PartyResult } from "./partyResult";

export interface Election {
  date: Date,
  number: number,
  ahuzHasima: number,
  partyResults?: PartyResult[],
  numberOfPartiesThatPassedAhuzHasima?: number,
  loadingAPICall: boolean
}
