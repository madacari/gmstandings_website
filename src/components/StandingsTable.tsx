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
    players: Players
}

interface StandingsTableState {
    regionToDisplay: string
    groupToDisplay: string
}

class StandingsTable extends React.Component<StandingsTableProps, StandingsTableState> {
    constructor(props: StandingsTableProps) {
        super(props);

        this.state= {
            regionToDisplay: "APAC",
            groupToDisplay: "A"
                    };
    }

    handleClickRegion(region: string) {
        this.setState({regionToDisplay: region});
    }

    handleClickGroup(group: string) {
        this.setState({ groupToDisplay: group });
    }

    selectTable() : string {
        // Choose region
        let playerReg;
        switch(this.state.regionToDisplay){
            case "NA":
                playerReg = this.props.players.NA;
                break;
            case "EU":
                playerReg = this.props.players.EU;
                break;
            default:
                playerReg = this.props.players.APAC;
        }
        // Choose group
        let players;
        switch(this.state.groupToDisplay) {
            case "B":
                players = playerReg.divB;
                break;
            default:
                players = playerReg.divA;
        }
        return players.join(', ');
    }

    render() {
        const players = this.selectTable();

        return (
            <div>
                <div className="table-selector">
                    <TableSelector 
                        onClickRegion={(region) => this.handleClickRegion(region)}
                        onClickGroup={(group) => this.handleClickGroup(group)}
                    />
                </div>
                <div className="table-display">
                    <TableDisplay value={players}/>
                </div>

            </div>
        );
    }
}

export default StandingsTable;
