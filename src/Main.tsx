import React from 'react';
import MatchSelector from './components/MatchSelector';
import StandingsTable from './components/StandingsTable';
import './Main.css';
// import { Players } from './types/index'


interface MainState {
    regionToDisplay: string;
    groupToDisplay: string;
    players: string[]
    matches: string[][];
    results: number[][];
    matchWasPlayed: number[];
}

class Main extends React.Component<{},MainState> {
    constructor(props: {}) {
        super(props);
        const defaultRegion = "APAC";
        const defaultGroup = "A";
        const players = selectPlayers(defaultRegion, defaultGroup);
        const matches = selectMatches(players);
        this.state = {
            regionToDisplay: defaultRegion,
            groupToDisplay: defaultGroup,
            players: players,
            matches: matches,
            results: Array(players.length).fill(null).map(()=>(Array(players.length).fill(0))),
            matchWasPlayed: Array(matches.length).fill(null)
        }
    }

    componentDidMount() {
        console.log(this.state.results);
    }

    componentDidUpdate() {
        console.log(this.state.results);
    }

    handleClickRegion = (region: string) => {
        if (this.state.regionToDisplay !== region) {
            const players = selectPlayers(region, 'A');
            const matches = selectMatches(players);
            this.setState({
                // reset view
                groupToDisplay: 'A',
                results: Array(players.length).fill(null).map(() => (Array(players.length).fill(0))),
                matchWasPlayed: Array(matches.length).fill(null),
                // update info
                regionToDisplay: region,
                players: players,
                matches: matches

            });
        }
    }

    handleClickGroup = (group: string) => {
        if (this.state.groupToDisplay !== group) {
            const players = selectPlayers(this.state.regionToDisplay, group);
            const matches = selectMatches(players);
            this.setState({
                // reset view
                results: Array(players.length).fill(null).map(() => (Array(players.length).fill(0))),
                matchWasPlayed: Array(matches.length).fill(null),
                // update info
                groupToDisplay: group ,
                players: players,
                matches: matches,
            });
        }
    }

    handleClickMatch = (mIndex: number, wIndex: number) => {
        const { players, results, matches, matchWasPlayed } = this.state;
        if (matchWasPlayed[mIndex] != null && matchWasPlayed[mIndex] === wIndex) {
            return
        } 
        // else, new results or change in result
        // update results
        const playerDir = players.reduce((acc: any, cur:string, idx: number) => {
            acc[cur] = idx;
            return acc;
        }, {});
        const newResults = results.slice();
        const trueWIndex = playerDir[matches[mIndex][wIndex]];
        const trueLIndex = playerDir[matches[mIndex][+!wIndex]];;
        newResults[trueWIndex][trueLIndex] = 1;
        newResults[trueLIndex][trueWIndex] = 0;
        // update matchWasPlayed
        const newMWP = matchWasPlayed.slice();
        newMWP[mIndex] = wIndex;
        this.setState({
            results: newResults,
            matchWasPlayed: newMWP
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

function selectPlayers(regionToDisplay: string, groupToDisplay: string): string[] {
    // Choose region
    let playerReg;
    switch (regionToDisplay) {
        case "NA":
            playerReg = allPlayers.NA;
            break;
        case "EU":
            playerReg = allPlayers.EU;
            break;
        default:
            playerReg = allPlayers.APAC;
    }
    // Choose group
    let players;
    switch (groupToDisplay) {
        case "B":
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
