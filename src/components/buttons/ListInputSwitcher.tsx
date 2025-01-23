import { MouseEventHandler, ReactNode } from "react";


export function ListInputSwitcher({text, onClick} : {text: ReactNode, onClick: MouseEventHandler}) {
    return (
        <button
            className="bg-transparent inline-block hover:bg-blue-500 text-blue-700 text-sm hover:text-white dark:hover:text-black py-1 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
            onClick={onClick}
            >
                {text}
        </button>
    )

}
