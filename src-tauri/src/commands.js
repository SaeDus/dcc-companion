const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve(__dirname, "../game.db"));

function getWeaponById(id) {
  try {
    const stmt = db.prepare(
      "SELECT id, name, attack, damage FROM weapons WHERE id = ?",
    );
    const weapon = stmt.get(id);
    return weapon || null;
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { getWeaponById };
