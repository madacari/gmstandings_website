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
    results: string;
}

class Main extends React.Component<{},MainState> {
    constructor(props: {}) {
        super(props);
        const defaultRegion = "APAC";
        const defaultGroup = "A";
        const players = selectPlayers(defaultRegion, defaultGroup);
        this.state = {
            regionToDisplay: defaultRegion,
            groupToDisplay: defaultGroup,
            players: players,
            matches: selectMatches(players),
            results: ""
        }
    }

    handleClickRegion(region: string) {
        if (this.state.regionToDisplay !== region) {
            const players = selectPlayers(region, 'A');
            this.setState({
                // reset view
                groupToDisplay: 'A',
                results: "",
                // update info
                regionToDisplay: region,
                players: players,
                matches: selectMatches(players),

            });
        }
    }

    handleClickGroup(group: string) {
        if (this.state.groupToDisplay !== group) {
            const players = selectPlayers(this.state.regionToDisplay, group);
            this.setState({ 
                // reset view
                results: "",
                // update info
                groupToDisplay: group ,
                players: players,
                matches: selectMatches(players),
            });
        }
    }

    handleClickMatch(mIndex: number, wIndex: number) {
        this.setState({
            results: 
                this.state.results + 
                this.state.matches[mIndex][wIndex] + " beat " + 
                this.state.matches[mIndex][+!wIndex] + ". \n"
        });
    }

    render() {
        return (
            <div className="standings-simulator">
                <div className="standings-table">
                    <StandingsTable 
                        // in case of undefined
                        players={this.state.players}
                        results={this.state.results}
                        onClickRegion={(region) => this.handleClickRegion(region)}
                        onClickGroup={(group) => this.handleClickGroup(group)}
                    />
                </div>
                <div className="match-selector">
                    <MatchSelector 
                    matches = {this.state.matches}
                    onClickMatch={(mIndex, wIndex) => this.handleClickMatch(mIndex, wIndex)}/>
                </div>
            </div>
        );
    }

}

export default Main;

const allPlayers = {
    APAC: {
        divA: ['glory', 'Surrender', 'Posesi'],
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
    var playerReg;
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
    var matches = [];
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
