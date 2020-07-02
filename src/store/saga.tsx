import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { Api } from '../data/api'
import { getCurrentRegion, getCurrentGroup } from './selectors';
import {  selectMatches } from '../utils';
import { ACTIONS } from './actions';
import { ActionTypes } from './types';

function* fetchDataRequest() {
    try {
        const currentRegion = yield select(getCurrentRegion);
        const currentGroup = yield select(getCurrentGroup);
        const playersData = yield call(Api.fakeGetPlayers, currentRegion, currentGroup);
        const players = playersData.players;
        const matches = selectMatches(players);
        // console.log('feching players');
        // const playersData = yield call(Api.fakeGetPlayers, selectedRegion, GroupType.A);
        // const players = playersData.players;
        // console.log(players)
        // const resultsData = yield call(Api.fakeGetResults,selectedRegion, GroupType.A);
        // const allMatches = resultsData.filter()

        // const players = selectPlayers(selectedRegion, GroupType.A);
        yield put(ACTIONS.fetchDataSuccess({ players: players, matches: matches }))
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
