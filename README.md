# Comparateur de Mains de Poker (TypeScript)

Ce projet implémente un évaluateur de mains de poker en TypeScript, permettant de comparer deux mains de 5 cartes et de déterminer la main gagnante selon les règles standard du poker.

## Fonctionnalités

- Modélisation des cartes avec rang et couleur
- Détection des différentes combinaisons de poker (Quinte Flush Royale, Carré, Full, etc.)
- Comparaison de deux mains pour déterminer la plus forte
- Gestion des cas d'égalité selon les règles officielles
- Simulation de parties et tournois de poker
- Génération et distribution de mains aléatoires

## Structure du Projet

- `src/` : Code source de l'application
  - `types/` : Définitions des types TypeScript
  - `card.ts` : Modélisation des cartes
  - `hand.ts` : Modélisation et évaluation des mains
  - `evaluator.ts` : Logique de comparaison des mains
  - `utils.ts` : Fonctions utilitaires (génération de jeu, distribution, etc.)
  - `index.ts` : Point d'entrée principal
- `tests/` : Tests unitaires
  - `types/` : Types pour les tests
  - `card.test.ts` : Tests pour les cartes
  - `hand.test.ts` : Tests pour les mains
  - `evaluator.test.ts` : Tests pour l'évaluateur
  - `run-tests.ts` : Framework de test simple
- `examples/` : Exemples d'utilisation
  - `tournament.ts` : Simulation d'un tournoi de poker

## Installation

```bash
# Installer les dépendances
npm install

# Compiler le projet
npm run build

# Exécuter les tests
npm test

# Exécuter l'application
npm start
```

## Développement

Ce projet a été développé suivant une approche TDD (Test-Driven Development). Chaque fonctionnalité a d'abord été spécifiée par des tests avant d'être implémentée.

## Utilisation

### Comparaison simple de deux mains

```typescript
import { compareHandsFromStrings } from "poker-hand-evaluator";

// Comparer deux mains
const result = compareHandsFromStrings("AH KH QH JH 10H", "AS KS QS JS 9S");
console.log(result);
```

### Simulation d'une partie

```typescript
import { dealPokerHands, compareHandsFromStrings } from "poker-hand-evaluator";

// Distribuer des mains à 4 joueurs
const hands = dealPokerHands(4);

// Comparer les mains
for (let i = 0; i < hands.length; i++) {
  for (let j = i + 1; j < hands.length; j++) {
    const result = compareHandsFromStrings(
      hands[i].join(" "),
      hands[j].join(" ")
    );
    console.log(`Joueur ${i + 1} vs Joueur ${j + 1}:`, result);
  }
}
```

### Exécuter un exemple de tournoi

```bash
# Compiler le projet
npm run build

# Exécuter l'exemple de tournoi
npx ts-node examples/tournament.ts
```

## Règles du Poker

### Types de mains (du plus fort au plus faible)

1. **Quinte Flush Royale** (Royal Flush)

   - Une suite de As, Roi, Dame, Valet, 10 de la même couleur

2. **Quinte Flush** (Straight Flush)

   - Cinq cartes de la même couleur qui se suivent

3. **Carré** (Four of a Kind)

   - Quatre cartes de même rang

4. **Full** (Full House)

   - Un brelan (trois cartes de même rang) et une paire

5. **Couleur** (Flush)

   - Cinq cartes de la même couleur (non consécutives)

6. **Quinte** (Straight)

   - Cinq cartes qui se suivent (pas de la même couleur)

7. **Brelan** (Three of a Kind)

   - Trois cartes de même rang

8. **Deux Paires** (Two Pair)

   - Deux paires de cartes de même rang

9. **Paire** (One Pair)

   - Deux cartes de même rang

10. **Carte Haute** (High Card)
    - Aucune combinaison ci-dessus
