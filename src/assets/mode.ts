export const GameMode: { [key: string]: number } = {
    ALL: -1,
    NORMAL: 0,
    EVIL: 1,
    SADISTIC: 2,
} as const satisfies { [key: string]: number };

export const ALL_GAME_MODES: number[] = [GameMode.NORMAL, GameMode.EVIL, GameMode.SADISTIC];
