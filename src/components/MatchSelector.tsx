import React from "react";
import { connect } from 'react-redux';
import { selectMatchWinner } from "../store/actions";

interface MatchSelectorProps {
    matches: string[][];
    onClickMatch: (matchIndex: number, pIndex: number) => void
}

interface MatchSelectorState {
    
}

class MatchSelector extends React.Component<MatchSelectorProps> {

    render() {
        const matches = this.props.matches
        // const defaultMatch = ["player 1", "player 2"];
        // var matches = (new Array(5)).fill(defaultMatch);
        
        return (
            <div>
                {
                matches.map((match: string[], matchIndex: number) => 
                    <div className={`match-${matchIndex}-buttons`}>
                        {match.map((player: string ,pIndex:number) =>
                                <button onClick={() => this.props.onClickMatch(matchIndex, pIndex)}>
                                    {player}
                                </button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(null, { selectMatchWinner })(MatchSelector);
