import { Card } from "../src/card";
import { AssertFunction, AssertEqualsFunction } from "./types/test-types";

module.exports = (
  assert: AssertFunction,
  assertEquals: AssertEqualsFunction
) => {
  console.log("Tests de la classe Card");

  (() => {
    const card = new Card("A", "H");
    assert(card.rank === "A", "Le rang de la carte devrait être A");
    assert(card.suit === "H", "La couleur de la carte devrait être H (Cœur)");
  })();

  (() => {
    const card = new Card("K", "S");
    assert(
      card.toString() === "K♠",
      "La représentation de la carte devrait être K♠"
    );
  })();

  (() => {
    const cards = [
      { card: new Card("2", "H"), value: 2 },
      { card: new Card("10", "D"), value: 10 },
      { card: new Card("J", "C"), value: 11 },
      { card: new Card("Q", "S"), value: 12 },
      { card: new Card("K", "H"), value: 13 },
      { card: new Card("A", "D"), value: 14 },
    ];

    cards.forEach(({ card, value }) => {
      assert(
        card.getValue() === value,
        `La valeur de ${card.toString()} devrait être ${value}`
      );
    });
  })();

  (() => {
    const aceHearts = new Card("A", "H");
    const aceSpades = new Card("A", "S");
    const kingHearts = new Card("K", "H");

    assert(
      aceHearts.compare(kingHearts) > 0,
      "As devrait être supérieur au Roi"
    );
    assert(
      kingHearts.compare(aceHearts) < 0,
      "Roi devrait être inférieur à l'As"
    );
    assert(
      aceHearts.compare(aceSpades) === 0,
      "As de cœur et As de pique devraient être égaux"
    );
  })();
};
