'use client'
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { useLocalStorage } from "./localStorage";


type dataType = {
    playerData: string;
    setPlayerData: Dispatch<SetStateAction<string>>;
}

type savedDataType = {
    playerDataUpdated: boolean;
    setPlayerDataUpdated: Dispatch<SetStateAction<boolean>>;
}

type numberFormatType = {
    numberFormat: string;
    setNumberFormat: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<dataType | string>("{}");
const SavedDataContext = createContext<savedDataType | boolean>(false);
const NumberFormatContext = createContext<numberFormatType | string>("scientific")

export function DataWrapper({children} : PropsWithChildren) {
  let [playerData, setPlayerData] = useState<any>("{}");
  let [playerDataUpdated, setPlayerDataUpdated] = useState<boolean>(false);
  let [numberFormat, setNumberFormat] = useLocalStorage("numberFormat", "scientific")

  return (
    <DataContext.Provider value={{playerData, setPlayerData}}>
        <SavedDataContext.Provider value={{playerDataUpdated, setPlayerDataUpdated}}>
            <NumberFormatContext.Provider value={{numberFormat, setNumberFormat}}>
                {children}
            </NumberFormatContext.Provider>
        </SavedDataContext.Provider>
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

export function useSavedDataContext() {
    return useContext(SavedDataContext) as savedDataType;
}

export function isPlayerDataUpdated() {
    const {playerDataUpdated} = useSavedDataContext();
    return playerDataUpdated
}

export function useNumberFormatContext() {
    return useContext(NumberFormatContext) as numberFormatType;
}

export function getNumberFormat() {
    const {numberFormat} = useNumberFormatContext();
    return numberFormat
}