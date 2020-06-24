import React from 'react';
import Selector from './Selector';

interface TableSelectorProps {
    onClickRegion: (region: string) => void;
    onClickGroup: (group:string) => void;
}

class TableSelector extends React.Component<TableSelectorProps> {
    render() {
        return (
            <div>
                <div className='region-selector'>
                    <Selector 
                        type="Region" 
                        options={["APAC", "EU", "NA"]} 
                        onClick={(region) => this.props.onClickRegion(region)}
                    />
                </div>
                <div className='group-selector'>
                    <Selector 
                        type="Group" 
                        options={["A", "B"]}
                        onClick = {(group) => this.props.onClickGroup(group)}
                    />
                </div>
            </div>
        );
    }
}

export default TableSelector;
