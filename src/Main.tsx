import React from 'react';
import MatchSelector from './components/MatchSelector';
import StandingsTable from './components/StandingsTable';
import './Main.css';


class Main extends React.Component {
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