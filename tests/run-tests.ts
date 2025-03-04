type AssertFunction = (condition: boolean, message: string) => void;
type AssertEqualsFunction = <T>(
  actual: T,
  expected: T,
  message: string
) => void;

const assert: AssertFunction = (condition, message) => {
  if (!condition) {
    console.error(`❌ Test échoué: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ Test réussi: ${message}`);
  }
};

const assertEquals: AssertEqualsFunction = (actual, expected, message) => {
  assert(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message} - Obtenu: ${JSON.stringify(actual)}, Attendu: ${JSON.stringify(
      expected
    )}`
  );
};

const runTests = () => {
  console.log("Exécution des tests...\n");

  require("./card.test")(assert, assertEquals);
  require("./hand.test")(assert, assertEquals);
  require("./evaluator.test")(assert, assertEquals);

  console.log("\nTests terminés");
};

export { assert, assertEquals };

if (require.main === module) {
  runTests();
}
