export const GameMode : {[key: string]: number} = {
    ALL: 0,
    NORMAL: 1,
    EVIL: 2,
    SADISTIC: 3,
} as const satisfies {[key: string]: number};