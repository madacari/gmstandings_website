import React from 'react';
import TableSelector from './TableSelector';
import './StandingsTable.css';

class TableDisplay extends React.Component {
    render() {
        return "STANDINGS TABLE";
    }
}

class StandingsTable extends React.Component {
    render() {
        return (
            <div>
                <div className="table-selector">
                    <TableSelector />
                </div>
                <div className="table-display">
                    <TableDisplay />
                </div>

            </div>
        );
    }
}

export default StandingsTable;
