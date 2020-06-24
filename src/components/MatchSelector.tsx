import React from "react";

interface MatchSelectorProps {
    matches: string[][];
    onClickMatch: (mIndex: number, pIndex: number) => void
}

class MatchSelector extends React.Component<MatchSelectorProps> {

    render() {
        const matches = this.props.matches
        // const defaultMatch = ["player 1", "player 2"];
        // var matches = (new Array(5)).fill(defaultMatch);
        
        return (
            <div>
                {
                matches.map((match: string[], mIndex: number) => 
                    <div className={"match-"+mIndex+"-buttons"}>
                        {match.map((player: string ,pIndex:number) =>
                                <button onClick={() => this.props.onClickMatch(mIndex, pIndex)}>
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
