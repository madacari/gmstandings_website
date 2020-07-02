import { MainState, initialState, ActionTypes, MatchType } from "./types";
import { Actions } from "./actions";
import { GroupType } from "../types";


export function gmstandingsReducer(state: MainState = initialState, action: Actions): MainState {
    const { playerDir, results, matchesToDisplay, matchWasPlayed } = state;

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
                playerDir: action.payload!.playerDir,
                matchesToDisplay: action.payload!.matchesToDisplay,
                results: Array(action.payload!.players.length).fill(0).map(
                    () => (Array(action.payload!.players.length).fill(0))
                    ),
                matchWasPlayed: Array(action.payload!.matchesToDisplay.length).fill(null)

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
        case ActionTypes.FILL_TABLE:
            const playedMatches = action.payload!.playedMatches
            // guarantee playedMatches.winner is defined
            const pastResults = results.slice();
            playedMatches.forEach((match: MatchType) => {
                const winnerName = match.winner.name;
                const loserName = winnerName === match.player1.name ? match.player2.name : match.player1.name;
                const trueWIndex = playerDir[winnerName];
                const trueLIndex = playerDir[loserName];
                pastResults[trueWIndex][trueLIndex] += 1;
            })
            return {...state,
                    results: pastResults,
            }
        case ActionTypes.SELECT_MATCH_WINNNER:
            const matchPlayed = matchesToDisplay[action.payload!.matchIndex]
            const winnerName = action.payload!.winnerIndex ? matchPlayed.player2.name : matchPlayed.player1.name;
            const loserName = action.payload!.winnerIndex ? matchPlayed.player1.name : matchPlayed.player2.name;
            // console.log("Winner: ", winnerName, "|Loser: ", loserName);
            const trueWIndex = playerDir[winnerName];
            const trueLIndex = playerDir[loserName];
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
            return {...state, results: newResults, matchWasPlayed: newMatchWasPlayed };
        default:
            return state;
    }
}
