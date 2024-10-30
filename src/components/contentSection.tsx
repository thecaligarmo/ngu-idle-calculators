import { ReactNode, useState } from "react";
import { CollapseButton } from "./buttons";
import _ from "lodash";

export default function ContentSection({children, title, titleExtra, defaultHide} : {children ?: ReactNode, title: string, titleExtra?: ReactNode, defaultHide?:boolean}) {
    defaultHide = _.isUndefined(defaultHide) ? false : defaultHide
    const [hideInfo, setHideInfo] = useState(defaultHide)

    return (
        <section className="clear-both pt-5">
            <h3 className="text-2xl">
                <CollapseButton hidden={hideInfo} onClick={() => {
                    setHideInfo(!hideInfo)
                }} />
                <span className="hover:underline align-bottom text-blue-500 cursor-pointer" onClick={() => {
                    setHideInfo(!hideInfo)
                }} >
                    {title}
                </span>
                { hideInfo ? null : titleExtra}
            </h3>
            { hideInfo ? null : children}
        </section>
    )
}