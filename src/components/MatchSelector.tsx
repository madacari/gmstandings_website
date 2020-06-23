import React from "react";
import Selector from './Selector'

class MatchSelector extends React.Component {

    render() {
        const defaultMatch = ["player 1", "player 2"];
        var matches = (new Array(5)).fill(defaultMatch);
        
        return (
            <div>
                {matches.map((match) => <Selector type="Match" options={match} />)}
            </div>
        )
    }
}

export default MatchSelector;
