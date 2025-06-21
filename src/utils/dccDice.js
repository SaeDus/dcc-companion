export function randomRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function rollDie(rolls, faces) {
  let totalRoll = 0;

  for (var i = 0; i < rolls; i++) {
    totalRoll += randomRoll(1, faces);
  }

  return totalRoll;
}
