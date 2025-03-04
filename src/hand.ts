import { Card } from "./card";
import { HandRank } from "./types/types";

/**
 * Classe Hand - Représente une main de 5 cartes au poker
 */
export class Hand {
  public readonly cards: Card[];

  /**
   * @param cards - Tableau de 5 cartes
   */
  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error(
        `Une main doit contenir exactement 5 cartes, reçu: ${cards.length}`
      );
    }

    // Tri des cartes par valeur décroissante
    this.cards = [...cards].sort((a, b) => b.getValue() - a.getValue());
  }

  /**
   * Vérifie si les cartes ont toutes la même couleur
   */
  hasSameSuit(): boolean {
    const firstSuit = this.cards[0].suit;
    return this.cards.every((card) => card.suit === firstSuit);
  }

  /**
   * Vérifie si les cartes forment une séquence
   */
  isSequential(): boolean {
    // Cas spécial: As, 2, 3, 4, 5
    if (
      this.cards[0].getValue() === 14 && // As
      this.cards[1].getValue() === 5 &&
      this.cards[2].getValue() === 4 &&
      this.cards[3].getValue() === 3 &&
      this.cards[4].getValue() === 2
    ) {
      return true;
    }

    // Cas normal: vérifier si chaque carte est une de moins que la précédente
    for (let i = 0; i < 4; i++) {
      if (this.cards[i].getValue() !== this.cards[i + 1].getValue() + 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Compte les occurrences de chaque rang
   * @returns Dictionnaire { rang: nombre d'occurrences }
   */
  getRankCounts(): Record<string, number> {
    const counts: Record<string, number> = {};

    for (const card of this.cards) {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    }

    return counts;
  }

  /**
   * Vérifie si la main est une quinte flush royale
   */
  isRoyalFlush(): boolean {
    return (
      this.hasSameSuit() &&
      this.cards[0].rank === "A" &&
      this.cards[1].rank === "K" &&
      this.cards[2].rank === "Q" &&
      this.cards[3].rank === "J" &&
      this.cards[4].rank === "10"
    );
  }

  /**
   * Vérifie si la main est une quinte flush
   */
  isStraightFlush(): boolean {
    // Une quinte flush royale est un cas particulier de quinte flush,
    // mais pour les besoins de classement nous les distinguons
    if (this.isRoyalFlush()) {
      return false;
    }

    return this.hasSameSuit() && this.isSequential();
  }

  /**
   * Vérifie si la main est un carré
   */
  isFourOfAKind(): boolean {
    const counts = this.getRankCounts();
    return Object.values(counts).includes(4);
  }

  /**
   * Vérifie si la main est un full
   */
  isFullHouse(): boolean {
    const counts = this.getRankCounts();
    const values = Object.values(counts);
    return values.includes(3) && values.includes(2);
  }

  /**
   * Vérifie si la main est une couleur
   */
  isFlush(): boolean {
    // Une quinte flush ou quinte flush royale est un cas particulier de couleur,
    // mais pour les besoins de classement nous les distinguons
    return this.hasSameSuit() && !this.isSequential();
  }

  /**
   * Vérifie si la main est une quinte
   */
  isStraight(): boolean {
    // Une quinte flush ou quinte flush royale est un cas particulier de quinte,
    // mais pour les besoins de classement nous les distinguons
    return !this.hasSameSuit() && this.isSequential();
  }

  /**
   * Vérifie si la main est un brelan
   */
  isThreeOfAKind(): boolean {
    const counts = this.getRankCounts();
    const values = Object.values(counts);
    // Un full est un cas particulier de brelan,
    // mais pour les besoins de classement nous les distinguons
    return values.includes(3) && !values.includes(2);
  }

  /**
   * Vérifie si la main contient deux paires
   */
  isTwoPair(): boolean {
    const counts = this.getRankCounts();
    const pairs = Object.values(counts).filter((count) => count === 2);
    return pairs.length === 2;
  }

  /**
   * Vérifie si la main contient une paire
   */
  isPair(): boolean {
    const counts = this.getRankCounts();
    const values = Object.values(counts);
    // Deux paires est un cas particulier de paire,
    // mais pour les besoins de classement nous les distinguons
    return (
      values.includes(2) && values.filter((count) => count === 2).length === 1
    );
  }

  /**
   * Vérifie si la main est juste une carte haute
   */
  isHighCard(): boolean {
    const counts = this.getRankCounts();
    return (
      Object.values(counts).every((count) => count === 1) &&
      !this.hasSameSuit() &&
      !this.isSequential()
    );
  }

  /**
   * Obtient le rang de la main
   * @returns Entier de 0 (carte haute) à 9 (quinte flush royale)
   */
  getHandRank(): HandRank {
    if (this.isRoyalFlush()) return HandRank.RoyalFlush;
    if (this.isStraightFlush()) return HandRank.StraightFlush;
    if (this.isFourOfAKind()) return HandRank.FourOfAKind;
    if (this.isFullHouse()) return HandRank.FullHouse;
    if (this.isFlush()) return HandRank.Flush;
    if (this.isStraight()) return HandRank.Straight;
    if (this.isThreeOfAKind()) return HandRank.ThreeOfAKind;
    if (this.isTwoPair()) return HandRank.TwoPair;
    if (this.isPair()) return HandRank.Pair;
    return HandRank.HighCard;
  }

  /**
   * Obtient la valeur de départage pour les cas d'égalité
   * @returns Tableau de valeurs pour départager
   */
  getTieBreakers(): number[] {
    const rankCounts = this.getRankCounts();
    const rankValues: Record<number, number> = {};

    // Convertir les rangs en valeurs numériques
    for (const [rank, count] of Object.entries(rankCounts)) {
      const value = this.cards.find((card) => card.rank === rank)!.getValue();
      rankValues[value] = count;
    }

    // Trier par nombre d'occurrences (décroissant), puis par valeur (décroissante)
    return Object.entries(rankValues)
      .sort(([value1, count1], [value2, count2]) => {
        // D'abord par compte décroissant
        if (count2 !== count1) {
          return count2 - count1;
        }
        // Puis par valeur décroissante
        return parseInt(value2) - parseInt(value1);
      })
      .map(([value]) => parseInt(value));
  }

  /**
   * Représentation de la main sous forme de chaîne
   */
  toString(): string {
    return this.cards.map((card) => card.toString()).join(" ");
  }
}
