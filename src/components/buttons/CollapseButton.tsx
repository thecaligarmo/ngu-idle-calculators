import { MouseEventHandler } from "react";

export function CollapseButton({onClick, hidden} : {onClick: MouseEventHandler, hidden: boolean}) {
    return (
        <button
            className="-ml-5 pr-2 w-5 text-blue-500"
            onClick={onClick}
            >
            {hidden ? "+" : "-"}
            </button>
    )
}