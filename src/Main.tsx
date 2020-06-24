import React from 'react';
// import MatchSelector from './components/MatchSelector';
import StandingsTable from './components/StandingsTable';
import './Main.css';
import { Players } from './types/index'


interface MainState {
    players: Players,
    regionToDisplay: string;
    groupToDisplay: string;
}

class Main extends React.Component<{},MainState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            players: {
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
            },
            regionToDisplay: "APAC",
            groupToDisplay: "A"
        }
    }

    handleClickRegion(region: string) {
        this.setState({ regionToDisplay: region });
    }

    handleClickGroup(group: string) {
        this.setState({ groupToDisplay: group });
    }

    selectPlayers(): string[] {
        // Choose region
        let playerReg;
        switch (this.state.regionToDisplay) {
            case "NA":
                playerReg = this.state.players.NA;
                break;
            case "EU":
                playerReg = this.state.players.EU;
                break;
            default:
                playerReg = this.state.players.APAC;
        }
        // Choose group
        let players;
        switch (this.state.groupToDisplay) {
            case "B":
                players = playerReg.divB;
                break;
            default:
                players = playerReg.divA;
        }
        return players;
    }

    render() {
        const players = this.selectPlayers();

        return (
            <div className="standings-simulator">
                <div className="standings-table">
                    <StandingsTable 
                        players={players}
                        onClickRegion={(region) => this.handleClickRegion(region)}
                        onClickGroup={(group) => this.handleClickGroup(group)}
                    />
                </div>
                {/* <div className="match-selector"> */}
                    {/* <MatchSelector /> */}
                {/* </div> */}
            </div>
        );
    }

}

export default Main;
