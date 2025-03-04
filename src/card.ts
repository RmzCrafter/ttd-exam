import { Rank, Suit, SuitSymbols, RankValues } from "./types/types";

/**
 * Classe Card - Représente une carte à jouer dans un jeu de poker
 */
export class Card {
  /**
   * @param rank - Rang de la carte (2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A)
   * @param suit - Couleur de la carte (H: Cœur, D: Carreau, C: Trèfle, S: Pique)
   */
  constructor(public readonly rank: Rank, public readonly suit: Suit) {}

  /**
   * Obtient la valeur numérique de la carte
   * @returns Valeur numérique (2-14, où l'As vaut 14)
   */
  getValue(): number {
    return RankValues[this.rank];
  }

  /**
   * Compare cette carte à une autre
   * @param otherCard - Carte à comparer
   * @returns -1 si inférieure, 0 si égale, 1 si supérieure
   */
  compare(otherCard: Card): number {
    return this.getValue() - otherCard.getValue();
  }

  /**
   * Retourne une représentation de la carte sous forme de chaîne
   * @returns Représentation de la carte (ex: "A♥")
   */
  toString(): string {
    return `${this.rank}${SuitSymbols[this.suit]}`;
  }
}
