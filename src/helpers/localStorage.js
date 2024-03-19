// https://upmostly.com/next-js/using-localstorage-in-next-js
import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
    const [value, setValue] = useState(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);        
        setValue(stored ? JSON.parse(stored) : fallbackValue); //
    }, [fallbackValue, key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); //
    }, [key, value]);

    return [value, setValue];
}

export function useLocalStorageNumber(key, fallbackValue) {
    var fbV = fallbackValue.toString()
    const [value, setValue] = useState(fbV);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if(stored) {
            var x = JSON.parse(stored)
            if (x != value ){
                setValue(x); //
            }
        } else {
            setValue(fbV);
        }
        
    }, [fbV, key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); //
    }, [key, value]);

    return [value, setValue];
}