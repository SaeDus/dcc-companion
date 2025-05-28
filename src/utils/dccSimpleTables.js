import { rollDie } from "./dccDice.js";

const abilityScoreModifiers = {
  3: -3,
  4: -2,
  5: -2,
  6: -1,
  7: -1,
  8: -1,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 1,
  14: 1,
  15: 1,
  16: 2,
  17: 2,
  18: 3,
};

const luckScore = {
  1: "Harsh Winter: All attack rolls",
  2: "The bull: Melee attack rolls",
  3: "Fortunate date: Missile fire attack rolls",
  4: "Raised by wolves: Unarmed attack rolls",
  5: "Conceived on horseback: Mounted attack rolls",
  6: "Born on the battlefield: Damage rolls",
  7: "Path of the bear: Melee damage rolls",
  8: "Hawkeye: Missile fire damage rolls",
  9: "Pack hunter: Attack and damage rolls for 0-level starting weapon",
  10: "Born under the loom: Skill checks (including thief skills)",
  11: "Fox's cunning: Find/disable traps",
  12: "Four-leafed clover: Find secret doors",
  13: "Seventh son: Spell checks",
  14: "The raging storm: Spell damage",
  15: "Righteous heart: Turn unholy checks",
  16: "Survived the plague: Magical healing",
  17: "Lucky sign: Saving throws",
  18: "Guardian angel: Saving throws to escape traps",
  19: "Survived a spider bite: Saving throws against poison",
  20: "Struck by lightning: Reflex saving throws",
  21: "Lived through famine: Fortitude saving throws",
  22: "Resisted temptation: Willpower saving throws",
  23: "Charmed house: Armor class",
  24: "Speed of the cobra: Initiative",
  25: "Bountiful harvest: Hit points (applies at each level)",
  26: "Warrior's arm: Critical hit tables",
  27: "Unholy house: Corruption rolls",
  28: "The Broken Star: Fumbles",
  29: "Birdsong: Number of languages",
  30: "Wild child: Speed (each +1/-1 = +5'/-5' speed)",
};

const languageTables = {
  zeroLevel: [
    { min: 1, max: 20, language: "Alignment" },
    { min: 21, max: 30, language: "Dwarf" },
    { min: 31, max: 35, language: "Elf" },
    { min: 36, max: 40, language: "Halfling" },
    { min: 41, max: 45, language: "Gnome" },
    { min: 46, max: 47, language: "Bugbear" },
    { min: 48, max: 57, language: "Goblin" },
    { min: 58, max: 60, language: "Gnoll" },
    { min: 61, max: 65, language: "Hobgoblin" },
    { min: 66, max: 75, language: "Kobold" },
    { min: 76, max: 80, language: "Lizard Man" },
    { min: 81, max: 81, language: "Minotaur" },
    { min: 82, max: 83, language: "Ogre" },
    { min: 84, max: 93, language: "Orc" },
    { min: 94, max: 99, language: "Troglodyte" },
    { min: 100, max: Infinity, language: "Giant" },
  ],
};

const farmerType = {
  1: "Potato farmer",
  2: "Wheat farmer",
  3: "Turnip farmer",
  4: "Corn farmer",
  5: "Rice farmer",
  6: "Parsnip farmer",
  7: "Radish farmer",
  8: "Rutabaga farmer",
};

const farmAnimal = {
  1: "Sheep",
  2: "Goat",
  3: "Cow",
  4: "Duck",
  5: "Goose",
  6: "Mule",
};

const cartContents = {
  1: "Tomatoes",
  2: "Nothing",
  3: "Straw",
  4: "Your dead",
  5: "Dirt",
  6: "Rocks",
};

