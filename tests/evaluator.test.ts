import { Card } from "../src/card";
import { Hand } from "../src/hand";
import { compareHands, determineWinner } from "../src/evaluator";
import { ComparisonResult } from "../src/types/types";
import { AssertFunction, AssertEqualsFunction } from "./types/test-types";

module.exports = (
  assert: AssertFunction,
  assertEquals: AssertEqualsFunction
) => {
  console.log("Tests de l'évaluateur de mains");

  (() => {
    const royalFlush = new Hand([
      new Card("A", "H"),
      new Card("K", "H"),
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("10", "H"),
    ]);

    const straightFlush = new Hand([
      new Card("9", "S"),
      new Card("8", "S"),
      new Card("7", "S"),
      new Card("6", "S"),
      new Card("5", "S"),
    ]);

    const result1 = compareHands(royalFlush, straightFlush);
    assert(
      result1 > 0,
      "Quinte Flush Royale devrait gagner contre Quinte Flush"
    );

    const fourOfAKind = new Hand([
      new Card("7", "H"),
      new Card("7", "D"),
      new Card("7", "S"),
      new Card("7", "C"),
      new Card("9", "H"),
    ]);

    const fullHouse = new Hand([
      new Card("10", "H"),
      new Card("10", "D"),
      new Card("10", "S"),
      new Card("4", "C"),
      new Card("4", "H"),
    ]);

    const result2 = compareHands(fourOfAKind, fullHouse);
    assert(result2 > 0, "Carré devrait gagner contre Full");

    const hands = [
      { name: "Quinte Flush Royale", hand: royalFlush },
      { name: "Quinte Flush", hand: straightFlush },
      { name: "Carré", hand: fourOfAKind },
      { name: "Full", hand: fullHouse },
      {
        name: "Couleur",
        hand: new Hand([
          new Card("A", "C"),
          new Card("10", "C"),
          new Card("7", "C"),
          new Card("6", "C"),
          new Card("2", "C"),
        ]),
      },
      {
        name: "Quinte",
        hand: new Hand([
          new Card("9", "H"),
          new Card("8", "C"),
          new Card("7", "S"),
          new Card("6", "D"),
          new Card("5", "H"),
        ]),
      },
      {
        name: "Brelan",
        hand: new Hand([
          new Card("8", "H"),
          new Card("8", "D"),
          new Card("8", "S"),
          new Card("K", "C"),
          new Card("3", "D"),
        ]),
      },
      {
        name: "Deux Paires",
        hand: new Hand([
          new Card("J", "H"),
          new Card("J", "C"),
          new Card("4", "S"),
          new Card("4", "H"),
          new Card("A", "D"),
        ]),
      },
      {
        name: "Paire",
        hand: new Hand([
          new Card("10", "H"),
          new Card("10", "C"),
          new Card("K", "S"),
          new Card("4", "H"),
          new Card("3", "D"),
        ]),
      },
      {
        name: "Carte Haute",
        hand: new Hand([
          new Card("A", "S"),
          new Card("J", "H"),
          new Card("9", "D"),
          new Card("7", "C"),
          new Card("2", "S"),
        ]),
      },
    ];

    for (let i = 0; i < hands.length; i++) {
      for (let j = i + 1; j < hands.length; j++) {
        const result = compareHands(hands[i].hand, hands[j].hand);
        assert(
          result > 0,
          `${hands[i].name} devrait gagner contre ${hands[j].name}, mais le résultat est ${result}`
        );
      }
    }
  })();

  (() => {
    const highStraightFlush = new Hand([
      new Card("J", "D"),
      new Card("10", "D"),
      new Card("9", "D"),
      new Card("8", "D"),
      new Card("7", "D"),
    ]);

    const lowStraightFlush = new Hand([
      new Card("9", "S"),
      new Card("8", "S"),
      new Card("7", "S"),
      new Card("6", "S"),
      new Card("5", "S"),
    ]);

    const result1 = compareHands(highStraightFlush, lowStraightFlush);
    assert(result1 > 0, "La quinte flush la plus haute devrait gagner");

    const highFourOfAKind = new Hand([
      new Card("K", "H"),
      new Card("K", "D"),
      new Card("K", "S"),
      new Card("K", "C"),
      new Card("3", "H"),
    ]);

    const lowFourOfAKind = new Hand([
      new Card("7", "H"),
      new Card("7", "D"),
      new Card("7", "S"),
      new Card("7", "C"),
      new Card("A", "H"),
    ]);

    const result2 = compareHands(highFourOfAKind, lowFourOfAKind);
    assert(
      result2 > 0,
      "Le carré de Rois devrait gagner contre le carré de 7, même avec un As"
    );

    const highFullHouse = new Hand([
      new Card("J", "H"),
      new Card("J", "D"),
      new Card("J", "S"),
      new Card("8", "C"),
      new Card("8", "H"),
    ]);

    const lowFullHouse = new Hand([
      new Card("10", "H"),
      new Card("10", "D"),
      new Card("10", "S"),
      new Card("A", "C"),
      new Card("A", "H"),
    ]);

    const result3 = compareHands(highFullHouse, lowFullHouse);
    assert(
      result3 > 0,
      "Le full aux Valets devrait gagner contre le full aux 10, même avec une paire d'As"
    );

    const highTwoPair = new Hand([
      new Card("K", "H"),
      new Card("K", "D"),
      new Card("3", "S"),
      new Card("3", "C"),
      new Card("5", "H"),
    ]);

    const lowTwoPair = new Hand([
      new Card("Q", "H"),
      new Card("Q", "D"),
      new Card("J", "S"),
      new Card("J", "C"),
      new Card("A", "H"),
    ]);

    const result4 = compareHands(highTwoPair, lowTwoPair);
    assert(
      result4 > 0,
      "Double paire Rois-3 devrait gagner contre Dames-Valets, même avec un As"
    );

    const aceHigh = new Hand([
      new Card("A", "H"),
      new Card("10", "D"),
      new Card("8", "S"),
      new Card("7", "C"),
      new Card("2", "H"),
    ]);

    const kingHigh = new Hand([
      new Card("K", "H"),
      new Card("Q", "D"),
      new Card("J", "S"),
      new Card("10", "C"),
      new Card("9", "H"),
    ]);

    const result5 = compareHands(aceHigh, kingHigh);
    assert(
      result5 > 0,
      "As haut devrait gagner contre Roi haut, même avec de meilleures cartes secondaires"
    );
  })();

  (() => {
    const hand1 = new Hand([
      new Card("A", "H"),
      new Card("K", "H"),
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("10", "H"),
    ]);

    const hand2 = new Hand([
      new Card("9", "S"),
      new Card("8", "S"),
      new Card("7", "S"),
      new Card("6", "S"),
      new Card("5", "S"),
    ]);

    const result1 = determineWinner(hand1, hand2);
    assertEquals(
      result1,
      ComparisonResult.Hand1Wins,
      "La main 1 (Quinte Flush Royale) devrait gagner"
    );

    const result2 = determineWinner(hand2, hand1);
    assertEquals(
      result2,
      ComparisonResult.Hand2Wins,
      "La main 2 (Quinte Flush Royale) devrait gagner"
    );

    const sameHand1 = new Hand([
      new Card("A", "H"),
      new Card("K", "H"),
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("10", "H"),
    ]);

    const sameHand2 = new Hand([
      new Card("A", "S"),
      new Card("K", "S"),
      new Card("Q", "S"),
      new Card("J", "S"),
      new Card("10", "S"),
    ]);

    const result3 = determineWinner(sameHand1, sameHand2);
    assertEquals(
      result3,
      ComparisonResult.Tie,
      "Les mains identiques devraient être à égalité"
    );
  })();
};
