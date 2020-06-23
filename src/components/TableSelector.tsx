import React from 'react';
import Selector from './Selector';

class TableSelector extends React.Component {
    render() {
        return (
            <div>
                <div className='region-selector'>
                    <Selector type="Region" options={["APAC", "EU", "NA"]} />
                </div>
                <div className='group-selector'>
                    <Selector type="Group" options={["Div. A", "Div. B"]}/>
                </div>
            </div>
        );
    }
}

export default TableSelector;
