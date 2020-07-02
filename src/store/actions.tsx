// https://github.com/sebastien-lb/alfred-face/blob/master/src/store/utils.ts

import { RegionRequestPayload, ActionTypes, FetchDataSuccessPayload, GroupRequestPayload, MatchWinnerPayload } from "./types";
import { ActionCreatorsMapObject } from 'redux';

// action creator types
export interface IAction<T extends string> {
    type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
    payload?: P;
}

// action creators
export function createAction<T extends string>(type: T): IAction<T>
export function createAction<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P): IActionWithPayload<T, P> {
    return payload === undefined ? { type } : { type, payload };
}


export const ACTIONS = {
    fetchDataFromRegionRequest: (payload: RegionRequestPayload) => createAction(ActionTypes.FETCH_DATA_FROM_REGION_REQUEST, payload),
    fetchDataFromRegionSuccess: () => createAction(ActionTypes.FETCH_DATA_FROM_REGION_SUCCESS, ),
    fetchDataFromRegionFailure: () => createAction(ActionTypes.FETCH_DATA_FROM_REGION_FAILURE),

    fetchDataFromGroupRequest: (payload: GroupRequestPayload) => createAction(ActionTypes.FETCH_DATA_FROM_GROUP_REQUEST, payload),
    fetchDataFromGroupSuccess: () => createAction(ActionTypes.FETCH_DATA_FROM_GROUP_SUCCESS, ),
    fetchDataFromGroupFailure: () => createAction(ActionTypes.FETCH_DATA_FROM_GROUP_FAILURE),

    fetchDataRequest: () => createAction(ActionTypes.FETCH_DATA_REQUEST),
    fetchDataSuccess: (payload: FetchDataSuccessPayload) => createAction(ActionTypes.FETCH_DATA_SUCCESS, payload),

    selectRegion: (payload: RegionRequestPayload) => createAction(ActionTypes.SELECT_REGION, payload),
    selectGroup: (payload: GroupRequestPayload) => createAction(ActionTypes.SELECT_GROUP, payload),

    selectMatchWinner: (payload: MatchWinnerPayload) => createAction(ActionTypes.SELECT_MATCH_WINNNER, payload)
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
export type Actions = ActionsUnion<typeof ACTIONS>;
