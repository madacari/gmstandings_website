import { MainState, initialState, ActionTypes } from "./types";
import { Actions } from "./actions";
import { GroupType } from "../types";


export function gmstandingsReducer(state: MainState = initialState, action: Actions): MainState {
    switch (action.type) {
        case ActionTypes.FETCH_DATA_FROM_REGION_REQUEST:
        case ActionTypes.FETCH_DATA_FROM_REGION_SUCCESS:
        case ActionTypes.FETCH_DATA_FROM_REGION_FAILURE:
        case ActionTypes.FETCH_DATA_FROM_GROUP_REQUEST:
        case ActionTypes.FETCH_DATA_FROM_GROUP_SUCCESS:
        case ActionTypes.FETCH_DATA_FROM_GROUP_FAILURE:
        case ActionTypes.FETCH_DATA_REQUEST:
            return state
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                players: action.payload!.players,
                matches: action.payload!.matches,
                results: Array(action.payload!.players.length).fill(0).map(
                    () => (Array(action.payload!.players.length).fill(0))
                    ),

            }
        case ActionTypes.SELECT_REGION:
            return {
                ...state,
                regionToDisplay: action.payload!.region,
                groupToDisplay: GroupType.A
            }
        case ActionTypes.SELECT_GROUP:
            return {
                ...state,
                groupToDisplay: action.payload!.group,
            }
        case ActionTypes.SELECT_MATCH_WINNNER:
            const { players, results, matches, matchWasPlayed } = state;
            const playerDir = players.reduce((acc: any, cur: string, idx: number) => {
                acc[cur] = idx;
                return acc;
            }, {});

            // trueaction.winnerIndex and trueLindex in [0..players.length-1] 
            const trueWIndex = playerDir[matches[action.payload!.matchIndex][action.payload!.winnerIndex]];
            const trueLIndex = playerDir[matches[action.payload!.matchIndex][+!action.payload!.winnerIndex]];;
            // objects for new state
            const newResults = results.slice();
            const newMatchWasPlayed = matchWasPlayed.slice();

            // state changes
            // a result for this match was already input
            if (matchWasPlayed[action.payload!.matchIndex] != null) {
                // the same button is clicked twice (i.e. unclicked) -> revert changes
                if (matchWasPlayed[action.payload!.matchIndex] === action.payload!.winnerIndex) {
                    newResults[trueWIndex][trueLIndex] -= 1;
                    newMatchWasPlayed[action.payload!.matchIndex] = null;
                    // the other match is chosen -> update changes accordingly
                } else {
                    newResults[trueLIndex][trueWIndex] -= 1;
                    newResults[trueWIndex][trueLIndex] += 1;
                    newMatchWasPlayed[action.payload!.matchIndex] = action.payload!.winnerIndex;
                }
                // if no result was recorded
            } else {
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[action.payload!.matchIndex] = action.payload!.winnerIndex;
            }
            return { ...state, results: newResults, matchWasPlayed: newMatchWasPlayed };
        default:
            return state;
    }
}
