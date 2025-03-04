export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Suit = "H" | "D" | "C" | "S";

export const SuitSymbols: Record<Suit, string> = {
  H: "♥",
  D: "♦",
  C: "♣",
  S: "♠",
};

export const RankValues: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export enum HandRank {
  HighCard = 0,
  Pair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  Straight = 4,
  Flush = 5,
  FullHouse = 6,
  FourOfAKind = 7,
  StraightFlush = 8,
  RoyalFlush = 9,
}

export const HandRankNames: Record<HandRank, string> = {
  [HandRank.HighCard]: "Carte Haute",
  [HandRank.Pair]: "Paire",
  [HandRank.TwoPair]: "Deux Paires",
  [HandRank.ThreeOfAKind]: "Brelan",
  [HandRank.Straight]: "Quinte",
  [HandRank.Flush]: "Couleur",
  [HandRank.FullHouse]: "Full",
  [HandRank.FourOfAKind]: "Carré",
  [HandRank.StraightFlush]: "Quinte Flush",
  [HandRank.RoyalFlush]: "Quinte Flush Royale",
};

export enum ComparisonResult {
  Tie = 0,
  Hand1Wins = 1,
  Hand2Wins = 2,
}

export interface ComparisonDetails {
  hand1: {
    cards: string;
    rank: string;
  };
  hand2: {
    cards: string;
    rank: string;
  };
  winner: string;
  result: ComparisonResult;
}

export interface ErrorResult {
  error: string;
}

export type ComparisonResponse = ComparisonDetails | ErrorResult;
