'use client'
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../helpers/localStorage";

type dataType = {
    playerData: string;
    setPlayerData: Dispatch<SetStateAction<string>>;
}


type numberFormatType = {
    numberFormat: string;
    setNumberFormat: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<dataType | string>("{}");
const NumberFormatContext = createContext<numberFormatType | string>("scientific")

export function DataWrapper({children} : PropsWithChildren) {
  let [playerData, setPlayerData] = useState<any>("{}");
  let [numberFormat, setNumberFormat] = useLocalStorage("numberFormat", "scientific")

  return (
    <DataContext.Provider value={{playerData, setPlayerData}}>
        <NumberFormatContext.Provider value={{numberFormat, setNumberFormat}}>
            {children}
        </NumberFormatContext.Provider>
    </DataContext.Provider>
)
}

export function useDataContext() {
    return useContext(DataContext) as dataType;
}

export function getPlayerData() {
    const {playerData} = useDataContext();
    return JSON.parse(playerData);
}

export function useNumberFormatContext() {
    return useContext(NumberFormatContext) as numberFormatType;
}

export function getNumberFormat() {
    const {numberFormat} = useNumberFormatContext();
    return numberFormat
}