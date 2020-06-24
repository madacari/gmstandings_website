import React from 'react';
import TableSelector from './TableSelector';
import './StandingsTable.css';
import { Players } from '../types';

interface TableDisplayProps {
    value: string;
}

class TableDisplay extends React.Component<TableDisplayProps> {
    render() {
        return this.props.value;
    }
}

interface StandingsTableProps {
    players: string[]
    onClickRegion: (region: string) => void
    onClickGroup: (group: string) => void
}

class StandingsTable extends React.Component<StandingsTableProps> {
    render() {
        return (
            <div>
                <div className="table-selector">
                    <TableSelector 
                        onClickRegion={(region) => this.props.onClickRegion(region)}
                        onClickGroup={(group) => this.props.onClickGroup(group)}
                    />
                </div>
                <div className="table-display">
                    <TableDisplay value={this.props.players.join(' ')}/>
                </div>

            </div>
        );
    }
}

export default StandingsTable;
