import React from 'react';
import { MatchSelector, StandingsTable } from './components';
import './Main.css';
// import { Players } from './types/index'
// import { Api } from './data/api'
// import { RegionType, GroupType } from './types';
// import { selectMatches, selectPlayers } from './utils';
// import { MainState } from './store/types';

class Main extends React.Component {
    // constructor(props: {}) {
    //     super(props);
    //     const defaultRegion = RegionType.APAC;
    //     const defaultGroup = GroupType.A;
    //     this.state = {
    //         regionToDisplay: defaultRegion,
    //         groupToDisplay: defaultGroup,
    //         players: [],
    //         matches: [],
    //         results: [],
    //         matchWasPlayed: []
    //     }
    // }

    // componentDidMount() {
    //     console.log("INIT", this.state.results);
    //     Api.getPlayers(this.state.regionToDisplay, this.state.groupToDisplay).then((response) => {
    //         const players = response.players;
    //         const matches = selectMatches(players);
    //         const results = Array(players.length).fill(0).map(() => (Array(players.length).fill(0)));
    //         const matchWasPlayed = Array(matches.length).fill(null);
    //         this.setState({
    //             players: players,
    //             matches: matches,
    //             results: results,
    //             matchWasPlayed: matchWasPlayed
    //         });
    //     }).catch(error => {
    //         console.error(error);
    //     })
        // const players = selectPlayers(this.state.regionToDisplay, this.state.groupToDisplay);
        // const matches = selectMatches(players);
        // const results = Array(players.length).fill(0).map(() => (Array(players.length).fill(0)));
        // const matchWasPlayed = Array(matches.length).fill(null);
        // this.setState({
        //     matches: matches,
        //     results: results,
        //     matchWasPlayed: matchWasPlayed
        // })
    // }

    render() {
        return (
            <div className="standings-simulator">
                <div className="standings-table">
                    <StandingsTable />
                </div>
                <div className="match-selector">
                    <MatchSelector />
                </div>
            </div>
        );
    }

}

export default Main;
