

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
            className="bg-transparent hover:bg-blue-500 inline-flex items-center py-2 px-4 text-blue-700 hover:text-white dark:hover:text-black font-semibold"
            onClick={onClick}
            >
            {!active ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="fill-current w-4 mr-1"></svg> :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="fill-current w-4 mr-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>}
            <span>{text}</span>
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