import { Card } from "./card";
import { Hand } from "./hand";
import { compareHands, determineWinner } from "./evaluator";
import {
  Rank,
  Suit,
  HandRank,
  HandRankNames,
  ComparisonResult,
  ComparisonDetails,
  ComparisonResponse,
} from "./types/types";

export function createCardFromString(str: string): Card {
  if (str.length < 2 || str.length > 3) {
    throw new Error(
      `Format de carte invalide: ${str} (devrait être RANG+COULEUR, ex: "AS" pour As de Pique)`
    );
  }

  const rank = str.length === 2 ? str[0] : str.substring(0, 2);
  const suit = str[str.length - 1];

  const suitMap: Record<string, Suit | undefined> = {
    H: "H",
    D: "D",
    C: "C",
    S: "S",
  };

  const convertedSuit = suitMap[suit.toUpperCase()];
  if (!convertedSuit) {
    throw new Error(`Couleur invalide: ${suit} (utilisez H, D, C ou S)`);
  }

  const validRanks: Record<string, Rank | undefined> = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    J: "J",
    Q: "Q",
    K: "K",
    A: "A",
  };

  const convertedRank = validRanks[rank.toUpperCase()];
  if (!convertedRank) {
    throw new Error(`Rang invalide: ${rank} (utilisez 2-10, J, Q, K, A)`);
  }

  return new Card(convertedRank, convertedSuit);
}

export function createHandFromString(str: string): Hand {
  const cardStrings = str.trim().split(/\s+/);
  if (cardStrings.length !== 5) {
    throw new Error(
      `Une main doit contenir exactement 5 cartes, reçu: ${cardStrings.length}`
    );
  }

  const cards = cardStrings.map(createCardFromString);
  return new Hand(cards);
}

export function compareHandsFromStrings(
  hand1Str: string,
  hand2Str: string
): ComparisonResponse {
  try {
    const hand1 = createHandFromString(hand1Str);
    const hand2 = createHandFromString(hand2Str);

    const winner = determineWinner(hand1, hand2);

    const result: ComparisonDetails = {
      hand1: {
        cards: hand1.toString(),
        rank: HandRankNames[hand1.getHandRank()],
      },
      hand2: {
        cards: hand2.toString(),
        rank: HandRankNames[hand2.getHandRank()],
      },
      winner:
        winner === ComparisonResult.Tie
          ? "Égalité"
          : `Main ${winner === ComparisonResult.Hand1Wins ? "1" : "2"}`,
      result: winner,
    };

    return result;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

if (require.main === module) {
  const hand1 = "AH KH QH JH 10H";
  const hand2 = "AS KS QS JS 9S";

  console.log(`Main 1: ${hand1}`);
  console.log(`Main 2: ${hand2}`);
  console.log("Résultat:", compareHandsFromStrings(hand1, hand2));
}

export {
  Card,
  Hand,
  compareHands,
  determineWinner,
  HandRank,
  HandRankNames,
  ComparisonResult,
};
