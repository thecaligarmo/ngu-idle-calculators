import { ChangeEventHandler, ReactNode } from "react";

export function InputSelect({children, value, onChange, id}: {children: ReactNode, id: string, value : string, onChange:ChangeEventHandler<HTMLSelectElement>}) {
    return (
        <select
            className="text-black ml-1 px-1.5 py-1 border border-blue-500 rounded-lg text-sm dark:bg-black dark:text-white"
            value={value}
            onChange={onChange}
            id={id}
        >
            {children}
        </select>
    )
}