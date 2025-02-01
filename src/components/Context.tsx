import Player from "@/assets/player";
import { useLocalStorage } from "@/helpers/localStorage.ts";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext } from "react";


type numberFormatType = {
    numberFormat: string;
    setNumberFormat: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<Player>(new Player(true));
const NumberFormatContext = createContext<numberFormatType | string>("scientific")

export function DataWrapper({children} : PropsWithChildren) {
    const player = new Player();
    const [numberFormat, setNumberFormat] = useLocalStorage("numberFormat", "scientific")

    return (
            <DataContext.Provider value={player}>
                <NumberFormatContext.Provider value={{numberFormat, setNumberFormat}}>
                    {children}
                </NumberFormatContext.Provider>
            </DataContext.Provider>
        )
}

export function useDataContext() {
    return useContext(DataContext) as Player;
}

export function getPlayer() {
    const playerData = useDataContext();
    return playerData;
}

export function useNumberFormatContext() {
    return useContext(NumberFormatContext) as numberFormatType;
}

export function getNumberFormat() {
    const {numberFormat} = useNumberFormatContext();
    return numberFormat
}