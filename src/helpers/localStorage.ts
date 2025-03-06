// https://upmostly.com/next-js/using-localstorage-in-next-js
import ESSerializer from "esserializer";
import bigDecimal from "js-big-decimal";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AdvTraining } from "@/assets/advTraining";
import { APItem } from "@/assets/apItems";
import { Beard } from "@/assets/beards";
import { Card } from "@/assets/cards";
import { Challenge } from "@/assets/challenges";
import { Dish, Ingredient } from "@/assets/cooking";
import { Digger } from "@/assets/diggers";
import { AttackStat, Enemy, Titan } from "@/assets/enemy";
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
import { Wandoos } from "@/assets/wandoos";
import { Wish } from "@/assets/wish";
import {
    FruitOfAdventure,
    FruitOfArbitrariness,
    FruitOfGold,
    FruitOfKnowledge,
    FruitOfLuck,
    FruitOfMacguffinA,
    FruitOfMacguffinB,
    FruitOfMayo,
    FruitOfNumbers,
    FruitOfPomegranate,
    FruitOfPowerA,
    FruitOfPowerB,
    FruitOfPowerD,
    FruitOfQuirks,
    FruitOfRage,
    FruitOfWatermelon,
    Yggdrasil,
} from "@/assets/yggdrasil";
import Zone from "@/assets/zones";

export function useLocalStorage(key: string, fallbackValue: string) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return _.isUndefined(stored) || _.isNull(stored) ? fallbackValue : stored;
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue] as const;
}

// For speed purposes we want to keep the serialization in an effect
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function useLocalStorageObject(key: string, fallbackValue: any) {
    const fbV: string = fallbackValue.toString();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const [value, setValue] = useState<any>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const x = ESSerializer.deserialize(stored, [
                    AdvTraining,
                    APItem,
                    Beard,
                    Card,
                    Challenge,
                    Digger,
                    Dish,
                    Enemy,
                    Ingredient,
                    Item,
                    Hack,
                    MacGuffin,
                    GameMode,
                    NGU,
                    Perk,
                    Quirk,
                    Resource,
                    ItemSet,
                    Stat,
                    Wandoos,
                    Wish,
                    Zone,
                    AttackStat,
                    bigDecimal,
                    Titan,
                    Yggdrasil,
                    FruitOfGold,
                    FruitOfPowerA,
                    FruitOfAdventure,
                    FruitOfKnowledge,
                    FruitOfPomegranate,
                    FruitOfLuck,
                    FruitOfPowerB,
                    FruitOfArbitrariness,
                    FruitOfNumbers,
                    FruitOfRage,
                    FruitOfMacguffinA,
                    FruitOfPowerD,
                    FruitOfWatermelon,
                    FruitOfMacguffinB,
                    FruitOfQuirks,
                    FruitOfMayo,
                ]);
                if (x != value) {
                    setValue(x); //
                }
            } catch {
                // If there's an error from the old system, clean it up.
                localStorage.setItem(key, ESSerializer.serialize(fbV));
                setValue(fbV);
            }
        } else {
            setValue(fbV);
        }
    }, [fbV, key]); // eslint-disable-line
    // TODO - Fix the fact that `value` does not appear as a dependency

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored == "{}" || _.isNull(stored) || !_.isEmpty(value)) {
            localStorage.setItem(key, ESSerializer.serialize(value));
        }
    }, [key, value]);

    return [value, setValue] as const;
}
