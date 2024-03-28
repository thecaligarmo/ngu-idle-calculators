import { ReactNode, useState } from "react";
import { CollapseButton } from "./buttons";

export default function CalcSection({children, title, titleExtra} : {children ?: ReactNode, title: string, titleExtra ?: ReactNode}) {
    const [hideInfo, setHideInfo] = useState(true)

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