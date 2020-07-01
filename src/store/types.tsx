import { RegionType, GroupType } from "../types";

export interface MainState {
    regionToDisplay: RegionType;
    groupToDisplay: GroupType;
    players: string[]
    matches: string[][];
    results: number[][];
    matchWasPlayed: (number | null)[];
}

export const initialState: MainState = {
    regionToDisplay: RegionType.APAC,
    groupToDisplay: GroupType.A,
    players: [],
    matches: [],
    results: [],
    matchWasPlayed: [],
}

export const SELECT_REGION = 'SELECT_REGION';
export const SELECT_GROUP = 'SELECT_GROUP';

export interface RegionSelection {
    type: typeof SELECT_REGION,
    region: RegionType
}

export interface GroupSelection {
    type: typeof SELECT_GROUP,
    group: GroupType
}

export type SelectionActionTypes = RegionSelection | GroupSelection;

export const SELECT_MATCH_WINNNER = 'SELECT_MATCH_WINNER';

export interface MatchWinnerSelection {
    type: typeof SELECT_MATCH_WINNNER,
    matchIndex: number,
    // between 0 and 1
    winnerIndex: number
}
