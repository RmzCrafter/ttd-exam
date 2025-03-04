import { compareHandsFromStrings } from "../src/index";
import { dealPokerHands } from "../src/utils";
import { ComparisonResult } from "../src/types/types";

interface Player {
  id: number;
  name: string;
  hand: string[];
  points: number;
}

function runTournament(numPlayers: number, numRounds: number): void {
  console.log(
    `=== TOURNOI DE POKER - ${numPlayers} JOUEURS - ${numRounds} TOURS ===\n`
  );

  const players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      id: i + 1,
      name: `Joueur ${i + 1}`,
      hand: [],
      points: 0,
    });
  }

  for (let round = 1; round <= numRounds; round++) {
    console.log(`\n--- TOUR ${round} ---\n`);

    const hands = dealPokerHands(numPlayers);
    players.forEach((player, index) => {
      player.hand = hands[index];
    });

    players.forEach((player) => {
      console.log(`${player.name}: ${player.hand.join(" ")}`);
    });

    console.log("\nRésultats des duels:");

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const result = compareHandsFromStrings(
          players[i].hand.join(" "),
          players[j].hand.join(" ")
        );

        if ("result" in result) {
          if (result.result === ComparisonResult.Hand1Wins) {
            players[i].points += 1;
            console.log(
              `${players[i].name} bat ${players[j].name} avec ${result.hand1.rank} contre ${result.hand2.rank}`
            );
          } else if (result.result === ComparisonResult.Hand2Wins) {
            players[j].points += 1;
            console.log(
              `${players[j].name} bat ${players[i].name} avec ${result.hand2.rank} contre ${result.hand1.rank}`
            );
          } else {
            players[i].points += 0.5;
            players[j].points += 0.5;
            console.log(
              `Égalité entre ${players[i].name} et ${players[j].name} avec ${result.hand1.rank}`
            );
          }
        } else {
          console.error(`Erreur: ${result.error}`);
        }
      }
    }

    console.log("\nClassement après ce tour:");
    const ranking = [...players].sort((a, b) => b.points - a.points);
    ranking.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name}: ${player.points} points`);
    });
  }

  console.log("\n=== CLASSEMENT FINAL ===\n");
  const finalRanking = [...players].sort((a, b) => b.points - a.points);
  finalRanking.forEach((player, index) => {
    console.log(`${index + 1}. ${player.name}: ${player.points} points`);
  });

  const winner = finalRanking[0];
  console.log(
    `\nLe grand gagnant est ${winner.name} avec ${winner.points} points!`
  );
}

if (require.main === module) {
  runTournament(6, 3);
}
