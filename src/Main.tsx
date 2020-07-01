import React from 'react';
import {MatchSelector} from './components';
import StandingsTable from './components/StandingsTable';
import './Main.css';
// import { Players } from './types/index'
import { Api } from './data/api'
import { RegionType, GroupType } from './types';
import { selectMatches, selectPlayers } from './utils';


interface MainState {
    regionToDisplay: RegionType;
    groupToDisplay: GroupType;
    players: string[]
    matches: string[][];
    results: number[][];
    matchWasPlayed: (number|null)[];
}

class Main extends React.Component<{},MainState> {
    constructor(props: {}) {
        super(props);
        const defaultRegion = RegionType.APAC;
        const defaultGroup = GroupType.A;
        this.state = {
            regionToDisplay: defaultRegion,
            groupToDisplay: defaultGroup,
            players: [],
            matches: [],
            results: [],
            matchWasPlayed: []
        }
    }

    componentDidMount() {
        console.log("INIT", this.state.results);
        Api.getPlayers(this.state.regionToDisplay, this.state.groupToDisplay).then((response) => {
            const players = response.players;
            const matches = selectMatches(players);
            const results = Array(players.length).fill(0).map(() => (Array(players.length).fill(0)));
            const matchWasPlayed = Array(matches.length).fill(null);
            this.setState({
                players: players,
                matches: matches,
                results: results,
                matchWasPlayed: matchWasPlayed
            });
        }).catch(error => {
            console.error(error);
        })
        // const players = selectPlayers(this.state.regionToDisplay, this.state.groupToDisplay);
        // const matches = selectMatches(players);
        // const results = Array(players.length).fill(0).map(() => (Array(players.length).fill(0)));
        // const matchWasPlayed = Array(matches.length).fill(null);
        // this.setState({
        //     matches: matches,
        //     results: results,
        //     matchWasPlayed: matchWasPlayed
        // })
    }

    componentDidUpdate() {
        console.log("UPDATE", this.state.results);
    }

    handleClickRegion = (region: RegionType) => {
        if (this.state.regionToDisplay !== region) {
            const players = selectPlayers(region, GroupType.A);
            const matches = selectMatches(players);
            this.setState({
                // reset view
                groupToDisplay: GroupType.A,
                results: Array(players.length).fill(0).map(() => (Array(players.length).fill(0))),
                matchWasPlayed: Array(matches.length).fill(null),
                // update info
                regionToDisplay: region,
                players: players,
                matches: matches

            });
        }
    }

    handleClickGroup = (group: GroupType) => {
        if (this.state.groupToDisplay !== group) {
            const players = selectPlayers(this.state.regionToDisplay, group);
            const matches = selectMatches(players);
            this.setState({
                // reset view
                results: Array(players.length).fill(0).map(() => (Array(players.length).fill(0))),
                matchWasPlayed: Array(matches.length).fill(null),
                // update info
                groupToDisplay: group ,
                players: players,
                matches: matches,
            });
        }
    }

    handleClickMatch = (matchIndex: number, wIndex: number) => {
        // setup
        const { players, results, matches, matchWasPlayed } = this.state;
        // playerDir maps the name to the index in [0..players.length-1]
        const playerDir = players.reduce((acc: any, cur: string, idx: number) => {
            acc[cur] = idx;
            return acc;
        }, {});
        // trueWIndex and trueLindex in [0..players.length-1] 
        const trueWIndex = playerDir[matches[matchIndex][wIndex]];
        const trueLIndex = playerDir[matches[matchIndex][+!wIndex]];;
        // objects for new state
        const newResults = results.slice();
        const newMatchWasPlayed = matchWasPlayed.slice();

        // state changes
        // a result for this match was already input
        if (matchWasPlayed[matchIndex] != null) {
            // the same button is clicked twice (i.e. unclicked) -> revert changes
            if (matchWasPlayed[matchIndex] === wIndex) {    
                newResults[trueWIndex][trueLIndex] -= 1;
                newMatchWasPlayed[matchIndex] = null;
             // the other match is chosen -> update changes accordingly
            } else {
                newResults[trueLIndex][trueWIndex] -= 1;
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[matchIndex] = wIndex;
            }
        // if no result was recorded
        } else {
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[matchIndex] = wIndex;
        }
        this.setState({
            results: newResults,
            matchWasPlayed: newMatchWasPlayed,
        });
    }

    render() {
        const {players, results, matches} = this.state;
        return (
            <div className="standings-simulator">
                <div className="standings-table">
                    <StandingsTable 
                        // in case of undefined
                        players={players}
                        results={results}
                        onClickRegion={this.handleClickRegion}
                        onClickGroup={this.handleClickGroup}
                    />
                </div>
                <div className="match-selector">
                    <MatchSelector />
                </div>
            </div>
        );
    }

}

export default Main;
