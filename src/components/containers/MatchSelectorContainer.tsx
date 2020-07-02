import { connect } from 'react-redux';

import MatchSelector from '../MatchSelector';
import { MainState, MatchType } from '../../store/types';
import { ACTIONS } from '../../store/actions';

const mapStateToProps = (state: MainState) => {
    return {
        matches: state.matchesToDisplay.map((match:MatchType) => {
            return [match.player1.name, match.player2.name];
        })
    }
}

const mapDispatchToProps = (dispatch:any) => ({
    onClickMatch: (matchIndex: number, winnerIndex: number) => dispatch(ACTIONS.selectMatchWinner({matchIndex, winnerIndex}))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchSelector);
