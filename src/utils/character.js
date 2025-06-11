export const characterSchema = {
  hp: 0,
  strength: 1,
  agility: 2,
  stamina: 3,
  personality: 4,
  intelligence: 5,
  luck: 6,
  luckyRoll: 7,
  occupation: 8,
  equipment: 9,
  startingGold: 10,
};

export class Character {
  constructor(data) {
    this.characterSheet = data;

    for (const [key, index] of Object.entries(characterSchema)) {
      Object.defineProperty(this, key, {
        get: () => this.characterSheet[index],
        enumerable: true,
      });
    }
  }
}
