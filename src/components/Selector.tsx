import React from 'react';

// Selectors

interface SelectorProps {
    type: string;
    options: string[];
}

class Selector extends React.Component<SelectorProps> {
    render() {
        const {type, options} = this.props;

        var buttons = []
        for (let i=0; i<options.length; i++) {
            buttons.push(<button>{options[i]}</button>);
        }

        return (
            <div className={type.toLowerCase()+"-buttons"}>
                {buttons}
            </div>
            // <button>{this.props.type} Selector</button>
        );
    }
}

export default Selector;