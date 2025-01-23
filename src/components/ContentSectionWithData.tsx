import { ReactNode, useState } from "react";
import ContentSection from "./ContentSection";
import { ListInputSwitcher } from "./buttons/ListInputSwitcher";
import { dataToCols } from "./dataListColumns";
import { getPlayer } from "./Context";

interface ContentSectionWithDataProps {
    children ?: ReactNode;
    preChildren ?: ReactNode;
    idKey : string;
    title : string;
    data : any;
    listChildren ?: ReactNode;
    inputChildren ?: ReactNode;
    description ?: string;
    defaultHide ?: boolean;
}

export default function ContentSectionWithData({children, preChildren, idKey, title, data, listChildren, inputChildren, description, defaultHide} : ContentSectionWithDataProps) {
    const [showInputs, setShowInputs] = useState(false)
    const player = getPlayer()
    
    const inputs = dataToCols(player, data, true)
    const lists = dataToCols(player, data)

    return (
        <ContentSection
            title={title}
            titleExtra={<ListInputSwitcher
                text={showInputs ? "Hide Inputs" : "Change Data"}
                onClick={() => setShowInputs(!showInputs)}
            />}
            defaultHide={defaultHide}
            >
                <>
                    {description ? <p className="pb-2"><small>{description}</small></p> : null}
                    {preChildren}
                    <div id={idKey + "-info-lists"} className={!showInputs ? "block" : "hidden"}>
                        {lists}
                        {listChildren}
                    </div>
                    <div id={idKey + "-info-inputs"} className={showInputs ? "block clear-both" : "hidden"}>
                        {inputs}
                        {inputChildren}
                    </div>
                    {children}
                </>
        </ContentSection>       
    )
}