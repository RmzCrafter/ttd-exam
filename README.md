# Comparateur de Mains de Poker

Ce projet implémente un évaluateur de mains de poker en JavaScript, permettant de comparer deux mains de 5 cartes et de déterminer la main gagnante selon les règles standard du poker.

## Fonctionnalités

- Modélisation des cartes avec rang et couleur
- Détection des différentes combinaisons de poker (Quinte Flush Royale, Carré, Full, etc.)
- Comparaison de deux mains pour déterminer la plus forte
- Gestion des cas d'égalité selon les règles officielles

## Structure du Projet

- `src/` : Code source de l'application
  - `card.js` : Modélisation des cartes
  - `hand.js` : Modélisation et évaluation des mains
  - `evaluator.js` : Logique de comparaison des mains
  - `index.js` : Point d'entrée principal
- `tests/` : Tests unitaires

## Développement

Ce projet a été développé suivant une approche TDD (Test-Driven Development). Chaque fonctionnalité a d'abord été spécifiée par des tests avant d'être implémentée.

## Règles du Poker

Voir la documentation détaillée dans le code source pour les règles complètes et les méthodes de départage en cas d'égalité.
