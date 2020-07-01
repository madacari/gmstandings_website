import { connect } from 'react-redux';

import StandingsTable from '../StandingsTable';
import { MainState } from '../../store/types';

const mapStateToProps = (state: MainState) => {
    const {players, results} = state;
    return {
        dataReady: (Array.isArray(players) && state.players.length > 0) &&
            (Array.isArray(results) && results.length > 0)
    }
}

export default connect(mapStateToProps)(StandingsTable);
