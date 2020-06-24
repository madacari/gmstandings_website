import React from "react";
import Selector from './Selector'

interface MatchSelectorProps {
    onClick: (match: string) => void
}

class MatchSelector extends React.Component<MatchSelectorProps> {

    render() {
        const defaultMatch = ["player 1", "player 2"];
        var matches = (new Array(5)).fill(defaultMatch);
        
        return (
            <div>
                {
                matches.map((match) => 
                    <Selector 
                        type="Match" 
                        options={match} 
                        onClick={(winner) => this.props.onClick(winner)}
                    />
                )}
            </div>
        )
    }
}

export default MatchSelector;
