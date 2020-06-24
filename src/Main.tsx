import React from 'react';
// import MatchSelector from './components/MatchSelector';
import StandingsTable from './components/StandingsTable';
import './Main.css';
import { Players } from './types/index'


interface MainState {
    players: Players,
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
        }
    }

    render() {
        return (
            <div className="standings-simulator">
                <div className="standings-table">
                    <StandingsTable players={this.state.players}/>
                </div>
                {/* <div className="match-selector"> */}
                    {/* <MatchSelector /> */}
                {/* </div> */}
            </div>
        );
    }

}

export default Main;
