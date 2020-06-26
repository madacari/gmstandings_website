import React from 'react';
import TableSelector from './TableSelector';
import './StandingsTable.css';

interface TableDisplayProps {
    value: string;
}

class TableDisplay extends React.Component<TableDisplayProps> {
    render() {
        return this.props.value;
    }
}

interface StandingsTableProps {
    players: string[],
    results: string,
    onClickRegion: (region: string) => void,
    onClickGroup: (group: string) => void
}

class StandingsTable extends React.Component<StandingsTableProps> {
    render() {
        const { players, results } = this.props;
        
        return (
            <div>
                <div className="table-selector">
                    <TableSelector 
                        onClickRegion={(region) => this.props.onClickRegion(region)}
                        onClickGroup={(group) => this.props.onClickGroup(group)}
                    />
                </div>
                <div className="table-display">
                    <TableDisplay value={players.join(' ') + " \n" + results}/>
                </div>

            </div>
        );
    }
}

export default StandingsTable;
