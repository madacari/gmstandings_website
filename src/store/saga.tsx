import { call, put, takeEvery, takeLatest, select, all } from 'redux-saga/effects'
// import { Api } from '../data/api'
import { getCurrentRegion, getCurrentGroup } from './selectors';
import { selectPlayers, selectMatches } from '../utils';
import { GroupType } from '../types';
import { ACTIONS } from './actions';
import { ActionTypes } from './types';


function* fetchDataFromRegionRequest(params: any) {
    try {
        const currentRegion = yield select(getCurrentRegion);
        const selectedRegion = params.payload.region;
        console.log("Current region:", currentRegion, ' vs ', selectedRegion);
        if (currentRegion !== selectedRegion) {
            const players = selectPlayers(params.payload.region, GroupType.A);
            const matches = selectMatches(players);
            yield put(ACTIONS.fetchDataFromRegionSuccess());
            yield put(ACTIONS.fetchDataSuccess({players: players, matches: matches}))
            yield put(ACTIONS.selectRegion({region: selectedRegion}))
        }
    } catch (error) {
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
            const players = selectPlayers(currentRegion, selectedGroup);
            const matches = selectMatches(players);
            yield put(ACTIONS.fetchDataFromGroupSuccess());
            yield put(ACTIONS.fetchDataSuccess({ players: players, matches: matches }))
            yield put(ACTIONS.selectGroup({group: selectedGroup}))
        }
    } catch (error) {
        yield put(ACTIONS.fetchDataFromGroupFailure());
    }
}

export function* helloSaga() {
    console.log('Hello Sagas!')
}

function* gmstandingsSaga() {
    yield all([
        helloSaga(),
        yield takeLatest(ActionTypes.FETCH_DATA_FROM_REGION_REQUEST, fetchDataFromRegionRequest),
        yield takeLatest(ActionTypes.FETCH_DATA_FROM_GROUP_REQUEST, fetchDataFromGroupRequest),
    ])
}

export default gmstandingsSaga;
