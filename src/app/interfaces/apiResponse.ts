export interface PartiResult{
  name: string,
  votes: number,
  mandats: number
}

export interface ApiResponse {
  beforeBaderOffer: {
    [key: string]: PartiResult
  },
  realResults: {
    [key: string]: PartiResult
  },
  time: string,
  voteData: {
    [key: string]: PartiResult
  },
  withoutAgreements: {
    [key: string]: PartiResult
  }
}
