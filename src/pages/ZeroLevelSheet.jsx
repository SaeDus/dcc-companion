import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { invoke } from "@tauri-apps/api/core";

import "../styles/ZeroLevelSheet.css";

import { Character } from "../utils/character.js";
import rollDie from "../utils/dccDice.js";

const abilityScores = [
  "STRENGTH",
  "AGILITY",
  "STAMINA",
  "PERSONALITY",
  "INTELLIGENCE",
  "LUCK",
];

const savingThrows = ["REFLEX", "FORTITUDE", "WILLPOWER"];

export default function ZeroLevelSheet({ character }) {
  const [characterLabels, setCharacterLabels] = useState({});

  useEffect(() => {
    const fetchLabels = async () => {
      const labels = {};

      labels.strength = await invoke("get_ability_modifier", {
        id: character.strength,
      });
      labels.agility = await invoke("get_ability_modifier", {
        id: character.agility,
      });
      labels.stamina = await invoke("get_ability_modifier", {
        id: character.stamina,
      });
      labels.personality = await invoke("get_ability_modifier", {
        id: character.personality,
      });
      labels.intelligence = await invoke("get_ability_modifier", {
        id: character.intelligence,
      });
      labels.luck = await invoke("get_ability_modifier", {
        id: character.luck,
      });

      labels.luckyRoll = await invoke("get_luck_score", {
        id: character.luckyRoll,
      });

      labels.occupation = await invoke("get_occupation", {
        id: character.occupation,
      });

      labels.equipment = await invoke("get_equipment", {
        id: character.equipment,
      });

      labels.languages = await rollLanguages(
        labels.intelligence.modifier,
        labels.occupation.occupation,
      );

      setCharacterLabels(labels);
    };

    fetchLabels();
  }, [character]);

  function getSavingThrow(label) {
    let mod = 0;

    switch (label) {
      case "REFLEX":
        mod = characterLabels.agility ? characterLabels.agility.modifier : 0;
        break;
      case "FORTITUDE":
        mod = characterLabels.stamina ? characterLabels.stamina.modifier : 0;
        break;
      case "WILLPOWER":
        mod = characterLabels.personality
          ? characterLabels.personality.modifier
          : 0;
        break;
      default:
        alert("umm...");
    }

    return mod >= 0 ? `+${mod}` : mod;
  }

  function getArmorClass() {
    let mod = characterLabels.agility ? characterLabels.agility.modifier : 0;

    return 10 + mod;
  }

  async function rollLanguages(intelligence, occupation) {
    let knownLanguages = ["Common"];

    if (typeof occupation === "string") {
      if (occupation.toLowerCase().includes("dwarven")) {
        knownLanguages.push("Dwarf");
      } else if (occupation.toLowerCase().includes("elven")) {
        knownLanguages.push("Elf");
      } else if (occupation.toLowerCase().includes("halfling")) {
        knownLanguages.push("Halfling");
      }
    }

    for (var i = 0; i < intelligence; i++) {
      var language = await invoke("get_zero_level_language", {
        id: rollDie(1, 100),
      });

      if (knownLanguages.includes(language)) {
        i--;
        continue;
      }

      knownLanguages.push(language);
    }

    let languageString = knownLanguages.join(", ");

    return languageString;
  }

  return (
    <div className="zero-level-sheet relative w-full">
      {/* PURSE PANEL */}
      <div
        className={`
          absolute flex flex-col p-2 justify-center items-center
          top-[33%] right-[25.235%] bottom-[30%] left-[58%]
        `}
      >
        <div className={`flex flex-1 w-full gap-2`}>
          <div className="flex-1" />
          <div className="flex-1" />
          <div className={`flex flex-1 flex-col mr-3 -ml-3`}>
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-4xl
              `}
            >
              <p className="text-xl">0</p>
            </div>
            <p className="text-sm label-text">P</p>
          </div>
        </div>
        <div className={`flex flex-1 w-full gap-2`}>
          <div className="flex-1" />
          <div className={`flex flex-1 flex-col`}>
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-4xl
              `}
            >
              <p className="text-xl">0</p>
            </div>
            <p className="text-sm label-text">G</p>
          </div>
          <div className={`flex flex-1 flex-col`}>
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-4xl
              `}
            >
              <p className="text-xl">0</p>
            </div>
            <p className="text-sm label-text">E</p>
          </div>
        </div>
        <div className={`flex flex-1 w-full gap-2 mr-8 -ml-8`}>
          <div className="flex-1" />
          <div className={`flex flex-1 flex-col`}>
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-4xl
              `}
            >
              <p className="text-xl">{character.startingGold}</p>
            </div>
            <p className="text-sm label-text">C</p>
          </div>
          <div className={`flex flex-1 flex-col`}>
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-4xl
              `}
            >
              <p className="text-xl">0</p>
            </div>
            <p className="text-sm label-text">S</p>
          </div>
        </div>
      </div>

      {/* WEAPONS PANEL */}
      <div
        className={`
          absolute flex flex-col p-2 gap-2
          top-[35%] right-[59%] bottom-[38%] left-0
        `}
      >
        <div className={`flex flex-1 justify-center items-center`}>
          <div className="absolute flex-1 custom-border w-[75%] -z-1" />
          <div
            className={`
              flex flex-[8] h-full justify-start items-center
              custom-border rounded-md
            `}
          >
            <p className="text-xl ml-3">
              {characterLabels.occupation
                ? characterLabels.occupation.trained_weapon
                : ""}
            </p>
          </div>
          <div
            className={`
              flex flex-1 h-full ml-8 justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-lg text-gray-500">+3</p>
          </div>
          <div
            className={`
              flex flex-[2] h-full ml-4 mr-12 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-lg text-gray-500">1d12</p>
          </div>
        </div>
        <div className={`flex flex-1 ml-4 justify-center items-center`}>
          <div className="absolute flex-1 custom-border w-[80%] -z-1" />
          <div
            className={`
              flex flex-[8] h-full justify-start items-center
              custom-border rounded-md
            `}
          >
            <p className="text-xl ml-3 text-gray-500">Longsword</p>
          </div>
          <div
            className={`
              flex flex-1 h-full ml-8 justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-lg text-gray-500">+3</p>
          </div>
          <div
            className={`
              flex flex-[2] h-full ml-4 mr-8 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-lg text-gray-500">1d12</p>
          </div>
        </div>
        <div className={`flex flex-1 ml-8 justify-center items-center`}>
          <div className="absolute flex-1 custom-border w-[80%] -z-1" />
          <div
            className={`
              flex flex-[8] h-full justify-start items-center
              custom-border rounded-md
            `}
          >
            <p className="text-xl ml-3 text-gray-500">Longsword</p>
          </div>
          <div
            className={`
              flex flex-1 h-full ml-8 justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-lg text-gray-500">+3</p>
          </div>
          <div
            className={`
              flex flex-[2] h-full ml-4 mr-4 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-lg text-gray-500">1d12</p>
          </div>
        </div>
        <div className={`flex flex-1 ml-12 justify-center items-center`}>
          <div className="absolute flex-1 custom-border w-[80%] -z-1" />
          <div
            className={`
              flex flex-[8] h-full justify-start items-center
              custom-border rounded-md
            `}
          >
            <p className="text-xl ml-3 text-gray-500">Longsword</p>
          </div>
          <div
            className={`
              flex flex-1 h-full ml-8 justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-lg text-gray-500">+3</p>
          </div>
          <div
            className={`
              flex flex-[2] h-full ml-4 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-lg text-gray-500">1d12</p>
          </div>
        </div>
      </div>

      {/* LANGUAGES PANEL */}
      <div
        className={`
          absolute flex p-2 justify-center items-end
          top-[53%] right-0 bottom-[26%] left-[73%]
        `}
      >
        <p className="text-sm vertical-text label-text mb-2">Languages</p>
        <div
          className={`
            flex flex-1 h-full pt-1 pl-3 justify-start items-start
            custom-border rounded-md
          `}
        >
          {/* <p className="text-lg">{rollLanguages()}</p> */}
          <p className="text-lg">
            {characterLabels.languages ? characterLabels.languages : ""}
          </p>
        </div>
      </div>

      {/* INVENTORY PANEL */}
      <div
        className={`
          absolute flex flex-col p-2 justify-center items-end
          top-[30%] right-0 bottom-[47%] left-[74.765%]
        `}
      >
        <p className="text-sm label-text mr-6">Inventory</p>
        <div
          className={`
            flex flex-1 flex-col pl-3 pt-1 justify-start items-start
            custom-border w-full rounded-md
          `}
        >
          <p className="text-lg">
            {characterLabels.occupation
              ? characterLabels.occupation.trade_goods
              : ""}
          </p>
          <p className="text-lg">
            {characterLabels.equipment ? characterLabels.equipment : ""}
          </p>
        </div>
      </div>

      {/* GEAR PANEL*/}
      <div
        className={`
          absolute flex p-2 gap-4
          top-[11.765%] right-0 bottom-[64.706%] left-[55%]
        `}
      >
        <div
          className={`
            flex flex-1 flex-col justify-center items-start
          `}
        >
          <div
            className={`
              flex flex-1 flex-col justify-start items-start
              custom-border w-full pt-1 pl-3
            `}
          >
            <p className="text-xl">
              {characterLabels.occupation
                ? characterLabels.occupation.trained_weapon
                : ""}
            </p>
          </div>
          <p className="text-sm ml-4 label-text">Weapons</p>
        </div>
        <div
          className={`
            flex flex-1 flex-col justify-center items-start
          `}
        >
          <div
            className={`
              flex flex-1 flex-col justify-start items-start
              custom-border w-full pt-1 pl-3
            `}
          >
            <p className="text-xl text-gray-500">Steel Cuirass x1</p>
          </div>
          <p className="flex-1 text-sm ml-4 label-text">Armor</p>
        </div>
      </div>

      {/* COMBAT PANEL */}
      <div
        className={`
          absolute flex p-2 justify-center items-center gap-8
          top-[20%] right-[60%] bottom-[66%] left-0
        `}
      >
        <div
          className={`
            flex flex-1 flex-col justify-cetner items-center h-full
          `}
        >
          <div
            className={`
              flex flex-1 w-full justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-2xl">
              {characterLabels.agility
                ? characterLabels.agility.modifier >= 0
                  ? `+${characterLabels.agility.modifier}`
                  : characterLabels.agility.modifier
                : ""}
            </p>
          </div>
          <p className="text-sm label-text">Initiative</p>
        </div>
        <div
          className={`
            flex flex-[2] flex-col h-full justify-center items-center
          `}
        >
          <div className="absolute custom-border w-[20%] -z-1" />
          <div className="flex flex-1 w-full justify-between gap-4">
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-xl
              `}
            >
              <p className="text-2xl">d20</p>
            </div>
            <div
              className={`
                flex flex-1 h-full justify-center items-center
                custom-border rounded-xl
              `}
            >
              <p className="text-2xl text-gray-500">-</p>
            </div>
          </div>
          <p className="text-sm label-text">Action Dice</p>
        </div>
        <div
          className={`
            flex flex-[2] h-full justify-center items-center
          `}
        >
          <div className="flex flex-1 flex-col h-full">
            <div
              className={`
                flex flex-1 justify-center items-center
                custom-border rounded-xl
              `}
            >
              <p className="text-2xl text-gray-500">1d4</p>
            </div>
            <p className="text-sm self-center label-text">Crit Die</p>
          </div>
          <div className="flex flex-1 flex-col w-full h-full items-center">
            <div
              className={`
                flex w-full h-12 justify-center items-center
                custom-border rounded-xl
              `}
            >
              <p className="text-2xl text-gray-500">1-4</p>
            </div>
            <p className="text-sm self-start ml-4 label-text">Table</p>
            <div className="flex-1" />
          </div>
        </div>
      </div>

      {/* INFORMATION PANEL */}
      <div
        className={`
          absolute flex pt-2 pr-2 pl-2 gap-2
          top-0 right-0 bottom-[88.235%] left-[55%]
        `}
      >
        <div className="flex flex-1 flex-col">
          <div
            className={`
              flex flex-1 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-2xl text-gray-500">24</p>
          </div>
          <p className="text-sm label-text">Age</p>
        </div>
        <div className="flex flex-[2] flex-col">
          <div
            className={`
              flex flex-1 justify-center items-center
              custom-border rounded-md
            `}
          >
            <p className="text-2xl text-gray-500">Female</p>
          </div>
          <p className="text-sm self-start ml-4 label-text">Gender</p>
        </div>
        <div className="flex flex-1 flex-col">
          <div
            className={`
              flex flex-1 justify-center items-center
              custom-border rounded-lg
            `}
          >
            <p className="text-2xl text-gray-500">{`5'5`}</p>
          </div>
          <p className="text-sm label-text">Height</p>
        </div>
        <div className="flex flex-1 flex-col">
          <div
            className={`
              flex flex-1 justify-center items-center
              custom-border rounded-xl
            `}
          >
            <p className="text-2xl text-gray-500">{`30'`}</p>
          </div>
          <p className="text-sm label-text">Speed</p>
        </div>
        <div className="flex flex-[2] flex-col">
          <div
            className={`
              flex flex-1 justify-center items-center
              custom-border rounded-sm
            `}
          >
            <p className="text-2xl text-gray-500">Chaotic</p>
          </div>
          <p className="text-sm self-start ml-4 label-text">Alignment</p>
        </div>
      </div>

      {/* LUCKY ROLL PANEL */}
      <div
        className={`
          absolute flex flex-col p-2 justify-center items-start
          top-[70%] right-0 bottom-[10%] left-[56%]
        `}
      >
        <p className="text-sm ml-4 label-text">Lucky Roll</p>
        <div
          className={`
            flex flex-1 justify-start items-center rounded-lg
            custom-border pl-2 w-[60%]
          `}
        >
          <p className="text-xl">
            {characterLabels.luckyRoll
              ? characterLabels.luckyRoll.birth_augur
              : ""}
          </p>
        </div>
        <div
          className={`
            flex flex-1 justify-start items-center rounded-lg
            custom-border pl-2 w-full
          `}
        >
          <p className="text-xl">
            {characterLabels.luckyRoll
              ? characterLabels.luckyRoll.lucky_roll
              : ""}
          </p>
        </div>
      </div>

      {/* SAVING THROWS PANEL */}
      <div
        className={`
          absolute flex justify-center items-center gap-2
          top-[64.705%] right-[45%] bottom-[23.53%] left-0
        `}
      >
        {savingThrows.map((s) => (
          <div
            key={s}
            className={`
              flex flex-col items-center w-28 h-full
            `}
          >
            <p className="text-center text-sm label-text">{s}</p>
            <div
              className={`
                aspect-square rounded-2xl h-full
                custom-border items-center content-center
              `}
            >
              <p className="text-2xl">{getSavingThrow(s)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ABILITY SCORE PANEL */}
      <div
        className={`
          absolute flex justify-center items-center
          top-[76.47%] right-[45%] bottom-0 left-0
          pl-1 pr-1 space-x-2
        `}
      >
        {abilityScores.map((a) => (
          <div key={a} className="flex-1">
            <div
              className={`
                flex flex-row
              `}
            >
              <p className={`vertical-text text-left pb-6 text-sm label-text`}>
                {a}
              </p>
              <div
                className={`
                  flex-1 flex-col justify-items-center content-center
                `}
              >
                <div
                  className={`
                  flex-1 aspect-square custom-border content-center w-[60%]
                  rounded-lg
                  `}
                >
                  <p className="justify-center text-2xl">
                    {characterLabels[a.toLowerCase()] !== undefined
                      ? characterLabels[a.toLowerCase()].modifier >= 0
                        ? `+${characterLabels[a.toLowerCase()].modifier}`
                        : characterLabels[a.toLowerCase()].modifier
                      : ""}
                  </p>
                </div>
                <div
                  className={`
                    flex-1 aspect-square custom-border content-center w-[100%]
                    rounded-2xl
                  `}
                >
                  <p className="text-4xl">{character[a.toLowerCase()]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NAME PANEL */}
      <div
        className={`
        absolute flex flex-col p-2 gap-2
        top-0 right-[55%] bottom-[79%] left-0
      `}
      >
        <div className="flex flex-1 flex-col">
          <div
            className={`
              flex flex-1 items-center justify-start
              custom-border rounded-lg
            `}
          >
            <p className="text-2xl ml-3">Unnamed Adventurer</p>
          </div>
          <p className="text-sm self-start label-text">Name</p>
        </div>
        <div className="flex flex-1 flex-col">
          <div
            className={`
              flex flex-1 items-center justify-start
              custom-border rounded-xl
            `}
          >
            <p className="text-2xl ml-3">
              {characterLabels.occupation
                ? characterLabels.occupation.occupation
                : ""}
            </p>
          </div>
          <p className="text-sm self-start label-text">Occupation</p>
        </div>
      </div>

      {/* LEVEL PANEL */}
      <div
        className={`
          absolute flex flex-col p-2 justify-center items-center
          top-0 right-[45%] bottom-[79%] left-[45%]
        `}
      >
        <div
          className={`
            flex flex-1 w-full justify-center items-center
            custom-border rounded-lg
          `}
        >
          <p className="text-5xl">0</p>
        </div>
        <p className="text-sm label-text">Level</p>
      </div>

      {/* TITLE PANEL */}
      <div
        className={`
          absolute flex justify-center items-center
          top-[58%] right-[41%] bottom-[20%] left-[38%]
        `}
      >
        <h1 className="text-7xl mr-2 title-text">DCC</h1>
        <h1 className="vertical-text text-4xl ml-2 title-text">RPG</h1>
      </div>

      {/* HEALTH PANEL */}
      <div
        className={`
          absolute flex
          top-[21%] right-[37%] bottom-[39%] left-[41%]
        `}
      >
        <div
          className={`
            absolute flex ml-2 justify-center items-end
            top-[40%] right-[28%] bottom-0 left-0
          `}
        >
          <p className="text-sm vertical-text self-end mb-4 label-text">HP</p>
          <div
            className={`
              flex flex-1 h-full justify-center items-center
              custom-border rounded-xl
            `}
          >
            <p className="text-5xl">{character.hp}</p>
          </div>
        </div>
        <div
          className={`
            absolute flex flex-col justify-center items-center
            top-[50%] right-0 bottom-[10%] left-[65%]
          `}
        >
          <div
            className={`
              flex flex-1 aspect-square justify-center items-center
              custom-border rounded-4xl
            `}
          >
            <p className="text-2xl">{character.hp}</p>
          </div>
          <p className="text-sm self-start ml-8 label-text">Max</p>
        </div>
        <div
          className={`
            absolute flex mt-2 ml-3 justify-center items-center
            top-0 right-[48%] bottom-[60%] left-0
          `}
        >
          <div
            className={`
              flex flex-1 h-full justify-center items-center
              custom-border rounded-md
            `}
          >
            <p className="text-2xl">{getArmorClass()}</p>
          </div>
          <p className="text-sm vertical-text self-end mb-4 label-text">AC</p>
        </div>
      </div>
    </div>
  );
}

ZeroLevelSheet.propTypes = {
  character: PropTypes.instanceOf(Character).isRequired,
};
