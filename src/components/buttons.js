

export function ListInputSwitcher({text, onClick}) {

    return (
        <button
            className="bg-transparent inline-block hover:bg-blue-500 text-blue-700 text-sm hover:text-white dark:hover:text-black py-1 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
            onClick={onClick}
            >
                {text}
        </button>
    )

}

export function ChoiceButton({text, onClick, active=false}){
    return (
        <button
            className="bg-transparent hover:bg-blue-500 inline-block py-2 px-4 text-blue-700 hover:text-white dark:hover:text-black font-semibold"
            onClick={onClick}
            >
            {text}
        </button>
    );
}

export function CollapseButton({onClick, hidden}) {
    return (
        <button
            className="-ml-5 pr-2 w-5"
            onClick={onClick}
            >
            {hidden ? "+" : "-"}
            </button>
    )
}