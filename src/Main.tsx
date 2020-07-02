import React from 'react';
import { MatchSelector, StandingsTable } from './components';
import './Main.css';
import { ACTIONS } from './store/actions';
import { connect } from 'react-redux';

interface MainProps {
    fetchData: () => void;
}

class Main extends React.Component<MainProps> {
    componentDidMount() {
        this.props.fetchData();
    }

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

const mapDispatchToProps = (dispatch: any) => ({
    fetchData: () => dispatch(ACTIONS.fetchDataRequest())
});

export default connect(null, mapDispatchToProps)(Main);
