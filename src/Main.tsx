import React from 'react';
import MatchSelector from './components/MatchSelector';
import StandingsTable from './components/StandingsTable';
import './Main.css';
// import { Players } from './types/index'
import { Api } from './data/api'
import { RegionType, GroupType } from './types';


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

    handleClickMatch = (mIndex: number, wIndex: number) => {
        // setup
        const { players, results, matches, matchWasPlayed } = this.state;
        // playerDir maps the name to the index in [0..players.length-1]
        const playerDir = players.reduce((acc: any, cur: string, idx: number) => {
            acc[cur] = idx;
            return acc;
        }, {});
        // trueWIndex and trueLindex in [0..players.length-1] 
        const trueWIndex = playerDir[matches[mIndex][wIndex]];
        const trueLIndex = playerDir[matches[mIndex][+!wIndex]];;
        // objects for new state
        const newResults = results.slice();
        const newMatchWasPlayed = matchWasPlayed.slice();

        // state changes
        // a result for this match was already input
        if (matchWasPlayed[mIndex] != null) {
            // the same button is clicked twice (i.e. unclicked) -> revert changes
            if (matchWasPlayed[mIndex] === wIndex) {    
                newResults[trueWIndex][trueLIndex] -= 1;
                newMatchWasPlayed[mIndex] = null;
             // the other match is chosen -> update changes accordingly
            } else {
                newResults[trueLIndex][trueWIndex] -= 1;
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[mIndex] = wIndex;
            }
        // if no result was recorded
        } else {
                newResults[trueWIndex][trueLIndex] += 1;
                newMatchWasPlayed[mIndex] = wIndex;
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
                    <MatchSelector 
                    matches = {matches}
                    // onClickMatch={(mIndex, wIndex) => this.handleClickMatch(mIndex, wIndex)}/>
                    onClickMatch={this.handleClickMatch}
                />
                </div>
            </div>
        );
    }

}

export default Main;

const allPlayers = {
    APAC: {
        divA: ['glory', 'Surrender', 'Posesi', 'Ryvius', 'Alutemu'],
        divB: ['Staz', 'tom60229', 'blitzchung']
    },
    EU: {
        divA: ['Swidz', 'Bunnyhoppor', 'Jarla'],
        divB: ['Bozzzton', 'Zhym', 'Viper']
    },
    NA: {
        divA: ['Gallon', 'bloodyface', 'Nalguidan'],
        divB: ['PNC', 'Fr0zen', 'Purple']
    },
}

function selectPlayers(regionToDisplay: RegionType, groupToDisplay: GroupType): string[] {
    // Choose region
    let playerReg;
    switch (regionToDisplay) {
        case RegionType.NA:
            playerReg = allPlayers.NA;
            break;
        case RegionType.EU:
            playerReg = allPlayers.EU;
            break;
        default:
            playerReg = allPlayers.APAC;
    }
    // Choose group
    let players;
    switch (groupToDisplay) {
        case GroupType.B:
            players = playerReg.divB;
            break;
        default:
            players = playerReg.divA;
    }
    return players;
}

function selectMatches(players: string[]): string[][] {
    let matches = [];
    // make all combinations without repetition of players (i.e possible matches)
    // https://gist.github.com/axelpale/3118596
    for (let i = 0; i < players.length + 1; i++) {
        // head is a list that includes only our current element.
        var head = players.slice(i, i + 1);
        // We take smaller combinations from the subsequent elements
        var tailcombs = [];
        for (let j = i + 1; j < players.length; j++) {
            tailcombs.push([players[j]])
        }
        // we join it with the current
        // and store it to the set of k-combinations.
        for (let j = 0; j < tailcombs.length; j++) {
            matches.push(head.concat(tailcombs[j]));
        }
    }

    return matches;
}
