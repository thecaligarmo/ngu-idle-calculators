'use client'
import { createContext, useContext, useState } from "react";

const DataContext = createContext("{}");
const SavedDataContext = createContext(false);

export function DataWrapper({children}) {
  let [playerData, setPlayerData] = useState("{}");
  let [playerDataUpdated, setPlayerDataUpdated] = useState(false);

  return (
    <DataContext.Provider value={{playerData, setPlayerData}}>
        <SavedDataContext.Provider value={{playerDataUpdated, setPlayerDataUpdated}}>
            {children}
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
