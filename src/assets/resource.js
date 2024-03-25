import _ from "lodash"

export default class Resource {
    constructor(id, name, level, props = []) {
        this.id = id
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
    setLevel(level) {
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
    constructor(resource) {
        this.names = [];
        for (let i = 0; i < resource.length; i++) {
            this.names.push(resource[i][0]);
            this[resource[i][0]] = resource[i][1];
        }
    }
}