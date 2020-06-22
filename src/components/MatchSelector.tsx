import React from "react";
import Selector from './Selector'

class MatchSelector extends React.Component {

    render() {
        const n = 5;
        var buttons = []
        for (let i = 0; i < n; i++) {
            buttons.push(<Selector type="Match" options={["Player1", "Player2"]}/>);
            }
        
        return (
            <div>
               {buttons}
            </div>
        )
    }
}

export default MatchSelector;