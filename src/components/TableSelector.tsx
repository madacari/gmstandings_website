import React from 'react';
import Selector from './Selector';
import { GroupType, RegionType } from '../types';

interface TableSelectorProps {
    onClickRegion: (region: RegionType) => void;
    onClickGroup: (group:GroupType) => void;
}

class TableSelector extends React.Component<TableSelectorProps> {
    render() {
        return (
            <div>
                <div className='region-selector'>
                    <Selector 
                        type="Region" 
                        options={[RegionType.APAC, RegionType.EU, RegionType.NA]} 
                        onClick={(region) => this.props.onClickRegion(region as RegionType)}
                    />
                </div>
                <div className='group-selector'>
                    <Selector 
                        type="Group" 
                        options={[GroupType.A, GroupType.B]}
                        onClick = {(group) => this.props.onClickGroup(group as GroupType)}
                    />
                </div>
            </div>
        );
    }
}

export default TableSelector;
