import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/App.css";

import { Character } from "./utils/character.js";
import ZeroLevelSheet from "./pages/ZeroLevelSheet.jsx";

import generateZeroLevelCharacter from "./utils/zeroLevelGenerator.js";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("generator");

  const [character, setCharacter] = useState(generateZeroLevelCharacter());

  const tabs = [
    { id: "home", label: "HOME" },
    { id: "generator", label: "GENERATOR" },
  ];

  const rerollCharacter = () => {
    setCharacter(generateZeroLevelCharacter());
  };

  return (
    <>
      {/* <div className="container border-container rounded-md"> */}
      {/*   <div className="title-panel"> */}
      {/*     <h1 className="mt-12 text-shadow-lg/100">DCC Character</h1> */}
      {/*     <h3 className="mb-8 text-shadow-lg/60">0-Level Character Funnel</h3> */}
      {/*   </div> */}
      {/*   <div className="flex flex-row mt-4"> */}
      {/*     <div className="border-container flex flex-1 flex-col mx-2 shadow-lg/80 rounded-md"> */}
      {/*       <button className="m-4 rounded-xl">Look over here!</button> */}
      {/*       <textarea */}
      {/*         className="text-area p-2 pb-12 rounded-s m-2" */}
      {/*         placeholder="Enter text here..." */}
      {/*       ></textarea> */}
      {/*     </div> */}
      {/*     <div className="border-container flex-1 flex-col shadow-lg/80 mx-2 rounded-md"></div> */}
      {/*   </div> */}
      {/*   <div className="border-container flex flex-col mt-8 shadow-lg/80 rounded-md mx-2"> */}
      {/*     <p className="p-8">Throwing some text into here.</p> */}
      {/*   </div> */}
      {/* </div> */}

      {showSettings && <h1>SETTINGS</h1>}

      <div className="container flex flex-col h-screen">
        <div className="tab-panel outline-1 outline-dashed outline-gray-500">
          <h2 className="ml-4">TABS</h2>
          <div className="flex-1"></div>
        </div>

        <div className="main-content flex flex-1">
          {/* {activeTab === "home" && <p>HOME</p>} */}
          {activeTab === "generator" && (
            <ZeroLevelSheet character={character} />
          )}
          <button
            className={`
              absolute flex justify-center items-center
              top-[90%] right-[10%] bottom-0 left-[65%]
              my-4 mx-2 rounded-lg
            `}
            onClick={rerollCharacter}
          >
            Generate New Character
          </button>
        </div>
      </div>
    </>
  );
}
