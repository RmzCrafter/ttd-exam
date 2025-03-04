import { Card } from "../src/card";
import { Hand } from "../src/hand";
import { HandRank } from "../src/types/types";
import { AssertFunction, AssertEqualsFunction } from "./types/test-types";

module.exports = (
  assert: AssertFunction,
  assertEquals: AssertEqualsFunction
) => {
  console.log("Tests de la classe Hand");

  (() => {
    const cards = [
      new Card("A", "H"),
      new Card("K", "H"),
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("10", "H"),
    ];

    const hand = new Hand(cards);
    assert(hand.cards.length === 5, "Une main doit contenir 5 cartes");

    const sortedValues = hand.cards.map((card) => card.getValue());
    assertEquals(
      sortedValues,
      [14, 13, 12, 11, 10],
      "Les cartes doivent être triées par valeur décroissante"
    );
  })();

  (() => {
    try {
      new Hand([new Card("A", "H"), new Card("K", "H")]);
      assert(
        false,
        "Une erreur aurait dû être levée pour une main avec moins de 5 cartes"
      );
    } catch (error) {
      assert(
        true,
        "Une erreur a bien été levée pour une main avec moins de 5 cartes"
      );
    }

    try {
      new Hand([
        new Card("A", "H"),
        new Card("K", "H"),
        new Card("Q", "H"),
        new Card("J", "H"),
        new Card("10", "H"),
        new Card("9", "H"),
      ]);
      assert(
        false,
        "Une erreur aurait dû être levée pour une main avec plus de 5 cartes"
      );
    } catch (error) {
      assert(
        true,
        "Une erreur a bien été levée pour une main avec plus de 5 cartes"
      );
    }
  })();

  (() => {
    const royalFlush = new Hand([
      new Card("A", "H"),
      new Card("K", "H"),
      new Card("Q", "H"),
      new Card("J", "H"),
      new Card("10", "H"),
    ]);

    assert(
      royalFlush.isRoyalFlush(),
      "La main devrait être une quinte flush royale"
    );
    assert(
      !royalFlush.isStraightFlush(),
      "La main ne devrait pas être considérée comme une simple quinte flush"
    );
    assertEquals(
      royalFlush.getHandRank(),
      HandRank.RoyalFlush,
      "Le rang de la main devrait être 9 (Quinte Flush Royale)"
    );
  })();

  (() => {
    const straightFlush = new Hand([
      new Card("9", "S"),
      new Card("8", "S"),
      new Card("7", "S"),
      new Card("6", "S"),
      new Card("5", "S"),
    ]);

    assert(
      straightFlush.isStraightFlush(),
      "La main devrait être une quinte flush"
    );
    assert(
      !straightFlush.isRoyalFlush(),
      "La main ne devrait pas être une quinte flush royale"
    );
    assert(
      !straightFlush.isFourOfAKind(),
      "La main ne devrait pas être un carré"
    );
    assertEquals(
      straightFlush.getHandRank(),
      HandRank.StraightFlush,
      "Le rang de la main devrait être 8 (Quinte Flush)"
    );

    const lowStraightFlush = new Hand([
      new Card("5", "C"),
      new Card("4", "C"),
      new Card("3", "C"),
      new Card("2", "C"),
      new Card("A", "C"),
    ]);

    assert(
      lowStraightFlush.isStraightFlush(),
      "La main avec As bas devrait être une quinte flush"
    );
    assertEquals(
      lowStraightFlush.getHandRank(),
      HandRank.StraightFlush,
      "Le rang de la main devrait être 8 (Quinte Flush)"
    );
  })();

  (() => {
    const fourOfAKind = new Hand([
      new Card("7", "H"),
      new Card("7", "D"),
      new Card("7", "S"),
      new Card("7", "C"),
      new Card("9", "H"),
    ]);

    assert(fourOfAKind.isFourOfAKind(), "La main devrait être un carré");
    assert(!fourOfAKind.isFullHouse(), "La main ne devrait pas être un full");
    assertEquals(
      fourOfAKind.getHandRank(),
      HandRank.FourOfAKind,
      "Le rang de la main devrait être 7 (Carré)"
    );
  })();

  (() => {
    const fullHouse = new Hand([
      new Card("10", "H"),
      new Card("10", "D"),
      new Card("10", "S"),
      new Card("4", "C"),
      new Card("4", "H"),
    ]);

    assert(fullHouse.isFullHouse(), "La main devrait être un full");
    assert(!fullHouse.isFlush(), "La main ne devrait pas être une couleur");
    assertEquals(
      fullHouse.getHandRank(),
      HandRank.FullHouse,
      "Le rang de la main devrait être 6 (Full)"
    );
  })();

  (() => {
    const flush = new Hand([
      new Card("A", "C"),
      new Card("10", "C"),
      new Card("7", "C"),
      new Card("6", "C"),
      new Card("2", "C"),
    ]);

    assert(flush.isFlush(), "La main devrait être une couleur");
    assert(!flush.isStraight(), "La main ne devrait pas être une quinte");
    assertEquals(
      flush.getHandRank(),
      HandRank.Flush,
      "Le rang de la main devrait être 5 (Couleur)"
    );
  })();

  (() => {
    const straight = new Hand([
      new Card("9", "H"),
      new Card("8", "C"),
      new Card("7", "S"),
      new Card("6", "D"),
      new Card("5", "H"),
    ]);

    assert(straight.isStraight(), "La main devrait être une quinte");
    assert(!straight.isThreeOfAKind(), "La main ne devrait pas être un brelan");
    assertEquals(
      straight.getHandRank(),
      HandRank.Straight,
      "Le rang de la main devrait être 4 (Quinte)"
    );

    const lowStraight = new Hand([
      new Card("5", "D"),
      new Card("4", "S"),
      new Card("3", "H"),
      new Card("2", "C"),
      new Card("A", "D"),
    ]);

    assert(
      lowStraight.isStraight(),
      "La main avec As bas devrait être une quinte"
    );
    assertEquals(
      lowStraight.getHandRank(),
      HandRank.Straight,
      "Le rang de la main devrait être 4 (Quinte)"
    );
  })();

  (() => {
    const threeOfAKind = new Hand([
      new Card("8", "H"),
      new Card("8", "D"),
      new Card("8", "S"),
      new Card("K", "C"),
      new Card("3", "D"),
    ]);

    assert(threeOfAKind.isThreeOfAKind(), "La main devrait être un brelan");
    assert(
      !threeOfAKind.isTwoPair(),
      "La main ne devrait pas être une double paire"
    );
    assertEquals(
      threeOfAKind.getHandRank(),
      HandRank.ThreeOfAKind,
      "Le rang de la main devrait être 3 (Brelan)"
    );
  })();

  (() => {
    const twoPair = new Hand([
      new Card("J", "H"),
      new Card("J", "C"),
      new Card("4", "S"),
      new Card("4", "H"),
      new Card("A", "D"),
    ]);

    assert(twoPair.isTwoPair(), "La main devrait être une double paire");
    assert(
      !twoPair.isPair(),
      "La main ne devrait pas être considérée comme une simple paire"
    );
    assertEquals(
      twoPair.getHandRank(),
      HandRank.TwoPair,
      "Le rang de la main devrait être 2 (Deux Paires)"
    );
  })();

  (() => {
    const pair = new Hand([
      new Card("10", "H"),
      new Card("10", "C"),
      new Card("K", "S"),
      new Card("4", "H"),
      new Card("3", "D"),
    ]);

    assert(pair.isPair(), "La main devrait être une paire");
    assert(!pair.isHighCard(), "La main ne devrait pas être une carte haute");
    assertEquals(
      pair.getHandRank(),
      HandRank.Pair,
      "Le rang de la main devrait être 1 (Paire)"
    );
  })();

  (() => {
    const highCard = new Hand([
      new Card("A", "S"),
      new Card("J", "H"),
      new Card("9", "D"),
      new Card("7", "C"),
      new Card("2", "S"),
    ]);

    assert(highCard.isHighCard(), "La main devrait être une carte haute");
    assertEquals(
      highCard.getHandRank(),
      HandRank.HighCard,
      "Le rang de la main devrait être 0 (Carte Haute)"
    );
  })();
};
