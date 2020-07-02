import React from 'react';
import { TableDisplay } from '.';
import { TableSelector } from '.';
import './StandingsTable.css';

interface StandingsTableProps {
    dataReady: boolean;
}

class StandingsTable extends React.Component<StandingsTableProps> {
    render() {
        return (
            <div>
                <div className="table-selector">
                    <TableSelector />
                </div>
                { this.props.dataReady ?
                <div className="table-display">
                    <TableDisplay />
                </div> : <div>Loading data...</div> }

            </div>
        );
    }
}

export default StandingsTable;
