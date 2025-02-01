import bigDecimal from "js-big-decimal"
import _ from "lodash"
import { toNum } from "@/helpers/numbers"


export type prop = [string, number][] | [string, number, number][]

export default class Resource {
    [key:string]:any
    id: number
    key: string
    name: string
    mode: number
    level: number
    progress: number
    base: {[index: string]: any}
    statnames: string[]
    constructor(id: number, key: string, name: string, mode: number, level: number, props: prop) {
        this.id = id
        this.key = key
        this.name = name
        this.mode = mode
        this.level = level
        this.statnames = []
        this.base = {}
        this.progress = 0
        for (let i = 0; i < props.length; i++) {
            this.statnames.push(props[i][0]);
            this.base[props[i][0]] = props[i][1]
        }
        this.updateStats()
    }
    setLevel(level: number) {
        this.level = level
        this.updateStats()
    }
    updateStats() {
        for (var prop of Object.keys(this.base)) {
            this[prop] = (this.level > 0) ?  this.base[prop] : 0
        }
    }
    //@ts-ignore
    getStatValue(prop: string, level : number = -1) : number {
        if(!_.isUndefined(this[prop])) {
            return this[prop]
        }
        return 0
    }
    appliesToGameMode(gameMode : number | bigDecimal) : boolean {
        gameMode = toNum(gameMode)
        return this.mode <= gameMode
    }
    setProgress(progress: number) {
        if (progress > 1 || progress < 0) {
            console.log("Bad Progress", progress, this.key)
        }
        this.progress = progress
    }
    progressLeft() : number {
        return 1 - this.progress
    }
}

export class ResourceContainer {
    [key:string]:any
    names: string[]
    ids : number[]
    keys: string[]
    // modes  : {[key: number] : {[key: string] : Resource}}
    constructor(resource: Resource[]) {
        this.names = [];
        this.ids = [];
        this.keys = [];
        // this.modes = {}
        // this.modes[GameMode.ALL] = {};
        // this.modes[GameMode.NORMAL] = {};
        // this.modes[GameMode.EVIL] = {};
        // this.modes[GameMode.SADISTIC] = {};
        
        for (var r of resource) {
            this.ids.push(r.id);
            this.keys.push(r.key)
            this.names.push(r.name)
            this[r.id] = r;
            // this.modes[r.mode][r.key] = r
        }
    }
    getByKey(key : string) : Resource | undefined{
        let chosenId = -1;
        this.ids.forEach((id) => {
            if (this[id].key == key) {
                chosenId = id;
            }
        })
        if (chosenId >= 0) {
            return this[chosenId]
        }
        return undefined;
    }
}