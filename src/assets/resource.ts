import _ from "lodash"

export type prop = [string, number][] | [string, number, number][]

export default class Resource {
    [key:string]:any
    id: number
    key: string
    name: string
    level: number
    base: {[index: string]: any}
    statnames: string[]
    constructor(id: number, key: string, name: string, level: number, props: prop) {
        this.id = id
        this.key = key
        this.name = name
        this.level = level
        this.statnames = []
        this.base = {}
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
            this[prop] = this.level * this.base[prop]
        }
    }
}

export class ResourceContainer {
    [key:string]:any
    names: string[]
    ids : number[]
    keys: string[]
    constructor(resource: Resource[]) {
        this.names = [];
        this.ids = [];
        this.keys = []
        for (var r of resource) {
            this.ids.push(r.id);
            this.keys.push(r.key)
            this.names.push(r.name)
            this[r.id] = r;
            this[r.key] = r
        }
    }
}