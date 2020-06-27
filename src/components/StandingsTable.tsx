import React from 'react';
import TableDisplay from './TableDisplay';
import TableSelector from './TableSelector';
import './StandingsTable.css';

interface StandingsTableProps {
    players: string[],
    results: number[][],
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
                    <TableDisplay players={players} results={results}/>
                </div>

            </div>
        );
    }
}

export default StandingsTable;
