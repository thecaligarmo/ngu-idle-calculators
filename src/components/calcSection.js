import { useState } from "react";
import { CollapseButton } from "./buttons";

export default function CalcSection({children, title, titleExtra}) {
    const [hideInfo, setHideInfo] = useState(false)

    return (
        <div className="pt-3">
            <h4 className="text-lg">
            <CollapseButton hidden={hideInfo} onClick={() => {
                    setHideInfo(!hideInfo)
                }} />
                <span className="underline align-bottom">{title}</span>
                { hideInfo ? null : " ="}
            </h4>
            { hideInfo ? null : children}
        </div>
    )
}