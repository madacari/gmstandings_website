import { connect } from 'react-redux';

import { MainState } from '../../store/types';
import TableDisplay from '../TableDisplay';

const mapStateToProps = (state: MainState) => {
    return {
        players: state.players,
        results: state.results
    }
}

export default connect(mapStateToProps)(TableDisplay);
