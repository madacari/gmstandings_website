import { connect } from 'react-redux';

import MatchSelector from '../MatchSelector';
import { MainState } from '../../store/types';
import { selectMatchWinner } from '../../store/actions';

const mapStateToProps = (state: MainState) => {
    return {
        matches: state.matches
    }
}

const mapDispatchToProps = (dispatch:any) => ({
    onClickMatch: (matchIndex: number, winnerIndex: number) => dispatch(selectMatchWinner(matchIndex, winnerIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchSelector);
