import { Character } from "./character.js";
import rollDie from "./dccDice.js";
import * as Tables from "./dccTables.js";

export default function generateZeroLevelCharacter() {
  let characterSheet = [];

  for (var i = 1; i <= 6; i++) {
    characterSheet[i] = rollDie(3, 6);
  }

  characterSheet[0] = rollHealth(characterSheet[3]);
  characterSheet[7] = rollLuckyRoll(characterSheet[6]);
  characterSheet[8] = rollDie(1, 100);
  characterSheet[9] = rollDie(1, 24);
  characterSheet[10] = rollDie(5, 12);

  let packedStats = new Uint8Array(characterSheet);

  return new Character(packedStats);
}

function rollHealth(stamina) {
  let mod = Tables.abilityScoreModifiers[stamina].modifier;
  let health = rollDie(1, 4) + mod;

  if (health <= 0) {
    return 1;
  }

  return health;
}

function rollLuckyRoll(luck) {
  let mod = Tables.abilityScoreModifiers[luck].modifier;
  var luckyRoll = rollDie(1, 30);
  luckyRoll += mod;

  if (luckyRoll > 30) {
    luckyRoll -= 30;
  } else if (luckyRoll <= 0) {
    luckyRoll += 30;
  }

  return luckyRoll;
}
