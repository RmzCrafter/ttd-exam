import { Hand } from "./hand";
import { ComparisonResult, HandRank } from "./types/types";

export function compareHands(hand1: Hand, hand2: Hand): number {
  const rank1 = hand1.getHandRank();
  const rank2 = hand2.getHandRank();

  if (rank1 !== rank2) {
    return rank1 - rank2;
  }

  return compareTieBreakers(hand1, hand2, rank1);
}

function compareTieBreakers(hand1: Hand, hand2: Hand, rank: HandRank): number {
  const tieBreakers1 = hand1.getTieBreakers();
  const tieBreakers2 = hand2.getTieBreakers();

  for (let i = 0; i < Math.min(tieBreakers1.length, tieBreakers2.length); i++) {
    if (tieBreakers1[i] !== tieBreakers2[i]) {
      return tieBreakers1[i] - tieBreakers2[i];
    }
  }

  if (rank === HandRank.StraightFlush || rank === HandRank.Straight) {
    const isLowStraight1 =
      hand1.cards[0].getValue() === 14 && hand1.cards[1].getValue() === 5;
    const isLowStraight2 =
      hand2.cards[0].getValue() === 14 && hand2.cards[1].getValue() === 5;

    if (isLowStraight1 && !isLowStraight2) {
      return -1;
    } else if (!isLowStraight1 && isLowStraight2) {
      return 1;
    } else {
      return hand1.cards[0].getValue() - hand2.cards[0].getValue();
    }
  }

  if (rank === HandRank.Flush || rank === HandRank.HighCard) {
    for (let i = 0; i < 5; i++) {
      const value1 = hand1.cards[i].getValue();
      const value2 = hand2.cards[i].getValue();

      if (value1 !== value2) {
        return value1 - value2;
      }
    }
  }

  return 0;
}

export function determineWinner(hand1: Hand, hand2: Hand): ComparisonResult {
  const result = compareHands(hand1, hand2);

  if (result > 0) {
    return ComparisonResult.Hand1Wins;
  } else if (result < 0) {
    return ComparisonResult.Hand2Wins;
  } else {
    return ComparisonResult.Tie;
  }
}
