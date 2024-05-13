export const GameMode : {[key: string]: number} = {
    ALL: 4,
    NORMAL: 0,
    EVIL: 1,
    SADISTIC: 2,
} as const satisfies {[key: string]: number};