// https://upmostly.com/next-js/using-localstorage-in-next-js
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, fallbackValue : any) {
    var fbV : string = fallbackValue.toString()
    const [value, setValue] = useState<any>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            var x = JSON.parse(stored)
            if (x != value) {
                setValue(x); //
            }
        } else {
            setValue(fbV)
        }
    }, [fbV, key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); //
    }, [key, value]);

    return [value, setValue] as const;
}

export function useLocalStorageNumber(key: string, fallbackValue: any, nonzero : boolean = false) {
    var fbV : string = (typeof fallbackValue == 'string') ? fallbackValue : fallbackValue.toString()
    const [value, setValue] = useState<string>(fbV);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        
        if(stored) {
            var x = JSON.parse(stored)
            if (x != value && (!nonzero || fbV != '0') ){
                setValue(x); //
            }
        } else {
            setValue(fbV);
        }
        
    }, [fbV, key, nonzero]);

    useEffect(() => {
        if ((!nonzero || fbV != '0') ) {
            localStorage.setItem(key, JSON.stringify(value)); //
        }
    }, [key, value]);

    return [value, setValue] as const;
}