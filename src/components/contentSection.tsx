import { ReactNode, useState } from "react";
import { CollapseButton } from "./buttons";

export default function ContentSection({children, title, titleExtra} : {children ?: ReactNode, title: string, titleExtra?: ReactNode}) {
    const [hideInfo, setHideInfo] = useState(false)

    return (
        <section className="clear-both pt-5">
            <h3 className="text-2xl">
                <CollapseButton hidden={hideInfo} onClick={() => {
                    setHideInfo(!hideInfo)
                }} />
                <span className="underline align-bottom">{title}</span>
                { hideInfo ? null : titleExtra}
            </h3>
            { hideInfo ? null : children}
        </section>
    )
}