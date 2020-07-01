// Regions and groups
export enum RegionType {
    NA = 'NA',
    APAC = 'APAC', 
    EU = 'EU'
}

export enum GroupType {
    A = 'A',
    B = 'B'
}

export type TableSelectorType = RegionType | GroupType;

// Other

type GroupMembers = {
    divA: string[],
    divB: string[]
}

type NAPlayers = {
    NA: GroupMembers
}

type EUPlayers = {
    EU: GroupMembers
}

type APACPlayers = {
    APAC: GroupMembers
}

type TableFormat = {
    player: string,
    played: number,
    wins: number,
    tb: number
}

export default TableFormat;
export type Players = APACPlayers & EUPlayers & NAPlayers;
