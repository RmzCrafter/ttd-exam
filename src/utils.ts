export function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function generateDeck(): string[] {
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const suits = ["H", "D", "C", "S"];

  const deck: string[] = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push(`${rank}${suit}`);
    }
  }

  return deck;
}

export function dealPokerHands(numPlayers: number): string[][] {
  if (numPlayers < 2 || numPlayers > 10) {
    throw new Error("Le nombre de joueurs doit être entre 2 et 10");
  }

  const deck = shuffle(generateDeck());

  const hands: string[][] = [];

  for (let i = 0; i < numPlayers; i++) {
    hands.push(deck.slice(i * 5, (i + 1) * 5));
  }

  return hands;
}

export function formatComparisonResult(result: number): string {
  if (result > 0) {
    return "La main 1 gagne";
  } else if (result < 0) {
    return "La main 2 gagne";
  } else {
    return "Égalité";
  }
}
