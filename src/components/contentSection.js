import { useState } from "react";
import { dataToCols } from "./dataListColumns";


export default function ContentSection({children, idKey, title, lists, inputs}) {
    const [showInputs, setShowInputs] = useState(false)

    return (
        <section className="clear-both pt-5">
            <h3 className="text-2xl">
                <span className="underline align-bottom">{title}</span>
                <button
                    className="bg-transparent inline-block hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
                    onClick={() => setShowInputs(!showInputs)}
                    >
                        {showInputs ? "Hide Inputs" : "Change Data"}
                    </button>
            </h3>
            <div id={idKey + "-info-lists"} className={!showInputs ? "block" : "hidden"}>
                {lists}
            </div>
            <div id={idKey + "-info-inputs"} className={showInputs ? "block clear-both" : "hidden"}>
                {inputs}
            </div>
            {children}
        </section>
            
    )
}