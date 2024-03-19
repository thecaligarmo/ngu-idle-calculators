import { useState } from "react";
import { dataToCols } from "./dataListColumns";
import ContentSection from "./contentSection";






export default function Content({children, title, infoRequired, extraRequired}) {
    const [showInputs, setShowInputs] = useState(false)
    const [showExtraInputs, setShowExtraInputs] = useState(true)
    // dataToCols
    const playerInfo = dataToCols(infoRequired)
    const playerInfoInputs = dataToCols(infoRequired, true)
    const extraInfoInputs = dataToCols(extraRequired, true)
    const extraInfo = dataToCols(extraRequired)


    return (
        <main className="w-3/4 mx-auto pt-10">
            <h2 className="text-4xl mb-10 border-b font-bold">{title}</h2>
            {/* <ContentSection idKey="player" title="Player Info" lists={playerInfo} inputs={playerInfoInputs} /> */}
            <section>
                <h3 className="text-2xl">
                    <span className="underline align-bottom">Player Info</span>
                    <button
                        className="bg-transparent inline-block hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
                        onClick={() => setShowInputs(!showInputs)}
                        >
                            {showInputs ? "Hide Inputs" : "Change Data"}
                        </button>
                </h3>
                <div id="player-info-lists" className={!showInputs ? "block" : "hidden"}>
                    {playerInfo}
                </div>
                <div id="player-info-inputs" className={showInputs ? "block clear-both" : "hidden"}>
                    {playerInfoInputs}
                </div>
            </section>
            <section className="clear-both pt-5">
                <h3 className="text-2xl">
                    <span className="underline align-bottom">Extra Info</span>
                <button
                        className="bg-transparent inline-block hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
                        onClick={() => setShowExtraInputs(!showExtraInputs)}
                        >
                            {showExtraInputs ? "Hide Inputs" : "Change Data"}
                        </button>
                    </h3>
                <div id="extra-info-inputs" className={showExtraInputs ? "clear-both block" : "hidden"}>
                    {extraInfoInputs}
                </div>
                <div id="player-info-lists" className={!showExtraInputs ? "clear-both block" : "hidden"}>
                    {extraInfo}
                </div>
            </section>
            <section className="pt-5 clear-both">
                <h3 className="text-2xl underline">Information</h3>
                <div id="content" className="clear-both">
                    {children}
                </div>
            </section>
        </main>
    )
}