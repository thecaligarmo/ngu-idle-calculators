import { Dispatch, SetStateAction } from "react";

export function NavSelect({
    numberFormat,
    setNumberFormat,
}: {
    numberFormat: string;
    setNumberFormat: Dispatch<SetStateAction<string>>;
}) {
    return (
        <select
            value={numberFormat}
            className="block px-2.5 py-2 bg-gray-50 dark:bg-gray-700
                    border border-gray-300 dark:border-gray-600 rounded-lg
                    text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white
                    "
            id="nav-select"
            onChange={(e) => {
                setNumberFormat(e.target.value);
            }}
        >
            <option key="engineering" value="engineering">
                Engineering
            </option>
            <option key="scientific" value="scientific">
                Scientific
            </option>
            <option key="suffix" value="suffix">
                Suffix
            </option>
        </select>
    );
}
