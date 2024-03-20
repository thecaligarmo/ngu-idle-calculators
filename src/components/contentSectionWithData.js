import { useState } from "react";
import { dataToCols } from "./dataListColumns";
import {  ListInputSwitcher } from "./buttons";
import ContentSection from "./contentSection";

export default function ContentSectionWithData({children, idKey, title, data}) {
    const [showInputs, setShowInputs] = useState(false)
    
    const inputs = dataToCols(data, true)
    const lists = dataToCols(data)

    return (
        <ContentSection
            title={title}
            titleExtra={<ListInputSwitcher
                text={showInputs ? "Hide Inputs" : "Change Data"}
                onClick={() => setShowInputs(!showInputs)}
            />}
            >
                <>
                    <div id={idKey + "-info-lists"} className={!showInputs ? "block" : "hidden"}>
                        {lists}
                    </div>
                    <div id={idKey + "-info-inputs"} className={showInputs ? "block clear-both" : "hidden"}>
                        {inputs}
                    </div>
                    {children}
                </>
        </ContentSection>       
    )
}