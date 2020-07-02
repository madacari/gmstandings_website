import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { Api } from '../data/api'
import { getCurrentRegion, getCurrentGroup } from './selectors';
import { ACTIONS } from './actions';
import { ActionTypes, MatchType } from './types';

function* fetchDataRequest() {
    try {
        const currentRegion = yield select(getCurrentRegion);
        const currentGroup = yield select(getCurrentGroup);
        
        const playersData = yield call(Api.fakeGetPlayers, currentRegion, currentGroup);
        const players = playersData.players;
        const playerDir = players.reduce((acc: any, cur: string, idx: number) => {
            acc[cur] = idx;
            return acc;
        }, {});

        const allMatches = yield call(Api.fakeGetResults, currentRegion, currentGroup);
        const matchesLeft = allMatches.filter(matchLeftToPlay);
        const playedMatches = allMatches.filter(matchPlayed);
        yield put(ACTIONS.fetchDataSuccess({ players: players, playerDir: playerDir, matchesToDisplay: matchesLeft,  }))
        // requires playerDir
        yield put(ACTIONS.fillTable({ playedMatches: playedMatches}))
    } catch (error) {
        console.error("Error:", error);
    }
}

function* fetchDataFromRegionRequest(params: any) {
    try {
        const currentRegion = yield select(getCurrentRegion);
        const selectedRegion = params.payload.region;
        console.log("Current region:", currentRegion, ' vs ', selectedRegion);
        if (currentRegion !== selectedRegion) {
            yield put(ACTIONS.selectRegion({region: selectedRegion}))
            yield put(ACTIONS.fetchDataRequest());
            yield put(ACTIONS.fetchDataFromRegionSuccess());
        }
    } catch (error) {
        console.error("Error ", error);
        yield put(ACTIONS.fetchDataFromRegionFailure());
    }
}

function* fetchDataFromGroupRequest(params: any) {
    try {
        const currentGroup = yield select(getCurrentGroup);
        const selectedGroup = params.payload.group;
        const currentRegion = yield select(getCurrentRegion);
        console.log("Current group:", currentGroup, ' vs ', selectedGroup);
        if (currentRegion !== selectedGroup) {
            yield put(ACTIONS.selectGroup({group: selectedGroup}))
            yield put(ACTIONS.fetchDataRequest());
            yield put(ACTIONS.fetchDataFromGroupSuccess());
        }
    } catch (error) {
        console.error("Error ", error);
        yield put(ACTIONS.fetchDataFromGroupFailure());
    }
}

function* gmstandingsSaga() {
    yield all([
        yield takeLatest(ActionTypes.FETCH_DATA_REQUEST, fetchDataRequest),
        yield takeLatest(ActionTypes.FETCH_DATA_FROM_REGION_REQUEST, fetchDataFromRegionRequest),
        yield takeLatest(ActionTypes.FETCH_DATA_FROM_GROUP_REQUEST, fetchDataFromGroupRequest),
    ])
}

export default gmstandingsSaga;

// helpers

// artificially simulating an ongoing competition
const LIMIT = 21;

function matchPlayed(match: MatchType, index: number) {
    return (match.winner !== undefined) && (index < LIMIT);
}

function matchLeftToPlay(match: MatchType, index: number) {
    return (match.winner === undefined) || (index >= LIMIT);
}
