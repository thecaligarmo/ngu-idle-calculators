'use client'
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "./localStorage.ts";

const DataContext = createContext("{}");
const SavedDataContext = createContext(false);
const NumberFormatContext = createContext("scientific")

export function DataWrapper({children}) {
  let [playerData, setPlayerData] = useState("{}");
  let [playerDataUpdated, setPlayerDataUpdated] = useState(false);
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
    return useContext(DataContext);
}

export function getPlayerData() {
    const {playerData} = useDataContext();
    return JSON.parse(playerData);
}

export function useSavedDataContext() {
    return useContext(SavedDataContext);
}

export function isPlayerDataUpdated() {
    const {playerDataUpdated} = useSavedDataContext();
    return playerDataUpdated
}

export function useNumberFormatContext() {
    return useContext(NumberFormatContext);
}

export function getNumberFormat() {
    const {numberFormat} = useNumberFormatContext();
    return numberFormat
}