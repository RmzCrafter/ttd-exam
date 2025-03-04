import { Card } from "./card";
import { Hand } from "./hand";
import { compareHands, determineWinner } from "./evaluator";
import { dealPokerHands, formatComparisonResult } from "./utils";
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
  console.log("=== COMPARATEUR DE MAINS DE POKER ===\n");

  const hand1 = "AH KH QH JH 10H";
  const hand2 = "AS KS QS JS 9S";

  console.log(`Main 1: ${hand1}`);
  console.log(`Main 2: ${hand2}`);
  console.log("Résultat:", compareHandsFromStrings(hand1, hand2));

  console.log("\n=== SIMULATION D'UNE PARTIE ===\n");

  try {
    const hands = dealPokerHands(4);

    console.log("Distribution des cartes:");
    hands.forEach((hand, index) => {
      console.log(`Joueur ${index + 1}: ${hand.join(" ")}`);
    });

    console.log("\nComparaison des mains:");

    for (let i = 0; i < hands.length; i++) {
      for (let j = i + 1; j < hands.length; j++) {
        const result = compareHandsFromStrings(
          hands[i].join(" "),
          hands[j].join(" ")
        );
        console.log(`Joueur ${i + 1} vs Joueur ${j + 1}:`, result);
      }
    }

    let winCount = new Array(hands.length).fill(0);

    for (let i = 0; i < hands.length; i++) {
      for (let j = 0; j < hands.length; j++) {
        if (i === j) continue;

        const result = compareHandsFromStrings(
          hands[i].join(" "),
          hands[j].join(" ")
        );
        if (
          "result" in result &&
          result.result === ComparisonResult.Hand1Wins
        ) {
          winCount[i]++;
        }
      }
    }

    const maxWins = Math.max(...winCount);
    const winners = winCount
      .map((count, index) => ({ count, index }))
      .filter((item) => item.count === maxWins)
      .map((item) => item.index + 1);

    if (winners.length === 1) {
      console.log(
        `\nLe gagnant est le Joueur ${winners[0]} avec ${maxWins} victoires!`
      );
    } else {
      console.log(
        `\nÉgalité entre les Joueurs ${winners.join(
          ", "
        )} avec ${maxWins} victoires chacun!`
      );
    }
  } catch (error) {
    console.error("Erreur lors de la simulation:", error);
  }
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
