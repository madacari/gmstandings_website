import { MainState, initialState, SELECT_MATCH_WINNNER } from "./types";
// import { RegionType, GroupType, } from "../types";
import { SelectionActionTypes, SELECT_REGION, SELECT_GROUP, MatchWinnerSelection } from "./types";

export function gmstandingsReducer(state: MainState = initialState, action: SelectionActionTypes|MatchWinnerSelection): MainState {
    switch (action.type) {
        // case SELECT_REGION:
            // return {...state, regionToDisplay: action.region};
        // case SELECT_GROUP:
            // return {...state, groupToDisplay: action.group};
        case SELECT_MATCH_WINNNER:
            const { players, results, matches, matchWasPlayed } = state;
            const playerDir = players.reduce((acc: any, cur: string, idx: number) => {
                acc[cur] = idx;
                return acc;
            }, {});

            // trueaction.winnerIndex and trueLindex in [0..players.length-1] 
            const trueWIndex = playerDir[matches[action.matchIndex][action.winnerIndex]];
            const trueLIndex = playerDir[matches[action.matchIndex][+!action.winnerIndex]];;
            // objects for new state
            const newResults = results.slice();
            const newMatchWasPlayed = matchWasPlayed.slice();

            // state changes
            // a result for this match was already input
            if (matchWasPlayed[action.matchIndex] != null) {
                // the same button is clicked twice (i.e. unclicked) -> revert changes
                if (matchWasPlayed[action.matchIndex] === action.winnerIndex) {
                    newResults[trueWIndex][trueLIndex] -= 1;
                    newMatchWasPlayed[action.matchIndex] = null;
                    // the other match is chosen -> update changes accordingly
                } else {
                    newResults[trueLIndex][trueWIndex] -= 1;
                    newResults[trueWIndex][trueLIndex] += 1;
                    newMatchWasPlayed[action.matchIndex] = action.winnerIndex;
                }
                // if no result was recorded
            } else {
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[action.matchIndex] = action.winnerIndex;
            }
            return { ...state, results: newResults, matchWasPlayed: newMatchWasPlayed };
        default:
            return state;
    }
}
