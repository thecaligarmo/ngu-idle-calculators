import { ReactNode, useState } from "react";
import { ListInputSwitcher } from "./buttons";
import ContentSection from "./contentSection";
import { dataToCols } from "./dataListColumns";

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
    
    const inputs = dataToCols(data, true)
    const lists = dataToCols(data)

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