const occupationTable = {
  1: {
    occupation: "Alchemist",
    trainedWeapon: "Staff",
    tradeGoods: "Oil, 1 flask",
  },
  2: {
    occupation: "Animal trainer",
    trainedWeapon: "Club",
    tradeGoods: "Pony",
  },
  3: {
    occupation: "Armorer",
    trainedWeapon: "Hammer (as club)",
    tradeGoods: "Iron helmet",
  },
  4: {
    occupation: "Astrologer",
    trainedWeapon: "Dagger",
    tradeGoods: "Spyglass",
  },
  5: {
    occupation: "Barber",
    trainedWeapon: "Razor (as dagger)",
    tradeGoods: "Scissors",
  },
  6: {
    occupation: "Beadle",
    trainedWeapon: "Staff",
    tradeGoods: "Holy symbol",
  },
  7: {
    occupation: "Beekeeper",
    trainedWeapon: "Staff",
    tradeGoods: "Jar of honey",
  },
  8: {
    occupation: "Blacksmith",
    trainedWeapon: "Hammer (as club)",
    tradeGoods: "Steel tongs",
  },
  9: {
    occupation: "Butcher",
    trainedWeapon: "Cleaver (as axe)",
    tradeGoods: "Side of beef",
  },
  10: {
    occupation: "Caravan guard",
    trainedWeapon: "Short sword",
    tradeGoods: "Linen, 1 yard",
  },
  11: {
    occupation: "Cheesemaker",
    trainedWeapon: "Cudgel (as staff)",
    tradeGoods: "Stinky cheese",
  },
  12: {
    occupation: "Cobbler",
    trainedWeapon: "Awl (as dagger)",
    tradeGoods: "Shoehorn",
  },
  13: {
    occupation: "Confidence artist",
    trainedWeapon: "Dagger",
    tradeGoods: "Quality cloak",
  },
  14: {
    occupation: "Cooper",
    trainedWeapon: "Crowbar (as club)",
    tradeGoods: "Barrel",
  },
  15: {
    occupation: "Costermonger",
    trainedWeapon: "Knife (as dagger)",
    tradeGoods: "Fruit",
  },
  16: {
    occupation: "Cutpurse",
    trainedWeapon: "Dagger",
    tradeGoods: "Small chest",
  },
  17: {
    occupation: "Ditch digger",
    trainedWeapon: "Shovel (as staff)",
    tradeGoods: "Find dirt, 1 lb.",
  },
  18: {
    occupation: "Dock worker",
    trainedWeapon: "Pole (as staff)",
    tradeGoods: "1 late RPG book",
  },
  19: {
    occupation: "Dwarven apothecarist",
    trainedWeapon: "Cudgel (as staff)",
    tradeGoods: "Steel vial",
  },
  20: {
    occupation: "Dwarven blacksmith",
    trainedWeapon: "Hammer (as club)",
    tradeGoods: "Mithril, 1 oz.",
  },
  21: {
    occupation: "Dwarven chest-maker",
    trainedWeapon: "Chisel (as dagger)",
    tradeGoods: "Wood, 10 lbs.",
  },
  22: {
    occupation: "Dwarven herder",
    trainedWeapon: "Staff",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  23: {
    occupation: "Dwarven miner",
    trainedWeapon: "Pick (as club)",
    tradeGoods: "Lantern",
  },
  24: {
    occupation: "Dwarven miner",
    trainedWeapon: "Pick (as club)",
    tradeGoods: "Lantern",
  },
  25: {
    occupation: "Dwarven mushroom-farmer",
    trainedWeapon: "Shovel (as staff)",
    tradeGoods: "Sack",
  },
  26: {
    occupation: "Dwarven rat-catcher",
    trainedWeapon: "Club",
    tradeGoods: "Net",
  },
  27: {
    occupation: "Dwarven stonemason",
    trainedWeapon: "Hammer",
    tradeGoods: "Fine stone, 10 lbs.",
  },
  28: {
    occupation: "Dwarven stonemason",
    trainedWeapon: "Hammer",
    tradeGoods: "Fine stone, 10 lbs.",
  },
  29: {
    occupation: "Elven artisan",
    trainedWeapon: "Staff",
    tradeGoods: "Clay, 1 lb.",
  },
  30: {
    occupation: "Elven barrister",
    trainedWeapon: rollAmmo("Quill (as dart)"),
    tradeGoods: "Book",
  },
  31: {
    occupation: "Elven chandler",
    trainedWeapon: "Scissors (as dagger)",
    tradeGoods: "Candles, 20",
  },
  32: {
    occupation: "Elven falconer",
    trainedWeapon: "Dagger",
    tradeGoods: "Falcon",
  },
  33: {
    occupation: "Elven forester",
    trainedWeapon: "Staff",
    tradeGoods: "Herbs, 1 lb.",
  },
  34: {
    occupation: "Elven forester",
    trainedWeapon: "Staff",
    tradeGoods: "Herbs, 1 lb.",
  },
  35: {
    occupation: "Elven glassblower",
    trainedWeapon: "Hammer (as club)",
    tradeGoods: "Glass beads",
  },
  36: {
    occupation: "Elven navigator",
    trainedWeapon: rollAmmo("Shortbow"),
    tradeGoods: "Spyglass",
  },
  37: {
    occupation: "Elven sage",
    trainedWeapon: "Dagger",
    tradeGoods: "Parchment and quill pen",
  },
  38: {
    occupation: "Elven sage",
    trainedWeapon: "Dagger",
    tradeGoods: "Parchment and quill pen",
  },
  39: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  40: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  41: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  42: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  43: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  44: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  45: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  46: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  47: {
    occupation: farmerType[rollDie(1, 8)],
    trainedWeapon: "Pitchfork (as spear)",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  48: {
    occupation: "Fortune-teller",
    trainedWeapon: "Dagger",
    tradeGoods: "Tarot deck",
  },
  49: {
    occupation: "Gambler",
    trainedWeapon: "Club",
    tradeGoods: "Dice",
  },
  50: {
    occupation: "Gongfarmer",
    trainedWeapon: "Trowel (as dagger)",
    tradeGoods: "Sack of night soil",
  },
  51: {
    occupation: "Grave digger",
    trainedWeapon: "Shovel (as staff)",
    tradeGoods: "Trowel",
  },
  52: {
    occupation: "Grace digger",
    trainedWeapon: "Shovel (as staff)",
    tradeGoods: "Trowel",
  },
  53: {
    occupation: "Guild beggar",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Crutches",
  },
  54: {
    occupation: "Guild beggar",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Crutches",
  },
  55: {
    occupation: "Halfling chicken butcher",
    trainedWeapon: "Handaxe",
    tradeGoods: "Chicken meat, 5 lbs.",
  },
  56: {
    occupation: "Halfling dyer",
    trainedWeapon: "Staff",
    tradeGoods: "Fabric, 3 yards",
  },
  57: {
    occupation: "Halfling dyer",
    trainedWeapon: "Staff",
    tradeGoods: "Fabric, 3 yards",
  },
  58: {
    occupation: "Halfling glovemaker",
    trainedWeapon: "Awl (as dagger)",
    tradeGoods: "Gloves, 4 pairs",
  },
  59: {
    occupation: "Halfling wanderer",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Hex doll",
  },
  60: {
    occupation: "Halfling haberdasher",
    trainedWeapon: "Scissors (as dagger)",
    tradeGoods: "Fine suits, 3 sets",
  },
  61: {
    occupation: "Halfling mariner",
    trainedWeapon: "Knife (as dagger)",
    tradeGoods: "Sailcloth, 2 yards",
  },
  62: {
    occupation: "Halfling moneylender",
    trainedWeapon: "Short sword",
    tradeGoods: "5 gp, 10 sp, 200 cp",
  },
  63: {
    occupation: "Halfling trader",
    trainedWeapon: "Short sword",
    tradeGoods: "20 sp",
  },
  64: {
    occupation: "Halfling vagrant",
    trainedWeapon: "Club",
    tradeGoods: "Begging bowl",
  },
  65: {
    occupation: "Healer",
    trainedWeapon: "Club",
    tradeGoods: "Holy water, 1 vial",
  },
  66: {
    occupation: "Herbalist",
    trainedWeapon: "Club",
    tradeGoods: "Herbs, 1 lb.",
  },
  67: {
    occupation: "Herder",
    trainedWeapon: "Staff",
    tradeGoods: farmAnimal[rollDie(1, 6)],
  },
  68: {
    occupation: "Hunter",
    trainedWeapon: rollAmmo("Shortbow"),
    tradeGoods: "Deer pelt",
  },
  69: {
    occupation: "Hunter",
    trainedWeapon: rollAmmo("Shortbow"),
    tradeGoods: "Deer pelt",
  },
  70: {
    occupation: "Indentured servant",
    trainedWeapon: "Staff",
    tradeGoods: "Locket",
  },
  71: {
    occupation: "Jester",
    trainedWeapon: rollAmmo("Dart"),
    tradeGoods: "Silk clothes",
  },
  72: {
    occupation: "Jeweler",
    trainedWeapon: "Dagger",
    tradeGoods: "Gem worth 20 gp",
  },
  73: {
    occupation: "Locksmith",
    trainedWeapon: "Dagger",
    tradeGoods: "Fine tools",
  },
  74: {
    occupation: "Mendicant",
    trainedWeapon: "Club",
    tradeGoods: "Cheese dip",
  },
  75: {
    occupation: "Mercenary",
    trainedWeapon: "Longsword",
    tradeGoods: "Hide armor",
  },
  76: {
    occupation: "Merchant",
    trainedWeapon: "Dagger",
    tradeGoods: "4gp, 14 sp, 27 cp",
  },
  77: {
    occupation: "Miller/baker",
    trainedWeapon: "Club",
    tradeGoods: "Flour, 1 lb.",
  },
  78: {
    occupation: "Minstrel",
    trainedWeapon: "Dagger",
    tradeGoods: "Ukulele",
  },
  79: {
    occupation: "Noble",
    trainedWeapon: "Longsword",
    tradeGoods: "Gold ring worth 10 gp",
  },
  80: {
    occupation: "Orphan",
    trainedWeapon: "Club",
    tradeGoods: "Rag doll",
  },
  81: {
    occupation: "Ostler",
    trainedWeapon: "Staff",
    tradeGoods: "Bridle",
  },
  82: {
    occupation: "Outlaw",
    trainedWeapon: "Short sword",
    tradeGoods: "Leather armor",
  },
  83: {
    occupation: "Rope maker",
    trainedWeapon: "Knife (as dagger)",
    tradeGoods: "Rope, 100'",
  },
  84: {
    occupation: "scribe",
    trainedWeapon: rollAmmo("Dart"),
    tradeGoods: "Parchment, 10 sheets",
  },
  85: {
    occupation: "Shaman",
    trainedWeapon: "Mace",
    tradeGoods: "Herbs, 1 lb.",
  },
  86: {
    occupation: "Slave",
    trainedWeapon: "Club",
    tradeGoods: "Strange-looking rock",
  },
  87: {
    occupation: "Smuggler",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Waterproof sack",
  },
  88: {
    occupation: "Soldier",
    trainedWeapon: "Spear",
    tradeGoods: "Shield",
  },
  89: {
    occupation: "Squire",
    trainedWeapon: "Longsword",
    tradeGoods: "Steel helmet",
  },
  90: {
    occupation: "Squire",
    trainedWeapon: "Longsword",
    tradeGoods: "Steel helmet",
  },
  91: {
    occupation: "Tax collector",
    trainedWeapon: "Longsword",
    tradeGoods: "100 cp",
  },
  92: {
    occupation: "Trapper",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Badger pelt",
  },
  93: {
    occupation: "Trapper",
    trainedWeapon: rollAmmo("Sling"),
    tradeGoods: "Badger pelt",
  },
  94: {
    occupation: "Urchin",
    trainedWeapon: "Stick (as club)",
    tradeGoods: "Begging bowl",
  },
  95: {
    occupation: "Wainwright",
    trainedWeapon: "Club",
    tradeGoods: "Pushcart with " + cartContents[rollDie(1, 6)],
  },
  96: {
    occupation: "Weaver",
    trainedWeapon: "Dagger",
    tradeGoods: "Fine suit of clothes",
  },
  97: {
    occupation: "Wizard's apprentice",
    trainedWeapon: "Dagger",
    tradeGoods: "Black grimoire",
  },
  98: {
    occupation: "Woodcutter",
    trainedWeapon: "Handaxe",
    tradeGoods: "Bundle of wood",
  },
  99: {
    occupation: "Woodcutter",
    trainedWeapon: "Handaxe",
    tradeGoods: "Bundle of wood",
  },
  100: {
    occupation: "Woodcutter",
    trainedWeapon: "Handaxe",
    tradeGoods: "Bundle of wood",
  },
};

const equipmentTable = {
  1: "Backpack",
  2: "Candle",
  3: "Chain, 10'",
  4: "Chalk, 1 piece",
  5: "Chest, empty",
  6: "Crowbar",
  7: "Flask, empty",
  8: "Flint & steel",
  9: "Grappling hook",
  10: "Hammer, small",
  11: "Holy symbol",
  12: "Holy water, 1 vial",
  13: "Iron spikes, each",
  14: "Lantern",
  15: "Mirror, hand-sized",
  16: "Oil, 1 flask",
  17: "Pole, 10-foot",
  18: "Rations, per day",
  19: "Rope, 50'",
  20: "Sack, large",
  21: "Sack, small",
  22: "Thieves' Tools",
  23: "Torch, each",
  24: "Waterskin",
};

function rollAmmo(weaponName) {
  let ammoType = "";

  if (weaponName.toLowerCase().includes("sling")) {
    ammoType = "Rocks";
  } else if (weaponName.toLowerCase().includes("dart")) {
    ammoType = "Darts";
  } else {
    ammoType = "Arrows";
  }

  return `${weaponName} (x${rollDie(1, 6)} ${ammoType})`;
}

export function getLanguageForZeroLevel(roll) {
  const match = languageTables.zeroLevel.find(
    (r) => roll >= r.min && roll <= r.max,
  );

  return match ? match.language : "null";
}
