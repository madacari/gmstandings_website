import axios from 'axios';
import { RegionType, GroupType } from '../types';

const url = 'https://gm-standings-api.herokuapp.com/tournament-data?season=2';
// const url = 'http://localhost:8080/tournament-data?season=2&year=2019';
const public_path = `/hsgmdata.json`;

interface ParamsType {
    year: number,
    season: number,
}

const getPlayers = async (region: RegionType, group: GroupType, params?: ParamsType)  => {
    console.log("Fetching ", url);
    const rep = await axios.get(url, ).then( response => {
        return getPlayersAux(response.data, region, group);
    })
    return rep;
}

const fakeGetPlayers = async (region: RegionType, group: GroupType) => {
    const rep = await axios.get(public_path).then(response => {
        return getPlayersAux(response.data, region, group);
    });
    return rep;
}

const getResults = async (region: RegionType, group: GroupType, params?: ParamsType) => {
    const rep = await axios.get(url).then(response => {
        return getResultsAux(response.data, region, group);
    })
    return rep;
}

const fakeGetResults = async (region: RegionType, group: GroupType) => {
    const rep = await axios.get(public_path).then(response => {
        return getResultsAux(response.data, region, group);
    });
    return rep;
}

export const Api = {
    getPlayers,
    getResults,

    fakeGetPlayers,
    fakeGetResults,
};

// 

function getStageData(data: any, region: RegionType, group: GroupType, stageNum: number = 3) {
    let reg_ix: number;
    switch (region) {
        case RegionType.APAC:
            reg_ix = 1;
            break;
        case RegionType.EU:
            reg_ix = 2;
            break;
        case RegionType.NA:
            reg_ix = 0;
            break;
        default:
            reg_ix = -1;
    }
    // Disclaimer: the current functionality only cares about Round Robin stage
    const tournament = data.requestedSeasonTournaments[reg_ix];
    const stage = tournament.stages[stageNum];
    const bracket = stage.brackets[group === GroupType.A ? 0 : 1]
    return {tournament, stage, bracket}
}

function getPlayersAux(data: any, region: RegionType, group: GroupType) {
    const {tournament, stage, bracket} = getStageData(data, region, group);
    const dataRes = {
        title: tournament.title,
        region: tournament.region,
        stage: stage.title,
        group: bracket.name,
        players: bracket.competitors.map((competitor: any) => {
            return competitor.competitor.name
        })

    }
    return dataRes;
}

function getResultsAux(data: any, region: RegionType, group: GroupType) {
    const { bracket } = getStageData(data, region, group);
    const dataRes = bracket.matches.map( (match: any) => {
            return {
                player1: { 
                    name: match.competitors[0].name,
                    },
                player2: {
                    name: match.competitors[1].name,
                },
                // scores not needed for round robin matches
                // scores: match.scores,
                // to differentiate fixtures from results check winner != null
                winner: {
                    name: match.winner.name
                },
                timeZone: match.timeZone,
                startDate: match.startDate
            }
        })
    dataRes.sort((a: any, b: any) => a.startDate - b.startDate);
    return dataRes;
}
