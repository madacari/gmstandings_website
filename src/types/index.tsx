type Groups = {
    divA: string[],
    divB: string[]
}

type NAPlayers = {
    NA: Groups
}

type EUPlayers = {
    EU: Groups
}

type APACPlayers = {
    APAC: Groups
}

type TableFormat = {
    player: string,
    played: number,
    wins: number,
    tb: number
}

export default TableFormat;
export type Players = APACPlayers & EUPlayers & NAPlayers;
