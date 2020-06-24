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

export type Players = APACPlayers & EUPlayers & NAPlayers;
