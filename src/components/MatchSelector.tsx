import React from "react";

interface MatchSelectorProps {
    matches: string[][];
    onClickMatch: (matchIndex: number, pIndex: number) => void
}

class MatchSelector extends React.Component<MatchSelectorProps> {

    render() {
        const matches = this.props.matches
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

export default MatchSelector;
