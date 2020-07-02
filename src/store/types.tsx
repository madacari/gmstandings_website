import { RegionType, GroupType } from "../types";

export interface PlayerType {
    name: string
}

export interface MatchType {
    player1: PlayerType,
    player2: PlayerType,
    winner: PlayerType,
    timeZone: string,
    startDate: Date
}

export interface MainState {
    regionToDisplay: RegionType;
    groupToDisplay: GroupType;
    players: string[];
    playerDir: any;
    matchesToDisplay: MatchType[];
    results: number[][];
    matchWasPlayed: (number | null)[];
}

export const initialState: MainState = {
    regionToDisplay: RegionType.APAC,
    groupToDisplay: GroupType.A,
    players: [],
    playerDir: {},
    matchesToDisplay: [],
    results: [],
    matchWasPlayed: [],
}

export enum ActionTypes {
    FETCH_DATA_FROM_REGION_REQUEST = 'FETCH_DATA_FROM_REGION_REQUEST',
    FETCH_DATA_FROM_REGION_SUCCESS = 'FETCH_DATA_FROM_REGION_SUCCESS',
    FETCH_DATA_FROM_REGION_FAILURE = 'FETCH_DATA_FROM_REGION_FAILURE',

    FETCH_DATA_FROM_GROUP_REQUEST = 'FETCH_DATA_FROM_GROUP_REQUEST',
    FETCH_DATA_FROM_GROUP_SUCCESS = 'FETCH_DATA_FROM_GROUP_SUCCESS',
    FETCH_DATA_FROM_GROUP_FAILURE = 'FETCH_DATA_FROM_GROUP_FAILURE',

    FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',

    SELECT_REGION = 'SELECT_REGION',
    SELECT_GROUP = 'SELECT_GROUP',

    SELECT_MATCH_WINNNER = 'SELECT_MATCH_WINNER',
    FILL_TABLE = "FILL_TABLE",
}

// Payload interfaces

export interface RegionRequestPayload {
    region: RegionType
}

export interface GroupRequestPayload {
    group: GroupType
}

export interface FetchDataSuccessPayload {
    players: string[],
    playerDir: any,
    matchesToDisplay: MatchType[]
}

export interface MatchWinnerPayload {
    matchIndex: number,
    // between 0 and 1
    winnerIndex: number
}

export interface TableFillPayload {
    playedMatches: MatchType[],   
}
