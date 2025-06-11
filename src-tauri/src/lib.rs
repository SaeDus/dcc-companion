use rusqlite::{Connection, Result};
use rusqlite::OptionalExtension;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[derive(serde::Serialize)]
struct AbilityModifierSchema {
    id: i32,
    modifier: i32,
    wizard_spells_known: i32,
    max_spell_level: i32,
}

#[derive(serde::Serialize)]
struct LuckScoreSchema {
    id: i32,
    birth_augur: String,
    lucky_roll: String,
}

#[derive(serde::Serialize)]
struct OccupationSchema {
    id: i32,
    occupation: String,
    trained_weapon: String,
    trade_goods: String,
}

#[tauri::command]
fn get_ability_modifier(id: i32) -> Result<Option<AbilityModifierSchema>, String> {
    let conn = Connection::open("game.sqlite")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT id, modifier, wizardSpellsKnown, maxSpellLevel FROM abilityScoreModifiers WHERE id = ?1")
        .map_err(|e| e.to_string())?;

    let modifier = stmt
        .query_row([id], |row| {
            Ok(AbilityModifierSchema {
                id: row.get(0)?,
                modifier: row.get(1)?,
                wizard_spells_known: row.get(2)?,
                max_spell_level: row.get(3)?,
            })
        })
        .optional()
        .map_err(|e| e.to_string())?;

    Ok(modifier)
}

#[tauri::command]
fn get_luck_score(id: i32) -> Result<Option<LuckScoreSchema>, String> {
    let conn = Connection::open("game.sqlite")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT id, birthAugur, luckyRoll FROM luckScore WHERE id = ?1")
        .map_err(|e| e.to_string())?;

    let luck_score = stmt
        .query_row([id], |row| {
            Ok(LuckScoreSchema {
                id: row.get(0)?,
                birth_augur: row.get(1)?,
                lucky_roll: row.get(2)?,
            })
        })
        .optional()
        .map_err(|e| e.to_string())?;

    Ok(luck_score)
}

#[tauri::command]
fn get_occupation(id: i32) -> Result<Option<OccupationSchema>, String> {
    let conn = Connection::open("game.sqlite")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT id, occupation, trainedWeapon, tradeGoods FROM occupationTable WHERE id = ?1")
        .map_err(|e| e.to_string())?;

    let occupation = stmt
        .query_row([id], |row| {
            Ok(OccupationSchema {
                id: row.get(0)?,
                occupation: row.get(1)?,
                trained_weapon: row.get(2)?,
                trade_goods: row.get(3)?,
            })
        })
        .optional()
        .map_err(|e| e.to_string())?;

    Ok(occupation)
}

#[tauri::command]
fn get_equipment(id: i32) -> Result<String, String> {
    let conn = Connection::open("game.sqlite")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT label FROM equipmentTable WHERE id = ?1")
        .map_err(|e| e.to_string())?;

    let equipment: String = stmt.query_row([id], |row| row.get(0))
        .map_err(|e| e.to_string())?;

    Ok(equipment)
}

#[tauri::command]
fn get_zero_level_language(id: i32) -> Result<String, String> {
    let conn = Connection::open("game.sqlite")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT label FROM languageTableZeroLevel WHERE ?1 BETWEEN start AND end")
        .map_err(|e| e.to_string())?;

    let language: String = stmt
        .query_row([id], |row| row.get(0))
        .map_err(|e| e.to_string())?;

    Ok(language)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_ability_modifier,
            get_luck_score,
            get_occupation,
            get_equipment,
            get_zero_level_language
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
