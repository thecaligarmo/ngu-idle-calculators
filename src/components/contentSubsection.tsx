import { ReactNode, useState } from "react";
import { CollapseButton } from "./buttons";

export default function ContentSubsection({children, title, titleExtra, defaultHide=false} : {children ?: ReactNode, title: string, titleExtra ?: ReactNode, defaultHide ?: boolean}) {
    const [hideInfo, setHideInfo] = useState(defaultHide)

    return (
        <div className="mt-4 ml-5">
            <h4 className="text-lg">
                <CollapseButton hidden={hideInfo} onClick={() => {
                    setHideInfo(!hideInfo)
                }} />
                <span className="hover:underline align-bottom text-blue-500 cursor-pointer" onClick={() => {
                    setHideInfo(!hideInfo)
                }} >
                    {title}
                </span>
                { hideInfo ? null : titleExtra}
            </h4>
            { hideInfo ? null : children}
        </div>
    )
}