import React from 'react';

// Selectors

interface SelectorProps {
    type: string;
    options: string[];
    onClick: (option: string) => void;
}

class Selector extends React.Component<SelectorProps> {
    render() {
        const {type, options} = this.props;

        return (
            <div className={type.toLowerCase()+"-buttons"}>
                {
                options.map((option) => 
                    <button onClick={() => this.props.onClick(option)}>
                        {option} 
                    </button>
                )}
            </div>
            // <button>{this.props.type} Selector</button>
        );
    }
}

export default Selector;
