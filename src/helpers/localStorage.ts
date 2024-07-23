// https://upmostly.com/next-js/using-localstorage-in-next-js
import ESSerializer from 'esserializer';
import { AdvTraining } from "@/assets/advTraining";
import { APItem } from "@/assets/apItems";
import { Beard } from "@/assets/beards";
import { Challenge } from "@/assets/challenges";
import { Digger } from "@/assets/diggers";
import { AttackStat, Enemy } from "@/assets/enemy";
import { Hack } from "@/assets/hacks";
import { Item } from "@/assets/items";
import { MacGuffin } from "@/assets/macguffins";
import { GameMode } from "@/assets/mode";
import { NGU } from "@/assets/ngus";
import { Perk } from "@/assets/perks";
import { Quirk } from "@/assets/quirks";
import Resource from "@/assets/resource";
import { ItemSet } from "@/assets/sets";
import { Stat } from "@/assets/stat";
import { Wish } from "@/assets/wish";
import { FruitOfAdventure, FruitOfArbitrariness, FruitOfGold, FruitOfKnowledge, FruitOfLuck, FruitOfMacguffinA, FruitOfMacguffinB, FruitOfMayo, FruitOfNumbers, FruitOfPomegranate, FruitOfPowerA, FruitOfPowerB, FruitOfPowerD, FruitOfQuirks, FruitOfRage, FruitOfWatermelon, Yggdrasil } from "@/assets/yggdrasil";
import Zone from "@/assets/zones";
import bigDecimal from "js-big-decimal";
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, fallbackValue : any) {
    var fbV : string = fallbackValue.toString()
    const [value, setValue] = useState<any>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            var x = ESSerializer.deserialize(
                stored,
                [
                    AdvTraining, APItem, Beard, Challenge, Digger, Enemy, Item, Hack, MacGuffin, GameMode, NGU, Perk, Quirk, Resource, ItemSet, Stat, Wish,
                    Zone, AttackStat, bigDecimal,
                    Yggdrasil, FruitOfGold, FruitOfPowerA, FruitOfAdventure, FruitOfKnowledge, FruitOfPomegranate, FruitOfLuck, FruitOfPowerB, FruitOfArbitrariness, FruitOfNumbers, FruitOfRage, FruitOfMacguffinA, FruitOfPowerD, FruitOfWatermelon, FruitOfMacguffinB, FruitOfQuirks, FruitOfMayo,
                ]
            );
            // var x = JSON.parse(stored)
            if (x != value) {
                setValue(x); //
            }
        } else {
            setValue(fbV)
        }
    }, [fbV, key]);

    useEffect(() => {
        // localStorage.setItem(key, JSON.stringify(value)); //
        localStorage.setItem(key, ESSerializer.serialize(value))
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
